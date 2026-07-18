# gitweb

Alternative GitHub UI — faster triage tool. **AGPL-3.0-or-later** (commercial
licensing available; see `COMMERCIAL.md`).

Product contract: [`SPEC.md`](./SPEC.md).

## Dev

Requires [mise](https://mise.jdx.dev/) and network for GitHub.

```bash
mise run install
mise run codegen:schema   # needs GITHUB_TOKEN or gh auth
mise run codegen:relay
mise run dev
```

Paste a PAT at the login screen (`sessionStorage`, per tab).

```bash
mise run format   # workspaced codebase format
mise run lint     # workspaced codebase lint
mise run ci
```

## Stack

Vite, React, Relay, Tailwind, daisyUI, TanStack Router. Browser → GitHub GraphQL
directly.
