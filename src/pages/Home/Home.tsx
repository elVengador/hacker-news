import React, { useState } from 'react'
import { FavesHackerNews } from '../../components/FavesHackerNews/FavesHackerNews'
import { HackerNews } from '../../components/HackerNews/HackerNews'
import { NewsType } from '../../interfaces'

import './Home.css'

export const Home = () => {

    const [newsType, setNewsType] = useState<NewsType>('ALL')

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
                {newsType === 'ALL' && <HackerNews />}
                {newsType === 'FAVES' && <FavesHackerNews />}
            </div>
        </main>
    )
}
