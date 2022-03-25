import { render } from '@testing-library/react'
import { screen } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'

import { CardNew } from './CardNew'
import { New } from '../../interfaces';
import { useState } from 'react';

const FaveHackerNewMock: New = {
    author: 'by elVengador',
    created_at: new Date().toISOString(),
    isFave: true,
    objectID: '0001',
    story_title: 'Amazing story',
    story_url: 'blog.jimynicanor.com'
}

const NoFaveHackerNewMock: New = {
    ...FaveHackerNewMock,
    isFave: false,
}

const WrapperHackerNew = ({ noFaveHackerNew }: { noFaveHackerNew: New }) => {
    const [hackerNew, setHackerNew] = useState(noFaveHackerNew)
    const onDeleteFave = () => {
        const processedHackerNew: New = { ...hackerNew, isFave: false }
        setHackerNew(processedHackerNew)
    }
    const onSaveFave = () => {
        const processedHackerNew: New = { ...hackerNew, isFave: true }
        setHackerNew(processedHackerNew)
    }
    return <CardNew hackerNew={hackerNew} onDeleteFave={onDeleteFave} onSaveFave={onSaveFave} />
}

describe('Card New Component', () => {

    it('should  render component with correct value', () => {
        render(<CardNew hackerNew={FaveHackerNewMock} onDeleteFave={jest.fn} />)
        expect(screen.getByText(FaveHackerNewMock.story_title)).toBeInTheDocument()
    });

    it('should add to faves and then remove from faves', () => {
        render(<WrapperHackerNew noFaveHackerNew={NoFaveHackerNewMock} />)

        expect(screen.getByText(NoFaveHackerNewMock.story_title)).toBeInTheDocument()
        expect(screen.getByTitle('Add to faves')).toBeInTheDocument()
        userEvent.click(screen.getByTitle('Add to faves'))

        expect(screen.getByText(NoFaveHackerNewMock.story_title)).toBeInTheDocument()
        expect(screen.getByTitle('Delete from faves')).toBeInTheDocument()
        userEvent.click(screen.getByTitle('Delete from faves'))

        expect(screen.getByText(NoFaveHackerNewMock.story_title)).toBeInTheDocument()
        expect(screen.getByTitle('Add to faves')).toBeInTheDocument()
    });

});