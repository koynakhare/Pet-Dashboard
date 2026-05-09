export interface Pet {
  id: number
  title: string
  url: string
  description: string
  createdAt: string
  estimatedSizeMb: number
  fileSizeKb: number
  tags: string[]
  favorite: boolean
}

export interface PetApiDto {
  title?: string
  description?: string
  url?: string
  createdAt?: string
  sizeKb?: number
  tags?: string[]
}
