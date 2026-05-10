/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_FORCE_PETS_DUAL_FAILURE?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
