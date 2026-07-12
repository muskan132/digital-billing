Digital Billing Core — Functional Specification	Internal — Draft v1.0 (rev.1 — BR-1 errata)

**Functional Specification Document**

**Digital Billing Core**

JioPay  |  Merchant Platform

Audience: Engineering, Design, QA, Product

Status: Draft v1.0 (rev.1 — BR-1 errata: idempotency-key wording aligned to §5.1; no behaviour change)   |   Classification: Internal

Scope: MVP (Phase 1) + Core Architecture

# 1. Product Overview

### Purpose

Digital Billing Core is a backend service that converts a completed transaction into a dynamic, hosted digital bill. Any POS, Payment Service Provider (PSP), or aggregator submits transaction data through a single API; the service renders a branded, widgetized bill and delivers it over WhatsApp, SMS, or Email. The bill is an interactive microsite (not a flat PDF) that also carries engagement widgets — survey, coupon, and marketing.

### Business Problem

- JioPay captures the payment but has no presence in the post-payment lifecycle, so merchant–customer engagement after checkout is lost.

- Merchants run billing, feedback, loyalty, and SMS marketing on separate disconnected tools, with no link between a purchase and the engagement that follows it.

- Existing JioPay payment flows do not capture customer profile data, so merchants cannot build a customer database.

### Target Users

| **User** | **Description** |
| --- | --- |
| Merchants (SMB to mid-market) | Retail, F&B/QSR, D2C, salons/services, and chains that need digital receipts plus lightweight CRM and engagement. |
| End customers | Receive, view, and download bills; interact with widgets; view bill history by phone number. |
| Calling systems | POS devices, JioPay Payment Gateway, PSPs, and aggregators that submit transactions via API. |

### Scope

**In scope (this FSD): **bill generation API and idempotency; calculation validation; GST-compliant invoice fields; a merchant drag-and-drop template builder with default and industry-specific templates (clone-and-edit); widgetized layout rendering; merchant configuration (branding, labels, layout, widgets, delivery); multi-channel delivery with failover; bill hosting (URL, short link, PDF); customer data capture and CRM sync; survey/coupon/marketing widgets; offline queue and sync; credit notes; analytics/engagement tracking; DPDP data lifecycle; merchant dashboard and customer bill portal.

**Phase-1 entry point: **bill generation is triggered automatically by the JioPay Payment Gateway S2S (server-to-server) callback, which POSTs a payment-status payload to a configured URL on success (responseCode 0000). It carries merchantId, merchantTxnNo, txnID, paymentID, amount, paymentMode, paymentDateTime, customerMobileNo, customerEmailID, and secureHash, but no line items, taxes, or HSN.

**Bill type by invocation path: **the PG S2S callback produces a Payment Receipt (payment confirmation: amount, mode, date, txn ids, merchant branding; not a GST tax invoice). Every other invocation — direct POS/PSP/aggregator API — produces an itemized Tax Invoice and must include line items, taxes, and HSN. bill_type is determined by the invocation path, not chosen by the caller.

**Out of scope (future phases, not specified here): **advanced segmentation and marketing-campaign builder, automated journeys, AI/predictive analytics, voice-based bill sharing, JioFinance lending, JioMart cross-sell engine, e-commerce platform plug-ins (Shopify/Magento/WooCommerce), and multi-store group management. These are referenced only where they affect a Phase-1 interface.

# 2. User Roles

| **Role** | **Responsibilities** | **Permissions** |
| --- | --- | --- |
| Merchant Admin | Configure branding, labels, layout, widgets, delivery preferences View analytics and customer list Manage store users | Full read/write on own merchant config Read on own bills, customers, analytics No access to other merchants' data |
| Store Staff (POS operator) | Trigger bills via POS Capture customer phone/email at checkout | Generate bills for assigned store No config access No analytics access |
| End Customer | View/download bill Interact with widgets (rate, redeem) View own bill history via portal | Read own bills only (via secure link or OTP) Write to survey/widget endpoints for own bill |
| Calling System (API client) | Submit transaction payloads Submit credit-note requests Flush offline queue | Authenticated API access scoped to its merchant(s) Generate bills and credit notes only |
| JioPay Ops / Support | Onboard merchants Monitor delivery health Investigate delivery/render failures | Read across merchants for support Resend a bill No edit of bill content |
| Platform Admin | Manage shared template library Manage system config and channel providers | Read/write platform-level config No access to customer PII beyond audit needs |

# 3. End-to-End Workflow

Primary flow: a transaction is completed at a POS/PSP and a digital bill is generated, hosted, and delivered.

### 3.1 Steps

- Customer pays at POS / online; staff optionally captures phone and/or email at checkout.

- On payment success (responseCode 0000), the JioPay PG S2S callback POSTs the payment payload; the service verifies secureHash and generates a Payment Receipt. Direct POS/PSP calls submit the full payload (line items, taxes, discounts, totals, customer details, optional template_id) and generate an itemized Tax Invoice; a direct call without line items is rejected.

- Ingestion validates the payload and checks idempotency on external_transaction_id.

- Orchestration re-calculates totals, looks up merchant config, applies custom labels, and resolves layout/widgets.

