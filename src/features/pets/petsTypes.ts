export interface Pet {
  id: number
  title: string
  url: string
  description: string
  createdAt: string
  estimatedSizeMb: number
  fileSizeKb: number
  favorite: boolean
}

export interface PetApiDto {
  title?: string
  description?: string
  url?: string
  createdAt?: string
  sizeKb?: number
}
