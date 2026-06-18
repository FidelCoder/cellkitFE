# Contributing to CellKit Actions Frontend

Thank you for considering a contribution to CellKit.

CellKit is a CKB testnet developer tool focused on reusable, inspectable transaction-action workflows. Frontend contributions should preserve the project's safety model: no private keys, no custody, no hidden signing, and transaction details kept visible to users.

## Ways to Contribute

- Bug reports
- UI fixes
- Accessibility improvements
- Documentation improvements
- Form validation improvements
- API error handling improvements
- Test and verification documentation
- New views for implemented backend actions

## Scope Guidelines

Good contributions are:

- Small enough to review
- Consistent with the existing UI style
- Clear about backend API assumptions
- Careful with transaction safety language
- Compatible with the external-signing model

Please discuss larger UI redesigns or new product flows before opening a large pull request.

## Development Setup

Install dependencies:

```bash
pnpm install
```

Start the development server:

```bash
pnpm dev
```

Use `.env.example` as the environment template.

## Required Checks

Before opening a pull request, run:

```bash
pnpm lint
pnpm build
```

If a check cannot run because of local environment limitations, explain that clearly in the pull request.

## Pull Request Expectations

Pull requests should include:

- Clear summary of the change
- Reason for the change
- Testing performed
- Screenshots for UI changes when possible
- Any backend API assumptions
- Any security or transaction-safety considerations

## Safety Rules

Do not add:

- Private key fields
- Seed phrase fields
- In-browser signing flows
- Wallet custody flows
- Hidden broadcast behavior
- Mainnet defaults without explicit project approval
- Speculative trading or swap behavior

## UI Guidelines

The UI should make transaction state obvious:

- Unsigned vs signed should be clear.
- Warnings and errors should be visible.
- Transaction JSON should remain inspectable.
- Broadcast should require intentional user action.
- The app should not imply that CellKit signs transactions.

## Documentation

Documentation should be accurate, concise, and reproducible. Prefer steps that reviewers can verify through commands, UI flows, or testnet transaction hashes.

English documentation is the default. Chinese summaries may be added for Spark Program/community review.
