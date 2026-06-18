# Security Policy

CellKit Actions Frontend is a testnet-first CKB developer interface. It is designed to avoid custody, private-key handling, and hidden signing entirely.

## Supported Scope

Security reports are welcome for:

- UI behavior that could mislead users about signing/broadcasting
- Unsafe broadcast confirmation behavior
- Private-key exposure risks
- Dependency vulnerabilities
- Incorrect handling of signed transaction JSON
- Incorrect backend API assumptions that could cause unsafe behavior

## Private-Key Policy

CellKit must never:

- Ask for private keys
- Ask for seed phrases
- Store private keys
- Derive keys
- Sign transactions internally
- Custody user funds

Signing must happen externally through compatible CKB wallet/tooling.

## Network Policy

The current MVP is testnet-only. Any mainnet UI support must be explicit, reviewed, documented, and separated from testnet defaults.

## Reporting a Vulnerability

Please report security issues privately by email:

```text
griffinesonyango@gmail.com
```

Include:

- A short description of the issue
- Steps to reproduce
- Impact
- Affected commit or deployment URL if known
- Suggested fix if available

Please do not publicly disclose a vulnerability until there has been reasonable time to investigate and fix it.

## Response Expectations

I will aim to:

- Acknowledge valid reports within 72 hours
- Investigate and reproduce the issue
- Prioritize fixes based on impact
- Credit reporters when appropriate and desired

## Safe Testing

Only test against:

- Your own local instance
- Public testnet deployments
- Testnet funds and testnet addresses

Do not attempt to access private systems, secrets, accounts, or infrastructure unrelated to CellKit.
