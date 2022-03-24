import React, { useEffect, useRef, useState } from 'react'

import './HackerNews.css'
import { New, News } from '../../interfaces'
import { CardNew } from '../CardNew/CardNew'
import { LANGUAGE_OPTIONS, URI } from './model'
import { useFavesHackerNews } from '../../hooks/useFavesHackerNews'
import { useFetch } from '../../hooks/useFetch'
import { Select } from '../Select/Select'

export const HackerNews = () => {

    const [hackerNews, setHackerNews] = useState<News | null>(null)
    const [languageFiltered, setLanguageFiltered] = useState(localStorage.getItem('languageFiltered') || '')
    const [page, setPage] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const { GET } = useFetch()
    const { favesHackerNews, saveFaveHackerNew, deleteFaveHackerNew } = useFavesHackerNews()
    const observer = useRef<IntersectionObserver | null>(null)
    const visor = useRef<HTMLDivElement>(null)

    useEffect(() => {
        let newURI = new URL(URI)
        if (languageFiltered) { newURI.searchParams.append('query', languageFiltered) }
        if (page) { newURI.searchParams.append('page', page.toString()) }
        getHackerNews(newURI.toString())
    }, [languageFiltered, page])

    useEffect(() => {
        if (!visor.current) { return }
        if (!hackerNews) { return }
        if (hackerNews.page >= hackerNews.nbPages) { return }

        if (isLoading) { observer.current = null }
        if (!isLoading) {
            observer.current = new IntersectionObserver((entries) => {
                const [entry] = entries
                if (entry.isIntersecting) { setPage(page => page + 1) }
            })
            observer.current.observe(visor.current)
        }

        return () => {
            if (!observer.current || !visor.current) { return }
            return observer.current?.unobserve(visor.current)
        }
    }, [isLoading])

    useEffect(() => {
        if (!hackerNews) { return }

        const hackerNewsFiltered = filterValidNews(hackerNews.hits)
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

    const filterValidNews = (hackerNews: New[]) => {
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
            console.log('ERR', err);
            setIsLoading(false)
        }
    }

    const onChangeNewsType = (languageSelected: string) => {
        // const currentFilteredLanguage = e.currentTarget.value
        localStorage.setItem('languageFiltered', languageSelected)
        setLanguageFiltered(languageSelected)
        setHackerNews(null)
        setPage(0)
    }

    return (
        <>
            <div className="news--type">
                <Select
                    options={LANGUAGE_OPTIONS}
                    optionSelected={languageFiltered}
                    setOptionsSelected={onChangeNewsType}
                />
            </div>
            <div className="news--items">
                {hackerNews && <>
                    {hackerNews.hits.map((cur, idx) => <CardNew
                        key={`${cur.objectID}${idx}`}
                        hackerNew={cur}
                        onSaveFave={() => saveFaveHackerNew(cur)}
                        onDeleteFave={() => deleteFaveHackerNew(cur.objectID)}
                    />)}
                    <div id="visor" ref={visor} ></div>
                </>}
                {isLoading && <p>Loading...</p>}
                {!hackerNews && !isLoading && <p>No data, select other option</p>}
            </div>
        </>
    )
}
