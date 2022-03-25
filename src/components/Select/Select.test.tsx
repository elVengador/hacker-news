import { render } from '@testing-library/react'
import { screen } from '@testing-library/dom'
import { LANGUAGE_OPTIONS } from '../HackerNews/model';
import { Select } from './Select'



describe('Select component', () => {
    it('should render select component', () => {
        render(<Select
            options={LANGUAGE_OPTIONS}
            optionSelected={''}
            setOptionsSelected={() => { }}
        />)

        expect(screen.getByText('Select your news')).toBeInTheDocument()
    });

    // it('should show options when click on select', () => {
    //     render(<Select
    //         options={LANGUAGE_OPTIONS}
    //         optionSelected={''}
    //         setOptionsSelected={() => { }}
    //     />)

    //     expect(screen.getByText('Select your news')).toBeInTheDocument()
    // });
});