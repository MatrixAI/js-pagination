{
  pkgs ? import ./pkgs.nix,
  nodeVersion ? "10_x"
}:
  with pkgs;
  let
    nodejs = lib.getAttrFromPath
            (lib.splitString "." ("nodejs-" + nodeVersion))
            pkgs;
    nodePackages = lib.getAttrFromPath
                   (lib.splitString "." ("nodePackages_" + nodeVersion))
                   pkgs;
    drv = (import ./package.nix { inherit pkgs nodejs; }).package;
  in
    drv.override (attrs: {
      src = nix-gitignore.gitignoreSource [] attrs.src;
    })