- Template engine renders the bill HTML; system generates permanent URL, short link, PDF, and JSON metadata.

- Customer contact is written to the merchant CRM (with consent).

- Dispatch sends the bill on the merchant's default channel; on failure it fails over (WhatsApp → SMS).

- Customer opens the bill; widget and open/click events are logged to analytics.

### 3.2 Workflow Table

| **#** | **User / System Action** | **System Behaviour** | **Outcome** |
| --- | --- | --- | --- |
| 1 | Staff captures customer contact at checkout | Contact passed in payload; consent flag set | Customer reachable for delivery |
| 2 | PG S2S callback fires on payment success (or POS/PSP calls API) | Verify secureHash; validate payload; check mandatory fields | Accepted (202) or rejected (4xx) |
| 3 | — | Idempotency check on external_transaction_id | Duplicate returns existing bill; new proceeds |
| 4 | — | Re-calculate subtotal + tax − discount vs input | Match proceeds; mismatch flags error |
| 5 | — | Lookup merchant config; merge static + dynamic data; resolve labels and layout | Assembled bill model |
| 6 | — | Render template; generate URL, short link, PDF, JSON | Bill artifacts created and hosted on CDN |
| 7 | — | Write customer contact to CRM (if consented) | CRM updated; profile enriched |
| 8 | — | Dispatch on default channel; await delivery callback | Delivered, or failover triggered |
| 9 | Customer opens bill / taps widget | Log open, click, survey, redeem events | Analytics and feedback recorded |

# 4. Functional Modules

### 4.1 API Gateway & Ingestion

**Purpose: **Single entry point for the PG S2S callback and all transaction/credit-note requests.

**Features:**

- Verify PG callback secureHash; authenticate direct API callers and scope them to their merchant(s).

- Act only on successful payments (responseCode 0000); ignore/park non-success codes.

- Route by path: PG callback → Payment Receipt; direct API → Tax Invoice (line items required).

- Validate payload schema and the mandatory fields for the resolved bill_type.

- Enforce idempotency (key: merchantTxnNo + paymentID for PG; external_transaction_id for direct callers).

- Accept queued/offline batches without expiry.

**Dependencies: **Auth / hash-verification; Orchestration Engine.

### 4.2 Orchestration Engine

**Purpose: **Turns raw transaction data into a complete bill model.

**Features:**

- Calculation validator: re-computes subtotal + taxes − discounts (Tax Invoice only; a Receipt has amount, no line math).

- Tax/GST validation (HSN, tax split, place of supply) applied to Tax Invoices only.

- Lookup & merge: pulls merchant branding, GSTIN, address from Merchant DB (cached).

- Label resolver: maps system keys to merchant custom labels.

- Layout resolver: orders blocks per merchant layout_schema.

**Dependencies: **Merchant DB / cache; Template & Widget Renderer; Customer Data module.

### 4.3 Template Builder & Library

**Purpose: **Lets merchants build and manage the templates their bills render from.

**Features:**

- Drag-and-drop builder: add, remove, and reorder blocks (Header, Items, Coupon, Survey, Marketing, Footer) with live preview.

- Default template gallery: popular, industry-specific templates (e.g., Retail, QSR/F&B, Corporate/B2B, D2C/Social, Salon/Services).

- Clone-and-edit: start from a default template and customise, or build from scratch.

- Saved templates stored per merchant; one is set as default.

- Foundational skeletons: Minimalist, Compact/Thermal, Tax-Compliant/Corporate, Engagement/Social.

**Dependencies: **Merchant Dashboard; Template & Widget Renderer.

### 4.4 Template & Widget Renderer

**Purpose: **Renders the bill HTML from the selected template, layout order, and active widgets.

**Features:**

- Component-based rendering; each block is an independent module.

- Layout engine (Handlebars/Liquid) maps data into HTML/CSS containers.

- Uses the merchant default template, or a per-transaction template_id override if supplied.

- Mobile-responsive output.

**Dependencies: **Template Builder; Merchant Configuration; Bill Hosting.

### 4.5 Merchant Configuration

**Purpose: **Stores the merchant's reusable setup that drives every bill.

**Features:**

- Branding: logo URL, primary/secondary HEX colors, font.

- Labels: custom name map (e.g., tax_1 → “VAT 15%”).

- Default template selection and saved custom templates.

- Widgets: survey questions, coupon data, marketing flyers/links.

- Delivery: default channel (WhatsApp/SMS/Email).

**Dependencies: **Merchant Dashboard; Template Builder; Orchestration Engine.

### 4.6 Delivery & Dispatch

**Purpose: **Sends the bill over the merchant's channel and tracks delivery state.

**Features:**

- Dispatch via WhatsApp BSP, SMS gateway, or Email provider.

- Per-transaction channel override.

- Await delivery callback; auto-failover WhatsApp → SMS on failure.

- Meter premium (WhatsApp) deliveries for billing.

**Dependencies: **WhatsApp BSP; SMS gateway; Email provider; Bill Hosting.

### 4.7 Bill Hosting & Output Artifacts

**Purpose: **Hosts the rendered bill and generates output formats.

**Features:**

