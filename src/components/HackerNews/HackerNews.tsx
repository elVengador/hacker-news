import React, { useEffect, useRef, useState } from 'react'

import './HackerNews.css'
import { CardNew } from '../CardNew/CardNew'
import { LANGUAGE_OPTIONS, URI } from './model'
import { useFavesHackerNews } from '../../hooks/useFavesHackerNews'
import { Select } from '../Select/Select'
import { useHackerNews } from '../../hooks/useHackerNews'

export const HackerNews = () => {

    const [languageFiltered, setLanguageFiltered] = useState(localStorage.getItem('languageFiltered') || '')
    const [page, setPage] = useState(0)
    const { favesHackerNews, saveFaveHackerNew, deleteFaveHackerNew } = useFavesHackerNews()
    const { hackerNews, setHackerNews, refetching, isLoading } = useHackerNews({ favesHackerNews })
    const observer = useRef<IntersectionObserver | null>(null)
    const visor = useRef<HTMLDivElement>(null)


    useEffect(() => {
        let newURI = new URL(URI)
        if (languageFiltered) { newURI.searchParams.append('query', languageFiltered) }
        if (page) { newURI.searchParams.append('page', page.toString()) }
        refetching(newURI.toString())
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

    const onChangeNewsType = (languageSelected: string) => {
        if (languageSelected === languageFiltered) { return }

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
