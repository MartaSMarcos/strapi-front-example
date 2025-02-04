export type CoverFormat = {
    name: string
    hash: string
    ext: string
    mime: string
    path: string | null
    width: number
    height: number
    size: number
    sizeInBytes: number
    url: string
}

export type CoverFormats = {
    thumbnail?: CoverFormat
    small?: CoverFormat
    medium?: CoverFormat
    large?: CoverFormat
}

export type Cover = {
    id: number
    documentId: string
    name: string
    alternativeText: string | null
    caption: string | null
    width: number
    height: number
    formats: CoverFormats
    hash: string
    ext: string
    mime: string
    size: number
    url: string
    previewUrl: string | null
    provider: string
    provider_metadata: unknown | null
    createdAt: string
    updatedAt: string
    publishedAt: string
}