- Permanent, non-sequential URL (hashed).

- Short link for SMS.

- On-the-fly print-ready PDF.

- Structured JSON metadata for analytics.

- Static HTML stored in object storage, served via CDN.

**Dependencies: **Object storage (S3); CDN; Template Renderer.

### 4.8 Customer Data Capture & CRM Sync

**Purpose: **Builds the merchant's customer database from billing contacts.

**Features:**

- Capture name, phone, email, DOB from payload.

- Write/update contact in merchant CRM microservice.

- Record consent flag for marketing and retention.

**Dependencies: **CRM microservice; Compliance & Data Lifecycle.

### 4.9 Analytics & Engagement Tracking

**Purpose: **Records every interaction with the hosted bill.

**Features:**

- Log bill open, link click, widget impressions.

- Capture survey/NPS responses and coupon redemptions.

- Expose totals to merchant dashboard (bills sent, opens, unique customers, top customers, trends).

**Dependencies: **Analytics service; Bill Hosting; Merchant Dashboard.

### 4.10 Offline Queue & Sync

**Purpose: **Ensures bills are produced even when the POS is offline.

**Features:**

- POS queues bills locally when offline.

- On reconnect, POS flushes the queue to the API.

- Server processes all queued bills with no expiry; idempotency prevents duplicates.

**Dependencies: **API Gateway; Dispatch.

### 4.11 Compliance & Data Lifecycle

**Purpose: **Enforces GST and DPDP requirements.

**Features:**

- Validate mandatory GST/HSN/SAC, tax split, and place-of-supply fields.

- Generate credit notes as separate immutable documents linked to the original.

- Automated PII scrub job masks/deletes customer PII 90 days after generation.

**Dependencies: **Orchestration Engine; CRM; Bill Hosting.

### 4.12 Merchant Dashboard & Customer Portal (UI)

**Purpose: **Web surfaces for merchant setup/insights and customer bill access.

**Features:**

- Merchant: configuration screens, bill builder with preview, bills list, analytics, customer list.

- Customer: hosted bill microsite and a portal to view bill history by phone number (OTP-verified).

**Dependencies: **Merchant Configuration; Analytics; Bill Hosting.

# 5. Feature Specifications

### 5.1 Digital Bill Generation (Idempotent)

| **Aspect** | **Detail** |
| --- | --- |
| Description | Generate one digital bill (Payment Receipt or Tax Invoice, per invocation path) from a payload and return its artifacts (URL, short link, PDF, JSON). |
| Business Logic | bill_type is set by path: PG callback → Payment Receipt; direct API → Tax Invoice. Idempotency key: merchantTxnNo + paymentID (PG) or external_transaction_id (direct). If the key was seen before, return the existing bill instead of creating a new one. Bill content is immutable once generated. |
| Validation Rules | Mandatory for generation (both types): merchant_id; transaction id; totals; currency. Tax Invoice (direct API) additionally requires line items (name, qty, value), taxes, and HSN; a direct call missing line items is rejected. Payment Receipt (callback) has no line items; GST/tax validation is not applied to it and it is not a GST tax invoice. Mandatory for delivery: at least one valid customer contact (phone for WhatsApp/SMS, email for Email). A bill can be generated without contact but then cannot be pushed — it is accessible only by URL/QR. Optional: template_id — renders this bill on a specific template instead of the merchant default. Reject unknown merchant_id; unknown template_id falls back (5.4). |
| Success Scenario | Valid new payload → bill generated and hosted; if a valid contact is present, dispatch is triggered; API returns bill id and URLs. |
| Failure Scenario | Missing generation field (merchant_id / txn id / totals) → 4xx, no bill. Delivery requested with no valid contact → bill generated but delivery skipped; caller notified. |
| Edge Cases | Duplicate idempotency key → return existing bill (no resend unless explicitly requested). Replayed offline bills → de-duplicated by key. Zero-value / fully-discounted bill → still generated. Walk-in with no contact → bill generated and shown via URL/QR at POS; no push delivery. PG callback provides customerMobileNo/customerEmailID → used as delivery contact automatically. |

### 5.2 Calculation Validation

| **Aspect** | **Detail** |
| --- | --- |
| Description | For Tax Invoices, re-compute totals to confirm the supplied math is correct before rendering. |
| Business Logic | Applies to Tax Invoices (line items present). Engine computes subtotal + taxes − discounts and compares to the supplied grand total. Payment Receipts carry only the PG amount and are not line-validated. |
| Validation Rules | Recomputed total must equal supplied total within currency's smallest unit. Item-level and bill-level discounts both applied in the correct order. Tax split (CGST/SGST/IGST) must sum to the stated tax amount. Receipt: displayed amount must equal the PG callback amount. |
| Success Scenario | Math matches → bill proceeds to rendering. |
| Failure Scenario | Mismatch → bill flagged with a calculation error; not generated; error returned to caller. |
| Edge Cases | Rounding differences at item vs bill level. Mixed tax rates across line items. Negative line (returned item within same bill) — reject; use credit note instead. |

### 5.3 GST / Tax-Compliant Invoice

