import React, { useState } from 'react'
import { New } from '../interfaces';

export const useFavesHackerNews = () => {

    const [favesHackerNews, setFavesHackerNews] = useState<New[]>(JSON.parse(localStorage.getItem('faves') || '[]'))

    const getFavesHackerNews = () => JSON.parse(localStorage.getItem('faves') || '[]')

    const saveFaveHackerNew = (faveHackerNew: New) => {
        const faves: New[] = getFavesHackerNews()
        const newFaveHackerNew: New = { ...faveHackerNew, isFave: true }
        const favesProcessed = [...faves, newFaveHackerNew]
        localStorage.setItem('faves', JSON.stringify(favesProcessed))

        setFavesHackerNews(getFavesHackerNews())
    }

    const deleteFaveHackerNew = (id: string) => {
        const faves: New[] = getFavesHackerNews()
        const favesProcessed = faves.filter(cur => cur.objectID !== id)
        localStorage.setItem('faves', JSON.stringify(favesProcessed))

        setFavesHackerNews(getFavesHackerNews())
    }


    return {
        favesHackerNews,
        saveFaveHackerNew,
        deleteFaveHackerNew
    }
}
