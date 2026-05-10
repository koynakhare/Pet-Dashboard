/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string
  readonly VITE_FORCE_PETS_DUAL_FAILURE?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