| **Aspect** | **Detail** |
| --- | --- |
| Description | Produce a GST-compliant Tax Invoice (direct-API path only) with the mandatory tax fields. |
| Business Logic | Applies to bill_type = Tax Invoice. HSN/SAC, tax split, place of supply, and GSTIN are required and printed. Payment Receipts are explicitly not tax invoices and are excluded from this feature. |
| Validation Rules | HSN/SAC present per line item where required. CGST/SGST vs IGST determined by place of supply. UOM and ISO currency code present. Merchant GSTIN present in config. |
| Success Scenario | All tax fields valid → compliant invoice rendered and a print-ready PDF produced. |
| Failure Scenario | Missing mandatory tax field → reject with specific field error. |
| Edge Cases | Inter-state vs intra-state supply switches CGST/SGST ↔ IGST. Exempt / zero-rated items. Multiple HSN codes in one bill. Merchant needs a compliant invoice for a callback-triggered sale → must use the direct/itemized path (a receipt will not satisfy GST). |

### 5.4 Template & Layout Rendering

| **Aspect** | **Detail** |
| --- | --- |
| Description | Render the bill from the merchant's chosen template and ordered block layout. |
| Business Logic | Template selection: use payload template_id if supplied, else the merchant default template. merchant_id resolves branding, labels, layout_schema, active widgets. layout_schema defines block order (e.g., HEADER, COUPON, ITEMS, SURVEY, FOOTER). Static header (logo/address) cached to reduce DB load. |
| Validation Rules | template_id (override or default) must belong to the merchant or the shared default library. layout_schema may only reference known block types. Each active widget must have its required data. |
| Success Scenario | Valid config → bill rendered in requested order with correct branding/labels. |
| Failure Scenario | Unknown template/block or missing widget data → fall back to default template and log; bill still delivered. |
| Edge Cases | Merchant has no custom layout → default order applied. Widget enabled but data empty → block skipped, not rendered blank. Very long item list → paginated/scrollable rendering. |

### 5.5 Template Builder & Library

| **Aspect** | **Detail** |
| --- | --- |
| Description | Let merchants build custom bill templates by drag-and-drop, or start from default industry templates and clone-and-edit. |
| Business Logic | Drag-and-drop canvas: add/remove/reorder blocks with live preview. Default library provides popular, industry-specific templates (Retail, QSR/F&B, Corporate/B2B, D2C/Social, Salon/Services). Clone a default → creates an editable copy owned by the merchant. Merchant sets exactly one saved template as default; others selectable via template_id override at checkout. |
| Validation Rules | A saved template must contain at least Header and Items blocks. Enabled widget blocks must have required data before the template can be set as default. Only known block types allowed on the canvas. Exactly one default template per merchant. |
| Success Scenario | Merchant clones a QSR template, edits it, saves, and sets it as default; new bills render on it. |
| Failure Scenario | Invalid template (missing Header/Items) → cannot be saved or set as default; builder shows the error. |
| Edge Cases | Merchant deletes the template currently set as default → system blocks deletion until another default is chosen. Template used by an in-flight override that is later deleted → historical bills keep their rendered copy. Default library template updated centrally → merchant clones are not auto-changed. |

### 5.6 Multi-Channel Delivery with Failover

| **Aspect** | **Detail** |
| --- | --- |
| Description | Deliver the bill over WhatsApp, SMS, or Email per merchant default, with override and failover. |
| Business Logic | Use merchant default channel unless the payload sets override_delivery. Await provider delivery callback. On WhatsApp failure, automatically fail over to SMS. |
| Validation Rules | Channel-appropriate contact present (phone for WhatsApp/SMS, email for Email). SMS uses short link; Email/WhatsApp may use full URL. WhatsApp marked premium and metered. |
| Success Scenario | Provider returns delivered callback → status = Delivered. |
| Failure Scenario | All channels fail → status = Failed; surfaced to merchant and Ops; bill remains accessible via URL. |
| Edge Cases | No callback within timeout → status = Unknown; retry policy applies. Invalid/missing contact → skip channel, try next. Customer has no WhatsApp → failover to SMS. |

### 5.7 Customer Data Capture & CRM Sync

| **Aspect** | **Detail** |
| --- | --- |
| Description | Persist the customer contact captured at checkout into the merchant CRM. |
| Business Logic | Upsert by phone (primary) / email. Store consent flag for marketing/retention use. Link contact to the bill record. |
| Validation Rules | Phone or email must be syntactically valid to be stored. Consent flag explicit; default = not consented for marketing. |
| Success Scenario | Valid contact + consent → CRM profile created/updated and linked to bill. |
| Failure Scenario | Invalid/absent contact → no CRM write; bill is still generated and accessible by URL (delivery skipped if no valid channel). |
| Edge Cases | Same customer across stores of one merchant — single profile. Customer declines contact → anonymous bill (URL/QR only), no CRM entry. PII reaches 90-day age → scrubbed (see 5.13). |

### 5.8 Offline Queue & Sync

