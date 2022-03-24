import React, { useEffect, useRef, useState } from 'react'
import "./Select.css"

export interface Option {
    id: string,
    name: string,
    value: string,
    icon?: string
}

export interface SelectProps {
    options: Option[]
    optionSelected: string,
    setOptionsSelected: (languageSelected: string) => void
}

export const Select = ({ options, optionSelected, setOptionsSelected }: SelectProps) => {

    const [showOptions, setShowOptions] = useState(false)
    const foundOption = useRef<Option>(null)

    // useEffect(() => {
    //     foundOption.current = options.find(cur => cur.value === optionSelected)
    //     if (tt) {

    //     }
    //     // foundOption.current = options.find(cur => cur.value === optionSelected)
    // }, [optionSelected])

    const onSelectOption = (languageSelected: string) => {
        setOptionsSelected(languageSelected)
        setShowOptions(false)
    }

    const Icon = (icon: string) => <div className='icon--option' style={{ backgroundImage: `url(${icon})` }}></div>

    const buildOptionSelected = (optionSelected: string) => {
        const foundOptions = options.find(cur => cur.value === optionSelected)

        if (foundOptions) {
            return <>
                <div className='name'>
                    <span className='icon--option'>
                        {foundOptions.icon && Icon(foundOptions.icon)}
                    </span>
                    {foundOptions.name}
                </div>
                <div className='icon' style={{ backgroundImage: `url(src/assets/arrow.svg)` }}></div>
            </>
        }
        return <>
            <div>Select your news</div>
            <div className='icon' style={{ backgroundImage: `url(src/assets/arrow.svg)` }}></div>
        </>
    }

    return (
        <div className='select'>
            <div
                className='select--value'
                onClick={() => setShowOptions(true)}
            >
                {buildOptionSelected(optionSelected)}
            </div>
            {showOptions && <div className="select--options">
                {
                    options.map(cur => <div
                        className="option"
                        key={cur.id}
                        onClick={() => onSelectOption(cur.value)}
                    >
                        {cur.icon && Icon(cur.icon)}
                        <div>{cur.name}</div>

                    </div>
                    )
                }
            </div>}
        </div>
    )
}
