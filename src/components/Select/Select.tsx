import React, { useEffect, useMemo, useRef, useState } from 'react'
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

    const findSelectedOption = () => options.find(cur => cur.value === optionSelected)
    const foundOption = useMemo(findSelectedOption, [options, optionSelected])
    const selectRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (selectRef.current
                && !selectRef.current.contains(event.target as HTMLElement)
                && showOptions) {
                console.log('>> close select')
                setShowOptions(false)
            }
        };

        document.addEventListener('click', handleClickOutside, true);
        return () => document.removeEventListener('click', handleClickOutside, true);

    }, [showOptions])

    const onSelectOption = (languageSelected: string) => {
        setOptionsSelected(languageSelected)
        setShowOptions(false)
    }

    const Icon = (icon: string) => <div
        className='icon--option'
        style={{ backgroundImage: `url(${icon})` }}>
    </div>

    return (
        <div className='select' ref={selectRef}>
            <div
                className='select--value'
                onClick={() => setShowOptions(true)}
            >
                <div className='name'>
                    {foundOption && <div className='name'>
                        <span className='icon--option'>
                            {foundOption.icon && Icon(foundOption.icon)}
                        </span>
                        {foundOption.name}
                    </div>}
                    {!foundOption && <div>Select your news</div>}
                </div>
                <div className='icon' style={{ backgroundImage: `url(src/assets/arrow.svg)` }}></div>
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

                    </div>)
                }
            </div>}
        </div>
    )
}
