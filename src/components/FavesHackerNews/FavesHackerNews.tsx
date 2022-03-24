import React from 'react'

import './FavesHackerNews.css'
import { CardNew } from '../CardNew/CardNew'
import { useFavesHackerNews } from '../../hooks/useFavesHackerNews'

export const FavesHackerNews = () => {

    const { favesHackerNews, deleteFaveHackerNew } = useFavesHackerNews()

    return (
        <div className="news--items">
            {favesHackerNews && favesHackerNews.map((cur) => <CardNew
                key={cur.objectID}
                hackerNew={cur}
                onDeleteFave={() => deleteFaveHackerNew(cur.objectID)}
            />)}
        </div>
    )
}
