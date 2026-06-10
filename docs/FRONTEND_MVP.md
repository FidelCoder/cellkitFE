# Frontend MVP

## Scope

The frontend MVP provides a developer-facing CellKit Actions playground. It fetches the backend action registry, renders one form per MVP action, posts to the correct backend endpoint, displays success payloads, displays structured backend errors, and offers copy controls for JSON and curl snippets.

## Routes

- `/`: product home with supported actions and limitations.
- `/playground`: action selector, action forms, result panel, transaction preview.
- `/actions`: action catalog.
- `/actions/[actionId]`: action detail with schema, examples, limitations, and playground link.
- `/api-reference`: frontend-rendered backend API documentation.

## Components

- `ActionSelector`
- `forms/CkbTransferForm`
- `forms/XudtTransferForm`
- `forms/CellConsolidationForm`
- `forms/CapacityLockForm`
- `forms/DataCellCreateForm`
- `TransactionPreview`
- `ApiError`
- `Warnings`
- `CopyButton`
- `ResultPanel`
- `Navbar`

## Expected Backend API

The frontend expects `NEXT_PUBLIC_API_URL` to expose:

- `GET /health`
- `GET /api/actions`
- `POST /api/actions/ckb-transfer/build`
- `POST /api/actions/xudt-transfer/build`
- `POST /api/actions/cell-consolidation/build`
- `POST /api/actions/capacity-lock/build`
- `POST /api/actions/data-cell-create/build`
- `POST /api/actions/validate`
- `POST /api/actions/estimate-fee`

## Limitations

- Does not connect wallets.
- Does not sign or broadcast transactions.
- Does not store private keys or user accounts.
- Uses sample placeholders only for form guidance.
- Backend errors are shown directly with targeted suggestions for missing indexer and xUDT config.
