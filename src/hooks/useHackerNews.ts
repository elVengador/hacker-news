import React, { useEffect, useState } from 'react'
import { New, News } from '../interfaces';
import { useFavesHackerNews } from './useFavesHackerNews';
import { fetchUtil } from '../utils/fetch.util';

const { GET } = fetchUtil()

export const useHackerNews = ({ favesHackerNews }: { favesHackerNews: New[] }) => {

    const [hackerNews, setHackerNews] = useState<News | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (!hackerNews) { return }

        const hackerNewsFiltered = filterValidNews(hackerNews.hits)
        const hackerNewsMapped: New[] = mappedNews(hackerNewsFiltered)
        const dataProcess = { ...hackerNews, hits: hackerNewsMapped }
        setHackerNews(dataProcess)
    }, [favesHackerNews])

    const filterValidNews = (hackerNews: New[]) => {
        return hackerNews.filter(cur => cur.author
            && cur.created_at
            && cur.objectID
            && cur.story_title
            && cur.story_url
        )
    }

    const mappedNews = (hackerNews: New[]) => {
        return hackerNews.map(cur => ({
            author: cur.author,
            created_at: cur.created_at,
            objectID: cur.objectID,
            story_title: cur.story_title,
            story_url: cur.story_url,
            isFave: isFave(cur, favesHackerNews),
        }))
    }

    const isFave = (hackerNew: New, faves: New[]) => {
        const hackerNewFound = faves.find(cur => cur.objectID === hackerNew.objectID)
        return hackerNewFound ? true : false
    }

    const refetching = async (url: string) => {
        try {
            setIsLoading(true)
            const data = await GET<News>(url)
            const hackerNewsFiltered = filterValidNews(data.hits)
            const hackerNewsMapped: New[] = mappedNews(hackerNewsFiltered)
            const previousHackerNews = hackerNews?.hits || []
            const dataProcess = { ...data, hits: [...previousHackerNews, ...hackerNewsMapped] }
            setHackerNews(dataProcess)
            setIsLoading(false)
        } catch (err) {
            console.error('ERR', err);
            setIsLoading(false)
        }
    }


    return { hackerNews, setHackerNews, refetching, isLoading }
}