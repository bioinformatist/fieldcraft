# AGENTS.md

## Project Context

Fieldcraft publishes portable Agent Skills for product UI review. Keep the
repository useful across Codex, Claude Code, OpenCode, and other agents that
load skill manifests.

## Maintenance Rules

- Keep every skill manifest aligned with the Agent Skills specification.
- Keep the canonical behavior in each skill manifest and its reference files;
  adapters only bridge host-specific loading formats.
- Do not fork the skill body per agent unless the host format requires it.
- Prefer mature browser, accessibility, and quality tools instead of bundling
  custom replacements.
- Keep skill manifests concise and move detailed guidance to focused reference
  files.
- Keep public README prose direct, concrete, and installation-oriented.
- Update the README install section when adding or removing an adapter.
- For every SVG asset under `assets/`, keep the prompt that generated it in the
  same directory, using the full SVG filename followed by the prompt suffix.

## Validation

Before publishing, check:

```bash
nix flake check
```

This verifies every SVG asset in `assets/` has a matching prompt file, confirms
SVG assets parse with `rsvg-convert`, and checks GitHub Actions workflows with
`actionlint`. CI also runs pinned agnix 0.34.0 for generic Agent Skill and
agent-config lint. Inspect any changed skill frontmatter for a narrow activation
description.

When adding files, stage them before running `nix flake check`; Git flakes do
not reliably include untracked files in the checked source tree.

Use the maintenance shell when editing the repository:

```bash
nix develop
```

Inside the shell, use `npx --yes agnix@0.34.0 --strict .` for the same generic
agent-config lint that CI runs.
