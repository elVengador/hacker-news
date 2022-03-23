import React, { useEffect, useState } from 'react'
import { CardNew } from '../../components/CardNew/CardNew'
import { LanguageOption, New, News, NewsType } from '../../interfaces'

import './Home.css'

const URI = 'https://hn.algolia.com/api/v1/search_by_date'

const languageOptions: LanguageOption[] = [
    {
        id: '01',
        name: 'Angular',
        value: 'angular',
        icon: ''
    },
    {
        id: '02',
        name: 'Reacts',
        value: 'reactjs',
        icon: ''
    },
    {
        id: '03',
        name: 'Vuejs',
        value: 'vuejs',
        icon: ''
    },
]

export const Home = () => {

    const [hackerNews, setHackerNews] = useState<News | null>(null)
    const [hackerNewsFiltered, setHackerNewsFiltered] = useState<New[]>([])
    const [newsType, setNewsType] = useState<NewsType>('ALL')
    const [languageFiltered, setLangageFiltered] = useState(localStorage.getItem('languageFiltered') || '')
    const [page, setPage] = useState('')

    useEffect(() => {
        let newURI = new URL(URI)
        if (languageFiltered) { newURI.searchParams.append('query', languageFiltered) }
        if (page) { newURI.searchParams.append('page', page) }

        console.log('NEW URI:', newURI.toString());

        getHackerNews(newURI.toString())


    }, [languageFiltered, page])

    const getHackerNews = async (url: string) => {

        const res = await fetch(url)
        if (res.status !== 200) { return }

        const data: News = await res.json()
        console.log('data', data);
        setHackerNews(data)
        setHackerNewsFiltered(filterData(data))
    }

    const onViewAllNews = () => { setNewsType('ALL') }
    const onViewMyFavesNews = () => { setNewsType('FAVES') }
    const onChangeNewsType = (e: any) => {
        const currentFilteredLanguage = e.currentTarget.value
        localStorage.setItem('languageFiltered', currentFilteredLanguage)
        setLangageFiltered(currentFilteredLanguage)
    }

    const newHasValidData = (hackerNew: New) => {
        return hackerNew.author &&
            hackerNew.created_at &&
            hackerNew.objectID &&
            hackerNew.story_title &&
            hackerNew.story_url
    }

    const filterData = (news: News) => {
        if (!news) { return [] }
        return news.hits.filter(cur => newHasValidData(cur))
    }

    return (
        <main className='news'>
            <div className="wrapper">
                <div className="news--controlls">
                    <button
                        className={newsType === 'ALL' ? 'active' : ''}
                        style={{ borderRadius: '2px 0px 0px 2px' }}
                        onClick={onViewAllNews}
                    >All</button>
                    <button
                        className={newsType === 'FAVES' ? 'active' : ''}
                        style={{ borderRadius: '0px 2px 2px 0px' }}
                        onClick={onViewMyFavesNews}
                    >My faves</button>
                </div>
                {
                    newsType === 'ALL' && <>
                        <div className="news--type">
                            <select
                                name="language"
                                defaultValue={languageFiltered}
                                onChange={onChangeNewsType}>
                                <option value={"default"} disabled >Select your news</option>
                                {languageOptions.map((cur) => <option
                                    value={cur.value}
                                    key={cur.id}
                                >{cur.name}</option>)}
                            </select>
                        </div>
                        <div className="news--items">
                            {!hackerNews && <p>No data, select other option</p>}
                            {hackerNews && hackerNewsFiltered.map((cur) => <CardNew key={cur.objectID} hackerNew={cur} />)}
                        </div>
                    </>
                }
                {
                    newsType === 'FAVES' &&
                    <div className="news--items">
                        {!hackerNews && <p>No data, select other option</p>}
                        {hackerNews && hackerNewsFiltered.map((cur) => <CardNew key={cur.objectID} hackerNew={cur} />)}
                    </div>

                }
            </div>
        </main>
    )
}
