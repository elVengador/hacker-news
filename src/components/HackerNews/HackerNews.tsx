import React, { useEffect, useState } from 'react'

import './HackerNews.css'
import { New, News } from '../../interfaces'
import { CardNew } from '../CardNew/CardNew'
import { LANGUAGE_OPTIONS, URI } from './model'
import { useFavesHackerNews } from '../../hooks/useFavesHackerNews'



export const HackerNews = () => {

    const [hackerNews, setHackerNews] = useState<News | null>(null)
    const [languageFiltered, setLanguageFiltered] = useState(localStorage.getItem('languageFiltered') || '')
    const [page, setPage] = useState('')

    const { favesHackerNews, saveFaveHackerNew, deleteFaveHackerNew } = useFavesHackerNews()

    useEffect(() => {
        let newURI = new URL(URI)
        if (languageFiltered) { newURI.searchParams.append('query', languageFiltered) }
        if (page) { newURI.searchParams.append('page', page) }

        console.log('NEW URI:', newURI.toString());

        getHackerNews(newURI.toString())


    }, [languageFiltered, page])

    useEffect(() => {
        if (!hackerNews) { return }

        const hackerNewsFiltered = filterData(hackerNews.hits)
        const hackerNewsMapped: New[] = mappedNews(hackerNewsFiltered)
        const dataProcess = { ...hackerNews, hits: hackerNewsMapped }
        setHackerNews(dataProcess)
    }, [favesHackerNews])

    const hackerNewHasValidData = (hackerNew: New) => {
        return hackerNew.author &&
            hackerNew.created_at &&
            hackerNew.objectID &&
            hackerNew.story_title &&
            hackerNew.story_url
    }

    const filterData = (hackerNews: New[]) => {
        return hackerNews.filter(hackerNewHasValidData)
    }

    const isFave = (hackerNew: New, faves: New[]) => {
        const hackerNewFound = faves.find(cur => cur.objectID === hackerNew.objectID)
        return hackerNewFound ? true : false
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

    const getHackerNews = async (url: string) => {

        const res = await fetch(url)
        if (res.status !== 200) { return }

        const data: News = await res.json()
        if (!data) { return }

        const hackerNewsFiltered = filterData(data.hits)
        const hackerNewsMapped: New[] = mappedNews(hackerNewsFiltered)
        const dataProcess = { ...data, hits: hackerNewsMapped }
        setHackerNews(dataProcess)
    }

    const onChangeNewsType = (e: any) => {
        const currentFilteredLanguage = e.currentTarget.value
        localStorage.setItem('languageFiltered', currentFilteredLanguage)
        setLanguageFiltered(currentFilteredLanguage)
    }

    return (
        <>
            <div className="news--type">
                <select
                    name="language"
                    defaultValue={languageFiltered}
                    onChange={onChangeNewsType}>
                    <option value={"default"} disabled >Select your news</option>
                    {LANGUAGE_OPTIONS.map((cur) => <option
                        value={cur.value}
                        key={cur.id}
                    >{cur.name}</option>)}
                </select>
            </div>
            <div className="news--items">
                {!hackerNews && <p>No data, select other option</p>}
                {hackerNews && hackerNews.hits.map((cur) => <CardNew
                    key={cur.objectID}
                    hackerNew={cur}
                    onSaveFave={() => saveFaveHackerNew(cur)}
                    onDeleteFave={() => deleteFaveHackerNew(cur.objectID)}
                />)}
            </div>
        </>
    )
}
