import React from 'react'
import SVG from 'react-inlinesvg';
import './CardNew.css'

import { New } from '../../interfaces';
import { format } from 'timeago.js'

interface CardNewProps {
    hackerNew: New,
    onSaveFave?: () => void,
    onDeleteFave: () => void
}

export const CardNew = ({
    hackerNew,
    onSaveFave,
    onDeleteFave
}: CardNewProps) => {

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
                {
                    hackerNew.isFave && <button
                        className='fave'
                        onClick={onDeleteFave}
                        title="Delete from faves"
                    >
                        <SVG src="src/assets/iconmonstr-favorite-3_2.svg">Favorite Icon</SVG>
                    </button>
                }
                {
                    !hackerNew.isFave && <button
                        className='no-fave'
                        onClick={onSaveFave}
                        title="Add to faves"
                    >
                        <SVG src="src/assets/iconmonstr-favorite-2_2.svg">Favorite Icon</SVG>
                    </button>
                }
            </div>
        </article>
    )
}
