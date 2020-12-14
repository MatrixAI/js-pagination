{ pkgs ? import ./pkgs.nix {} }:

with pkgs;
pkgs.mkShell {
  nativeBuildInputs = [
    nodejs
  ];
  shellHook = ''
    echo 'Entering js-pagination'
    set -o allexport
    . ./.env
    set +o allexport
    set -v

    export PATH="$(pwd)/dist/bin:$(npm bin):$PATH"
    npm install
    mkdir --parents "$(pwd)/tmp"

    set +v
  '';
}
