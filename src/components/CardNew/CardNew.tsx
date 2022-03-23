import React from 'react'
import SVG from 'react-inlinesvg';
import './CardNew.css'

export const CardNew = ({ src }: { src: string }) => {
    return (
        <article className='new'>
            <div className="new--content">
                <time className='date'>
                    <img className='icon' src="src/assets/iconmonstr-time-2_2.svg" alt="" />
                    2 hours ago by author
                </time>
                <p >All the fundamental React.js concepts, jammed into this single Medium article (updated August 2019)</p>
            </div>

            <div className="new--options">
                <button>
                    <SVG src={src}>Favorite Icon</SVG>
                </button>
            </div>
        </article>
    )
}
