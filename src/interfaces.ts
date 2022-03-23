export interface LanguageOption {
    id: string,
    name: string,
    value: string,
    icon: string
}

export interface New {
    objectID: string,
    author: string
    story_title: string,
    story_url: string,
    created_at: string
    isFave: boolean
}

export interface News {
    hits: New[],
    page: number,
    nbPages: number,
    hitsPerPage: number,
}

export type NewsType = 'ALL' | 'FAVES'