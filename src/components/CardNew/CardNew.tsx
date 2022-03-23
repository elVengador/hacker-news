import React from 'react'
import SVG from 'react-inlinesvg';
import './CardNew.css'

import { New } from '../../interfaces';
import { format } from 'timeago.js'

interface CardNewProps { hackerNew: New }

export const CardNew = ({ hackerNew }: CardNewProps) => {
    return (
        <article className='new'>
            <a className="new--content" href={hackerNew.story_url} target="_blank" rel="noopener noreferrer">
                <time className='date'>
                    <img className='icon' src="src/assets/iconmonstr-time-2_2.svg" alt="" />
                    {format(hackerNew.created_at)} by {hackerNew.author}
                </time>
                <p >{hackerNew.story_title}</p>
            </a>

            <div className="new--options">
                <button>
                    <SVG src="src/assets/iconmonstr-favorite-3_2.svg">Favorite Icon</SVG>
                </button>
            </div>
        </article>
    )
}