| **Aspect** | **Detail** |
| --- | --- |
| Description | Generate and deliver bills produced while the POS was offline. |
| Business Logic | POS queues bills locally during outage. On reconnect, POS flushes all queued payloads to the API. Server processes with no expiry; bill date reflects store-local time of sale, not server receipt time. |
| Validation Rules | Each queued bill carries its own external_transaction_id and original timestamp. |
| Success Scenario | Queue flushed → all bills generated once and delivered. |
| Failure Scenario | Partial flush → unprocessed items remain queued and retried. |
| Edge Cases | Replays causing duplicates → blocked by idempotency. Very large backlog after long outage → processed without dropping. Stale timestamp — preserved as sale time. |

### 5.9 Credit Note / Amendment

| **Aspect** | **Detail** |
| --- | --- |
| Description | Handle returns/refunds without altering the original immutable bill. |
| Business Logic | POS triggers a separate credit-note API call; a distinct credit-note document is generated and linked to the original invoice number. |
| Validation Rules | Original invoice reference must exist. Credit amount cannot exceed original bill value. Credit note carries its own document id. |
| Success Scenario | Valid request → credit note generated, linked, and (optionally) delivered. |
| Failure Scenario | Unknown original / over-credit → reject with error. |
| Edge Cases | Partial vs full refund. Multiple credit notes against one bill (sum capped at bill value). Refund on an already-scrubbed (90-day) bill — see Open Questions. |

### 5.10 Engagement Widgets (Survey / Coupon / Marketing)

| **Aspect** | **Detail** |
| --- | --- |
| Description | Interactive blocks embedded in the hosted bill. |
| Business Logic | Survey: question + option type (stars/scale/text); response posts to analytics/feedback store. Coupon: coupon_code + discount_text + dynamic QR for next visit. Marketing: image_url (flyer) + redirect_url + tracking_id for CTR. |
| Validation Rules | Required fields per widget present, else block omitted. tracking_id unique per campaign. Survey accepts one response per customer per bill. |
| Success Scenario | Customer taps a star / clicks flyer / views coupon → event logged and attributed. |
| Failure Scenario | Widget asset fails to load → block hidden; rest of bill renders. |
| Edge Cases | Repeat survey submission → only first counted. Expired coupon → shown as expired, not redeemable. Broken redirect URL → click logged, user shown safe fallback. |

### 5.11 Customer Bill Portal (History by Phone)

| **Aspect** | **Detail** |
| --- | --- |
| Description | Let a customer view all their historical digital bills by entering their phone number. |
| Business Logic | Customer enters phone → OTP verification → list of that number's bills across the merchant (or platform, per Open Questions). |
| Validation Rules | OTP required before any bill is shown. Only bills tied to the verified number are listed. Scrubbed (90-day) bills excluded. |
| Success Scenario | Verified customer sees their bill list and can open/download each. |
| Failure Scenario | Wrong/expired OTP → access denied; rate-limited retries. |
| Edge Cases | Number with no bills → empty state. Number changed owners → only consented/active records shown. Bulk requests → rate limited. |

### 5.12 Bill Hosting & PDF Generation

| **Aspect** | **Detail** |
| --- | --- |
| Description | Host the rendered bill and produce a print-ready PDF on demand. |
| Business Logic | HTML stored in object storage, served via CDN. URL is non-sequential hash; short link generated for SMS. PDF generated on-the-fly from the same model. |
| Validation Rules | URL hash unguessable; PDF mirrors hosted bill content. |
| Success Scenario | Bill loads fast on mobile; PDF downloads correctly. |
| Failure Scenario | PDF generation error → retry; URL still serves HTML. |
| Edge Cases | Concurrency spike (e.g., Friday rush) → rendering scales horizontally. Access after 90-day scrub → see Error Handling. CDN cache invalidation on credit-note linkage. |

### 5.13 PII Data Lifecycle (DPDP)

| **Aspect** | **Detail** |
| --- | --- |
| Description | Automatically remove customer PII after the retention window. |
| Business Logic | Scheduled job masks/deletes phone, email, and other PII exactly 90 days after bill generation. |
| Validation Rules | Scrub applies to active databases and derived stores. Tax-mandatory, non-PII invoice data retained per statute. Consent withdrawal triggers earlier removal. |
| Success Scenario | At 90 days, PII is unrecoverable from active stores; analytics aggregates remain. |
| Failure Scenario | Scrub job fails → alert raised; retried; flagged for audit. |
| Edge Cases | PII embedded in hosted bill/PDF (URL is “permanent”) — conflict; see Open Questions. Legal hold overriding scrub. Customer requests deletion before 90 days. |

# 6. Screen Behaviour

Functionality only. Visual design is out of scope for this document.

### 6.1 Template Gallery — Merchant

**Purpose: **Browse default industry templates and pick a starting point.

| **Components** | **Actions** | **Navigation** | **Validations** |
| --- | --- | --- | --- |
| Industry-filtered gallery (Retail, QSR/F&B, Corporate/B2B, D2C/Social, Salon/Services) Template thumbnails/preview Clone button Build-from-scratch button My Templates list | Filter by industry Preview a template Clone-and-edit Start blank Set default | Clone/Blank → Template Builder Set default → Merchant Config My Templates → Template Builder | Exactly one default template per merchant Default template must be valid before it is set |

