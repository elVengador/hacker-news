import { render } from '@testing-library/react'
import { screen } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'

import { LANGUAGE_OPTIONS } from '../HackerNews/model';
import { Select } from './Select'
import { useState } from 'react';
import { LanguageOption } from '../../interfaces';


const WrapperSelect = ({ options }: { options: LanguageOption[] }) => {
    const [optionSelected, setOptionSelected] = useState('')
    return <Select
        options={options}
        optionSelected={optionSelected}
        setOptionsSelected={setOptionSelected}
    />
}

describe('Select component', () => {

    it('should render select component with default value', () => {
        render(<Select
            options={LANGUAGE_OPTIONS}
            optionSelected={''}
            setOptionsSelected={() => { }}
        />)

        expect(screen.getByText('Select your news')).toBeInTheDocument()
    });

    it('should select option when clicked over an option', () => {
        render(<WrapperSelect options={LANGUAGE_OPTIONS} />)

        expect(screen.getByText('Select your news')).toBeInTheDocument()

        userEvent.click(screen.getByText('Select your news'))
        LANGUAGE_OPTIONS.map(cur => expect(screen.getByText(cur.name)))

        userEvent.click(screen.getByText(LANGUAGE_OPTIONS[0].name))
        expect(screen.getByText(LANGUAGE_OPTIONS[0].name)).toBeInTheDocument()
    });
});