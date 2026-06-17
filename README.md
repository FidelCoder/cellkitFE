# CellKit Actions Frontend

Next.js frontend for CellKit Actions, a CKB testnet developer playground for reusable transaction-action workflows.

The frontend lets developers generate and inspect unsigned transaction payloads, copy them for external signing, then paste signed transaction JSON back into CellKit for validation, dry-run, and broadcast.

## Current Scope

- CKB testnet playground
- Action catalog
- API reference
- Unsigned transaction preview
- Copy flow for external signing
- Signed transaction broadcast page
- Validation, dry-run, and broadcast result panels
- Theme toggle

CellKit does not connect wallets, ask for private keys, sign transactions, or custody funds.

## Pages

- `/` - project overview
- `/playground` - action playground
- `/actions` - action catalog
- `/actions/[actionId]` - action detail pages
- `/broadcast` - signed transaction validation, dry-run, and broadcast flow
- `/api-reference` - endpoint reference

## Environment

Create `.env.local` from `.env.example`.

Important variable:

```bash
NEXT_PUBLIC_API_URL=http://localhost:8080
```

## Development

```bash
pnpm install
pnpm dev
```

## Verification

```bash
pnpm lint
pnpm build
```

Expected result:

- ESLint passes with no warnings or errors
- Next.js production build succeeds

## Relationship With Existing CKB Tools

CellKit is complementary to existing CKB developer tools such as CCC. It is not intended to replace low-level SDKs, wallet libraries, or signing tools.

The frontend focuses on making transaction-action workflows visible and easy to verify. Developers can inspect generated CKB JSON, sign externally with compatible tooling, then use CellKit to validate, dry-run, and broadcast signed testnet transactions.

## Open Source

This repository is released under the MIT License. See `LICENSE`.

