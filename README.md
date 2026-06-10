# CellKit Actions Frontend

CellKit Actions Frontend is a Next.js playground for reusable CKB transaction-action templates. It lets CKB developers choose an action, fill a typed form, submit it to the Rust backend, inspect the unsigned response payload, see warnings/errors, and copy JSON or curl examples for wallet signing or app integration.

This is not a wallet, block explorer, dashboard, course, signing tool, broadcaster, or custody product.

## Backend Connection

Set the backend URL in `.env.local`:

```bash
NEXT_PUBLIC_API_URL=http://localhost:8080
```

The playground calls `GET /api/actions` and submits build requests to the backend endpoints documented in `/api-reference`.

## Install and Run

```bash
pnpm install
pnpm dev
pnpm lint
pnpm build
```

Open `http://localhost:3000`.

## Supported MVP Actions

- CKB Transfer
- xUDT Transfer
- Cell Consolidation
- Capacity Lock
- Data Cell Create

## Current Limitations

- Testnet-first UX.
- Unsigned payloads only.
- No private keys.
- No wallet connection.
- No signing or broadcasting.
- Backend must be running for live registry/build requests.
- Backend requires CKB RPC/indexer configuration for live cell selection.

## Screenshots

Add screenshots after the first local design review.

## Roadmap

- Add wallet handoff once backend transaction skeletons are fully built.
- Add response validation and fee estimation actions directly in the playground.
- Add saved request presets without storing secrets.
- Add richer JSON diffing for transaction changes.
