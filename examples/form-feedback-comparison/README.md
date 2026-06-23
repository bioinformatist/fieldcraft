# Form Feedback Comparison

This example shows the same setup form before and after applying Fieldcraft's
review guidance.

The comparison is qualitative. It is not a benchmark, scorecard, or claim that
one agent run will always produce the same UI. The point is to make Fieldcraft's
review target concrete: feedback should stay near the field, option, or action
that caused it.

## Scenario

A user is configuring a workstation installer. The form asks for a machine name,
authentication method, and optional proxy settings. The output panel previews the
generated files and final action.

## Without Fieldcraft

The form routes errors and warnings to a global status panel. The user has to
scan away from the field that needs attention, and the output panel becomes the
place where validation, preview, and final actions compete for attention.

## With Fieldcraft

The form keeps field errors and option-specific help beside the relevant control.
The output panel is reserved for generated files and final actions, so users do
not have to use it as the main way to discover what is wrong.

## Regenerate

From the repository root:

```bash
nix develop .#examples -c node scripts/render-example-comparison.mjs
```

The script renders the two static HTML examples with headless Chromium and
writes `comparison.png`.

On non-Linux systems, set `CHROMIUM_BIN` to a local Chromium or Chrome binary
before running the script.
