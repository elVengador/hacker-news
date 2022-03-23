import React, { useEffect, useState } from 'react'
import { CardNew } from '../../components/CardNew/CardNew'

import './Home.css'

interface LanguageOption {
    id: string,
    name: string,
    icon: string
}

type NewsType = 'ALL' | 'FAVES'

export const Home = () => {

    const [newsType, setNewsType] = useState<NewsType>('ALL')

    const URI = 'https://hn.algolia.com/api/v1/search_by_date'

    const languageOptions: LanguageOption[] = [
        {
            id: '01',
            name: 'Angular',
            icon: ''
        },
        {
            id: '02',
            name: 'Reacts',
            icon: ''
        },
        {
            id: '03',
            name: 'Vuejs',
            icon: ''
        },
    ]

    // const { data, error, isLoading } = useGet('')

    const onViewAllNews = () => { setNewsType('ALL') }
    const onViewMyFavesNews = () => { setNewsType('FAVES') }

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
                <div className="news--type">
                    <select name="language" id="" defaultValue={"default"}>
                        <option value={"default"} disabled >Select your news</option>
                        {
                            languageOptions.map((cur, idx) => <option value="" key={idx}>{cur.name}</option>)
                        }
                    </select>
                </div>
                <div className="news--items">
                    <CardNew src='src/assets/iconmonstr-favorite-3_2.svg' />
                    <CardNew src='src/assets/iconmonstr-favorite-3_2.svg' />
                    <CardNew src='src/assets/iconmonstr-favorite-3_2.svg' />
                    <CardNew src='src/assets/iconmonstr-favorite-3_2.svg' />
                    <CardNew src='src/assets/iconmonstr-favorite-3_2.svg' />
                    <CardNew src='src/assets/iconmonstr-favorite-3_2.svg' />
                    <CardNew src='src/assets/iconmonstr-favorite-3_2.svg' />
                    <CardNew src='src/assets/iconmonstr-favorite-3_2.svg' />
                    <CardNew src='src/assets/iconmonstr-favorite-3_2.svg' />
                    <CardNew src='src/assets/iconmonstr-favorite-3_2.svg' />
                </div>
            </div>
        </main>
    )
}