### 6.2 Template Builder (Drag-and-Drop + Live Preview) — Merchant

**Purpose: **Build or edit a template by arranging blocks with live preview.

| **Components** | **Actions** | **Navigation** | **Validations** |
| --- | --- | --- | --- |
| Block palette (Header, Items, Coupon, Survey, Marketing, Footer) Drag-and-drop canvas Drag handles Live preview pane Branding/label controls | Add/remove/reorder blocks Edit block content Save template Set as default | Save → My Templates Cancel → Template Gallery Widget block → Widget Setup | At least Header + Items present Enabled widget must have data Only known block types allowed |

### 6.3 Branding & Labels — Merchant

**Purpose: **Configure logo, colors, fonts, and custom field names.

| **Components** | **Actions** | **Navigation** | **Validations** |
| --- | --- | --- | --- |
| Logo upload Primary/secondary color pickers Font selector Label map editor GSTIN/address fields | Upload logo Set HEX colors Map labels (e.g., tax_1 → name) Save | Save → Merchant Config Next → Template Builder | Valid HEX values Logo file type/size limits GSTIN format check No duplicate label keys |

### 6.4 Delivery Preferences — Merchant

**Purpose: **Set default channel and per-channel options.

| **Components** | **Actions** | **Navigation** | **Validations** |
| --- | --- | --- | --- |
| Default channel selector (WhatsApp/SMS/Email) Premium-channel cost note Sender details | Select default channel Toggle failover Save | Save → Merchant Config Back → Dashboard | At least one channel configured Verified sender for chosen channels |

### 6.5 Bills & Analytics Dashboard — Merchant

**Purpose: **Show bill activity and basic customer metrics.

| **Components** | **Actions** | **Navigation** | **Validations** |
| --- | --- | --- | --- |
| Bills list (date, customer, type [Receipt/Invoice], channel, status) Counters: sent, opened, unique customers, top customers Trend chart Resend control | Filter/search bills (incl. by bill type) Open a bill Resend a bill Export | Bill row → bill detail Customer → customer list | Date range valid Resend allowed only for delivered/failed bills |

### 6.6 Digital Bill Microsite — Customer

**Purpose: **The hosted, interactive bill the customer receives.

| **Components** | **Actions** | **Navigation** | **Validations** |
| --- | --- | --- | --- |
| Branded header Itemized bill Active widgets (survey/coupon/marketing) Download PDF button | View bill Tap survey rating Redeem/copy coupon Click marketing link Download PDF | Coupon → QR/next-visit Marketing → redirect_url | One survey response per customer Coupon shown only if valid Safe fallback on broken asset |

### 6.7 Customer Bill Portal — Customer

**Purpose: **View historical bills by phone number.

| **Components** | **Actions** | **Navigation** | **Validations** |
| --- | --- | --- | --- |
| Phone input OTP input Bill history list | Enter phone Verify OTP Open/download a bill | Verify → bill list Bill → microsite | OTP required Rate-limited attempts Only verified number's bills shown Scrubbed bills excluded |

# 7. Business Rules

| **#** | **Rule** |
| --- | --- |
| BR-1 | One transaction yields at most one bill. The idempotency key is merchantTxnNo + paymentID for PG-callback bills and external_transaction_id for direct-API bills (per §5.1); a repeated key returns the existing bill. |
| BR-2 | A generated bill is immutable. Corrections are issued as a linked credit note, never by editing the original. |
| BR-3 | Recomputed total (subtotal + taxes − discounts) must equal the supplied total, or the bill is rejected. |
| BR-4 | Tax invoices must carry HSN/SAC, tax split, place of supply, UOM, ISO currency, and merchant GSTIN. |
| BR-5 | CGST/SGST vs IGST is determined by place of supply (intra-state vs inter-state). |
| BR-6 | Bill date reflects the store-local time of sale, not server processing time. |
| BR-7 | Hosted bill URLs are non-sequential, unguessable hashes. |
| BR-8 | WhatsApp delivery is a premium, metered channel; SMS and Email are standard. |
| BR-9 | On WhatsApp delivery failure, the system fails over to SMS automatically. |
| BR-10 | The offline queue has no expiry; all queued bills are eventually processed once received. |
| BR-11 | Customer PII is masked/deleted exactly 90 days after bill generation (DPDP). |
| BR-12 | Marketing/retention use of a contact requires an explicit consent flag; default is not consented. |
| BR-13 | A credit note's total cannot exceed the original bill value (across all notes for that bill). |
| BR-14 | A widget block with missing required data is omitted, never rendered empty. |
| BR-15 | A calling system can only access merchants it is authorized for; cross-merchant access is denied. |
| BR-16 | Transaction id and totals are mandatory to generate a bill. Customer contact is mandatory only to deliver one: a bill may be generated without contact (accessible by URL/QR) but cannot be pushed to WhatsApp/SMS/Email without a valid channel contact. |
| BR-17 | Each bill renders on the merchant's default template unless the request supplies a template_id override, which applies to that transaction only. |
| BR-18 | Each merchant has exactly one default template at any time. |
| BR-19 | Default library templates are industry-specific and read-only; merchants use them by cloning into an editable copy. |
| BR-20 | Phase-1 bill generation is triggered by the JioPay PG S2S callback on responseCode 0000; the callback's secureHash must be verified before the bill is generated. POS/PSP direct calls use the same downstream contract. |
| BR-21 | bill_type is determined by invocation path: PG S2S callback → Payment Receipt; every other invocation (direct POS/PSP/aggregator API) → Tax Invoice. Callers cannot override bill_type. |
| BR-22 | A Tax Invoice request (direct API) must include line items, taxes, and HSN; a direct request without line items is rejected. |
| BR-23 | A Payment Receipt is a payment confirmation, not a GST tax invoice; GST/tax validation is not applied to it. A GST-compliant invoice for a callback-triggered sale must be produced via the direct/itemized path. |

