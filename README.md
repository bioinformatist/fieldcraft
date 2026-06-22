<p align="center">
  <img src="assets/fieldcraft-banner.svg" alt="Fieldcraft banner" width="100%">
</p>

<h1 align="center">Fieldcraft</h1>

<p align="center">
  <a href="LICENSE"><img alt="License: MIT" src="https://img.shields.io/github/license/bioinformatist/fieldcraft?style=flat-square"></a>
  <a href="https://github.com/bioinformatist/fieldcraft/actions/workflows/ci.yml"><img alt="CI" src="https://img.shields.io/github/actions/workflow/status/bioinformatist/fieldcraft/ci.yml?branch=main&style=flat-square"></a>
  <a href="https://agentskills.io/"><img alt="Agent Skills" src="https://img.shields.io/badge/Agent%20Skills-SKILL.md-2e7d6b?style=flat-square"></a>
  <img alt="Codex" src="https://img.shields.io/badge/Codex-ready-111827?style=flat-square">
  <img alt="Claude Code" src="https://img.shields.io/badge/Claude%20Code-ready-6b5cff?style=flat-square">
  <img alt="OpenCode" src="https://img.shields.io/badge/OpenCode-adapter-0f766e?style=flat-square">
</p>

Fieldcraft is a small set of Agent Skills for reviewing form-heavy product
interfaces: setup flows, configuration generators, admin settings, onboarding
forms, and similar screens where feedback, preview, and final actions have to
stay close to the user's current decision.

## What Fieldcraft Checks

| Area | What it catches | Better shape |
|------|-----------------|--------------|
| Field feedback | Errors, warnings, and help text routed only to a global status area | Put the message next to the field or option that caused it |
| Form flow | Hidden-mode errors, unclear required fields, and disabled actions without reasons | Match guidance to the current choice and explain blockers locally |
| Output boundaries | Preview or status panels becoming the main place users discover mistakes | Keep output panels for generated files, commands, logs, and final actions |

## Scope

| Fieldcraft owns | Use mature tools for | Out of scope |
|-----------------|----------------------|--------------|
| Field-local validation and help | Browser automation and screenshots with Playwright CLI or Playwright MCP | Visual preset packs |
| Form flow and progressive disclosure | Performance, SEO, and broad quality audits with Lighthouse or web-quality skills | Framework-specific component stacks |
| Input, preview, output, and action boundaries | Deep accessibility audits with axe or WCAG-focused tooling | Replacing a project's design system |
| Source-only review with explicit confidence limits | Console logs, network checks, and runtime debugging from browser tooling | A guarantee of a particular visual style |

## Install

| Agent | Support | Install |
|-------|---------|---------|
| Codex | Native `SKILL.md` | `cp -r skills/product-form-ux ~/.codex/skills/` |
| Claude Code | Native `SKILL.md` | `cp -r skills/product-form-ux ~/.claude/skills/` |
| OpenCode | Markdown review adapter | `cp adapters/opencode/product-form-ux.md ~/.config/opencode/agents/product-form-ux.md` |

Codex:

```bash
mkdir -p ~/.codex/skills
cp -r skills/product-form-ux ~/.codex/skills/
```

Claude Code:

```bash
mkdir -p ~/.claude/skills
cp -r skills/product-form-ux ~/.claude/skills/
```

OpenCode has a native Markdown agent format. Fieldcraft ships a review-focused
adapter for that path:

```bash
mkdir -p ~/.config/opencode/agents
cp adapters/opencode/product-form-ux.md ~/.config/opencode/agents/product-form-ux.md
```

The OpenCode adapter denies edits and asks before arbitrary shell commands. Use
it for review findings, then let your normal implementation agent make the
change.

## Use It

Ask your coding agent to use the skill during review or implementation:

```text
Use $product-form-ux to review this setup flow. Focus on validation placement,
disabled actions, and whether the preview/status panel is doing the right job.
```

## Skills

### `product-form-ux`

Use when building or reviewing a form-heavy product interface: a setup wizard,
configuration generator, admin settings surface, checkout-like flow, onboarding
form, or similar UI.

Then ask your coding agent to use `product-form-ux` when reviewing or changing a
form-heavy product UI.
