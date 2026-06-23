# Prompt

Build a workstation setup form for a NixOS installer generator.

The form should collect:

- machine name
- authentication method
- SSH public key when SSH key authentication is selected
- initial password when password authentication is selected
- optional Nix daemon proxy setting

Show validation for an invalid machine name, a missing SSH public key, and a
proxy warning when the proxy option is enabled.

The screen should include an output panel that previews generated files and the
final download action.
