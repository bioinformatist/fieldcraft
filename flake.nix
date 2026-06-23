{
  description = "Fieldcraft Agent Skill maintenance environment";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    systems.url = "github:nix-systems/default";
  };

  outputs =
    {
      self,
      nixpkgs,
      systems,
    }:
    let
      eachSystem = nixpkgs.lib.genAttrs (import systems);
      pkgsFor = system: import nixpkgs { inherit system; };
    in
    {
      devShells = eachSystem (
        system:
        let
          pkgs = pkgsFor system;
          python = pkgs.python3.withPackages (ps: [ ps.pyyaml ]);
        in
        {
          default = pkgs.mkShell {
            packages = [
              pkgs.actionlint
              pkgs.librsvg
              pkgs.nodejs_22
              pkgs.ripgrep
              python
            ];
          };

          examples = pkgs.mkShell {
            packages = [
              pkgs.nodejs_22
            ] ++ pkgs.lib.optionals pkgs.stdenv.isLinux [
              pkgs.chromium
            ];
            shellHook = pkgs.lib.optionalString pkgs.stdenv.isLinux ''
              export CHROMIUM_BIN="${pkgs.chromium}/bin/chromium"
            '';
          };
        }
      );

      checks = eachSystem (
        system:
        let
          pkgs = pkgsFor system;
        in
        {
          validation = pkgs.stdenvNoCC.mkDerivation {
            name = "fieldcraft-validation";
            src = self;
            nativeBuildInputs = [
              pkgs.actionlint
              pkgs.fontconfig
              pkgs.librsvg
              pkgs.nodejs_22
            ];
            dontConfigure = true;
            dontBuild = true;
            installPhase = ''
              runHook preInstall

              export HOME="$TMPDIR/home"
              export XDG_CACHE_HOME="$TMPDIR/xdg-cache"
              export FONTCONFIG_FILE="${pkgs.fontconfig.out}/etc/fonts/fonts.conf"
              mkdir -p "$HOME" "$XDG_CACHE_HOME"

              for svg in assets/*.svg; do
                test -f "$svg.prompt.md" || {
                  echo "missing prompt: $svg.prompt.md" >&2
                  exit 1
                }

                rsvg-convert "$svg" >/dev/null
              done

              find .github/workflows -type f \( -name '*.yml' -o -name '*.yaml' \) -exec actionlint {} +

              test -f examples/form-feedback-comparison/comparison.png
              test -f examples/form-feedback-comparison/without-fieldcraft/index.html
              test -f examples/form-feedback-comparison/with-fieldcraft/index.html
              node --check scripts/render-example-comparison.mjs

              mkdir -p "$out"
              touch "$out/ok"

              runHook postInstall
            '';
          };
        }
      );
    };
}
