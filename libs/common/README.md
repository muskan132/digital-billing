# libs/common

Shared, **domain-free**, cross-cutting library root (`docs/rules/architecture.md`): event
envelope/serde, error envelope, auth-context propagation, observability, money type,
retry/breaker utilities.

Scaffold placeholder created by `F-01`. No domain logic belongs here — "a shared lib that
knows what a bill is has crossed the boundary" (`docs/00_Project_Brain.md` §15). Actual
libraries (money type, identifiers, error envelope, HTTP client, etc.) are added by their own
roadmap tasks (`X-01`, `X-02`, `X-04`, `X-12`, ...).