# 8. Integrations

| **Integration** | **Purpose** | **Trigger** | **Data Exchanged** | **Failure Handling** |
| --- | --- | --- | --- | --- |
| JioPay PG S2S callback (Phase-1 entry point) | Generate a Payment Receipt on payment success | S2S POST on responseCode 0000 | merchantId, merchantTxnNo, txnID, paymentID, amount, paymentMode, paymentDateTime, customerMobileNo, customerEmailID, secureHash (no line items) | Verify secureHash; ignore non-success codes; idempotency on merchantTxnNo+paymentID |
| POS / PSP / Aggregator (inbound, direct API) | Generate an itemized Tax Invoice; submit credit notes | On payment / refund | Line items, taxes, HSN, discounts, totals, customer details, optional template_id | Reject if line items absent; validation errors returned; idempotency prevents dupes |
| WhatsApp BSP (e.g., Gupshup/Twilio) | Premium bill delivery | Dispatch on WhatsApp | Recipient, message, short link/URL | On failure → failover to SMS |
| SMS Gateway | Standard delivery / failover | Dispatch or failover | Recipient, short link | Retry; mark Failed if exhausted |
| Email Provider (e.g., SendGrid) | Email delivery | Dispatch on Email | Recipient, HTML/link, PDF | Retry; mark Failed if exhausted |
| Object Storage + CDN | Host bill HTML and serve fast | On render | HTML, assets | Serve from origin on cache miss; alert on storage error |
| Merchant CRM Microservice | Persist customer profiles | On contact capture | Name, phone, email, DOB, consent, bill link | Drop contact on invalid data; bill still delivered |
| Analytics Service | Record opens, clicks, widget events | On bill interaction | Event type, bill id, timestamp | Buffer and retry; no impact on bill view |

Note: this section lists integration behaviour only. API contracts and schemas are maintained separately and are out of scope here.

# 9. Error Handling

| **Condition** | **System Behaviour** | **User-Facing Result** |
| --- | --- | --- |
| secureHash verification fails (PG callback) | Reject callback; do not generate; alert | No bill; event logged for investigation |
| Non-success responseCode (not 0000) | Do not generate bill | No bill (payment not successful) |
| Missing generation field (txn id / totals / merchant_id) | Reject payload; no bill created | Caller receives field-level 4xx error |
| Direct API (Tax Invoice) call with no line items | Reject; do not downgrade to a receipt | Caller receives “line items required” 4xx error |
| Delivery requested but no valid contact | Generate bill; skip push delivery | Bill accessible by URL/QR; caller notified delivery was skipped |
| Calculation mismatch | Flag calculation error; block generation | Caller receives mismatch error with expected vs supplied total |
| Duplicate idempotency key | Return existing bill | Same bill returned; no duplicate sent |
| Unknown merchant_id | Reject | Caller receives “merchant not found” error |
| Unknown template / block type | Fall back to default template; log | Bill still delivered (default styling) |
| Widget data missing | Omit widget block | Bill renders without that block |
| WhatsApp delivery failure | Auto-failover to SMS | Customer receives SMS; merchant sees channel note |
| All channels fail | Mark bill Failed; alert Ops | Merchant sees Failed status; bill still accessible via URL |
| No delivery callback (timeout) | Status = Unknown; apply retry policy | Status shown as pending until resolved |
| PDF generation failure | Retry; serve HTML meanwhile | Customer can view bill; download retried |
| Offline replay duplicate | Block via idempotency | No duplicate bill or message |
| Access to scrubbed (90-day) bill | Return gone/expired response | Customer sees “bill no longer available” |
| Invalid/expired OTP (portal) | Deny; rate-limit | Customer prompted to retry / wait |

# 10. Open Questions

Items below are not specified in the source material. They are not assumed; they must be answered before or during build.

