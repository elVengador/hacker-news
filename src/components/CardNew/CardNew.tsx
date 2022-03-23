import React from 'react'
import SVG from 'react-inlinesvg';
import './CardNew.css'

import { New } from '../../interfaces';
import { format } from 'timeago.js'

interface CardNewProps { hackerNew: New }

export const CardNew = ({ hackerNew }: CardNewProps) => {
    return (
        <article className='new'>
            <div className="new--content">
                <time className='date'>
                    <img className='icon' src="src/assets/iconmonstr-time-2_2.svg" alt="" />
                    {format(hackerNew.created_at)} by {hackerNew.author}
                </time>
                <p >{hackerNew.story_title}</p>
            </div>

            <div className="new--options">
                <button>
                    <SVG src="src/assets/iconmonstr-favorite-3_2.svg">Favorite Icon</SVG>
                </button>
            </div>
        </article>
    )
}
