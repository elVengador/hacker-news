import React from 'react'

import './HackerNews.css'
import { New } from '../../interfaces'
import { CardNew } from '../CardNew/CardNew'

interface HAckerNewsProps { hackerNews: New[] | null }

export const HackerNews = ({ hackerNews }: HAckerNewsProps) => {
    return (
        <div className="news--items">
            {!hackerNews && <p>No data, select other option</p>}
            {hackerNews && hackerNews.map((cur) => <CardNew
                key={cur.objectID}
                hackerNew={cur}
            />)}
        </div>
    )
}
