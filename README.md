# CellKit Actions Frontend

CellKit Actions Frontend is a Next.js developer playground for reusable CKB transaction-action workflows. It lets developers build and inspect unsigned CKB transaction payloads, copy them for external signing, then paste signed transaction JSON back into CellKit for validation, dry-run, and testnet broadcast.

The frontend is intentionally transparent: it shows transaction JSON, backend summaries, warnings, signing status, dry-run results, transaction hashes, and explorer links. It does not connect wallets, request private keys, sign transactions, or custody funds.

## Status

Current status: testnet MVP.

Implemented:

- Landing page for CellKit Actions
- Action catalog and action detail pages
- Playground for supported action forms
- API reference page
- CKB transfer form and transaction preview
- Copy flow for unsigned transaction JSON
- Broadcast page for signed transaction JSON
- Validate, dry-run, and broadcast controls
- Result panels for validation errors, dry-run cycles, tx hash, and explorer URL
- Demo recording script and public update template
- API client with backend error handling
- Protocol console visual system using Geist and JetBrains Mono

## Architecture

Read the full frontend architecture document:

- [`ARCHITECTURE.md`](./ARCHITECTURE.md)

High-level flow:

```text
Developer
  -> CellKit frontend page/form
  -> frontend API client
  -> CellKit backend
  -> CKB indexer / CKB RPC
  -> visible JSON result in UI
```

The backend repository is:

```text
https://github.com/FidelCoder/cellkitBE
```

## Pages

- `/` - project overview
- `/playground` - action playground
- `/actions` - action catalog
- `/actions/[actionId]` - action detail pages
- `/broadcast` - signed transaction validation, dry-run, and broadcast flow
- `/api-reference` - endpoint reference

## Core User Flow

```text
1. Open the playground
2. Build an unsigned CKB transfer transaction
3. Inspect and copy the transaction JSON
4. Sign externally with compatible CKB tooling or wallet software
5. Open the broadcast page
6. Paste signed transaction JSON
7. Validate the signed payload
8. Dry-run through backend CKB RPC
9. Broadcast to CKB testnet
10. Open returned explorer link
```

## Environment

Create `.env.local` from `.env.example`.

```bash
NEXT_PUBLIC_API_URL=http://localhost:8080
```

`NEXT_PUBLIC_API_URL` should point to the CellKit backend.

## Development

Install dependencies:

```bash
pnpm install
```

Start the development server:

```bash
pnpm dev
```

By default the frontend is available at:

```text
http://localhost:3000
```

## Verification

Recommended checks:

```bash
pnpm lint
pnpm build
```

Expected result:

- ESLint passes with no warnings or errors
- Next.js production build succeeds

Manual check:

1. Start the backend.
2. Set `NEXT_PUBLIC_API_URL` to the backend URL.
3. Start the frontend.
4. Open `/playground` and submit a CKB transfer request.
5. Open `/broadcast` and verify the signed transaction workflow UI is available.
6. Follow [`DEMO.md`](./DEMO.md) for the full Milestone 3 recording path.

## Security Model

CellKit is intentionally private-key-free.

The frontend does not:

- Connect wallets
- Request private keys
- Request seed phrases
- Sign transactions
- Store account credentials
- Custody funds

The user signs externally and decides whether to submit a signed testnet transaction through the broadcast flow.

See [`SECURITY.md`](./SECURITY.md) for reporting and safety expectations.

## Relationship With Existing CKB Tools

CellKit is complementary to existing CKB developer tools such as CCC. It is not intended to replace low-level CKB SDKs, wallet libraries, or signing tools.

The frontend focuses on making transaction-action workflows visible and easy to verify. Developers can inspect generated CKB JSON, sign externally with compatible tooling, then use CellKit to validate, dry-run, and broadcast signed testnet transactions.

## Open Source

CellKit is open source under the MIT License.

- License: [`LICENSE`](./LICENSE)
- Contributing guide: [`CONTRIBUTING.md`](./CONTRIBUTING.md)
- Security policy: [`SECURITY.md`](./SECURITY.md)
- Spark Program scope: [`SPARK_PROGRAM.md`](./SPARK_PROGRAM.md)
- Demo script: [`DEMO.md`](./DEMO.md)

Public development happens in this repository. Issues, bug reports, documentation improvements, UI fixes, and narrowly scoped feature contributions are welcome.

## Related Repository

Backend:

```text
https://github.com/FidelCoder/cellkitBE
```
