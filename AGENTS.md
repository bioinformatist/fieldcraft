# AGENTS.md

Fieldcraft publishes portable Agent Skills for product UI review. Keep the
repository useful across Codex, Claude Code, OpenCode, and other
SKILL.md-compatible agents.

## Maintenance Rules

- Keep `skills/<name>/SKILL.md` aligned with the Agent Skills specification.
- Keep the canonical behavior in `SKILL.md` and `references/`; adapter files
  should only bridge host-specific loading formats.
- Do not fork the skill body per agent unless the host format requires it.
- Prefer mature browser, accessibility, and quality tools instead of bundling
  custom replacements.
- Keep `SKILL.md` concise and move detailed guidance to focused reference files.
- Keep public README prose direct, concrete, and installation-oriented.
- Update the README install section when adding or removing an adapter.
- For every image asset under `assets/`, keep the prompt that generated it in
  the same directory as `<asset-name>.prompt.md`.

## Validation

Before publishing, check:

```bash
git diff --check
```

Also inspect any changed `SKILL.md` frontmatter for valid YAML and a narrow
activation description.