| **Open Question** | **Owner** | **Reason** | **Impact** |
| --- | --- | --- | --- |
| What authentication model do calling systems use (API key, OAuth, mTLS)? | Eng + Security | Source describes the API but not auth | Blocks ingestion design and security review |
| Is the core the source of truth for tax rates, or does the POS always supply tax and the core only validate? | Product + Tax/Compliance | Validator re-checks math but rate authority is unstated | Affects calculation logic and compliance liability |
| Who owns GST invoice numbering/sequence — merchant POS or the core? | Product + Compliance | Not defined; GST requires unique sequence | Affects invoice generation and audit |
| How is customer consent captured for DPDP (at POS, on the bill, both)? | Product + Legal | Consent flag referenced but capture point unspecified | Required for lawful CRM use |
| The hosted URL is “permanent” but PII is scrubbed at 90 days — what is the resolution (anonymize page, expire URL, separate retention for PDF)? | Product + Legal + Eng | Direct conflict between two stated requirements | Affects hosting, PDF, and DPDP design |
| Is the customer portal scoped to a single merchant or platform-wide across merchants? | Product | Source describes both framings | Changes data model and access control |
| Which BSP/providers are contracted for WhatsApp, SMS, Email, and what are their delivery SLAs? | Product + Partnerships | Examples given (Gupshup/Twilio/SendGrid) but not finalized | Affects dispatch, failover, and cost metering |
| What is the idempotency window/retention for external_transaction_id? | Eng | Idempotency required but window unstated | Affects offline replay and storage |
| Is multi-store hierarchy in MVP scope, or Phase 2? | Product | Multi-store is listed under later phases but referenced in roles | Affects config model and dashboard |
| Who meters and bills premium (WhatsApp) and per-transaction fees — this service or JioPay billing? | Product + Finance | Pricing models defined; metering ownership not | Affects dispatch logging and reconciliation |
| What are concurrency/throughput SLAs and the bill-generation latency target? | Eng | Source says “scale” and references <2s elsewhere; not confirmed | Affects architecture and capacity planning |
| What is the secureHash algorithm and how is the shared secret provisioned/rotated per merchant? | Eng + PG team | Callback includes secureHash but the hashing scheme and key management are not on this page | Blocks secure verification of the callback |
| Does JPSL retry the S2S callback on failure, and with what schedule/timeout? | Eng + PG team | Retry behaviour not stated on the callback page | Affects idempotency window and delivery reliability |
| Should a Payment Receipt be upgradeable to a Tax Invoice if the POS later sends line items for the same merchantTxnNo? | Product | Callback and direct paths are separate today; enrichment is a possible fast-follow, not yet decided | Affects whether receipt and invoice can share one bill record |
| Which industries and templates ship in the Phase-1 default template library? | Product + Design | Requirement is industry-specific defaults, but the exact set is unspecified | Defines Template Builder scope and Design workload |

# 11. Acceptance Criteria

| **#** | **Acceptance Criterion** |
| --- | --- |
| AC-1 | Given a valid new payload, a bill is generated and URL, short link, PDF, and JSON are returned. |
| AC-2 | Given a repeated external_transaction_id, the existing bill is returned and no second bill or message is created. |
| AC-3 | Given a payload whose totals do not match the recomputed total, the request is rejected with a calculation error and no bill is created. |
| AC-4 | Given a tax invoice missing HSN/SAC, tax split, or place of supply, the request is rejected with the specific missing field. |
| AC-5 | Given inter-state place of supply, the invoice shows IGST; intra-state shows CGST + SGST. |
| AC-6 | Given a merchant layout_schema, blocks render in the specified order; an enabled widget with no data is omitted. |
| AC-7 | Given WhatsApp default and a WhatsApp delivery failure, the bill is delivered by SMS and the channel change is recorded. |
| AC-8 | Given all channels fail, the bill status is Failed and the bill remains accessible via its URL. |
| AC-9 | Given a valid consented contact, a CRM profile is created/updated and linked to the bill. |
| AC-10 | Given an offline POS that reconnects, all queued bills are processed exactly once with sale-time timestamps. |
| AC-11 | Given a refund, a separate credit note is generated and linked to the original; the original bill is unchanged. |
| AC-12 | Given total credit notes that would exceed the bill value, the request is rejected. |
| AC-13 | Given a customer taps a survey rating, exactly one response is recorded and visible in analytics. |
| AC-14 | Given a bill that is 90 days old, its customer PII is no longer retrievable from active stores. |
| AC-15 | Given the customer portal, bills are shown only after OTP verification and only for the verified number. |
| AC-16 | Given a hosted bill, it loads on mobile and a print-ready PDF can be downloaded. |
| AC-17 | Given an unauthorized calling system, requests for another merchant's data are denied. |
| AC-18 | Given a bill request with no customer contact, a bill is still generated and accessible by URL; given a delivery request with no valid contact, delivery is skipped and the caller is notified. |
| AC-19 | Given a PG S2S callback with responseCode 0000 and a valid secureHash, bill generation is triggered with no manual step; given an invalid secureHash or a non-0000 code, no bill is generated. |
| AC-20 | Given no template_id in the request, the bill renders on the merchant default; given a valid template_id, it renders on that template for that transaction only. |
| AC-21 | Given a default industry template, a merchant can clone it, edit it, save it, and set it as default; the original library template is unchanged. |
| AC-22 | Given a merchant attempts to save a template without Header and Items blocks, the save is blocked with a validation error. |
| AC-23 | Given a PG S2S callback, the generated bill is a Payment Receipt (no line items, not GST-validated); given a direct API call with line items, the generated bill is a Tax Invoice. |
| AC-24 | Given a direct API call with no line items, the request is rejected with a “line items required” error and is not downgraded to a receipt. |

Page  of