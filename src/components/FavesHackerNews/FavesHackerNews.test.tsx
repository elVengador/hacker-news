import { render, screen } from '@testing-library/react'
import { act } from 'react-dom/test-utils';

import { FavesHackerNews } from './FavesHackerNews'
import { New } from '../../interfaces';

const HACKER_NEWS_MOCK: New[] = [{
    objectID: '001',
    author: 'elVengador',
    created_at: new Date().toISOString(),
    isFave: true,
    story_title: 'Amazing history',
    story_url: 'blog.jimynicanor.com'
}]

jest.mock('../../hooks/useFavesHackerNews', () => ({
    useFavesHackerNews: () => ({
        favesHackerNews: HACKER_NEWS_MOCK,
        deleteFaveHackerNew: jest.fn
    })
}));

describe('Faves Hacker News', () => {

    beforeEach(() => {
        const mockIntersectionObserver = jest.fn();
        mockIntersectionObserver.mockReturnValue({
            observe: () => null,
            unobserve: () => null,
            disconnect: () => null
        });
        window.IntersectionObserver = mockIntersectionObserver;
    });

    it('should render faves Hacker News with data fetched ', () => {
        act(() => { render(<FavesHackerNews />) })
        expect(screen.getByText(HACKER_NEWS_MOCK[0].story_title)).toBeInTheDocument()
    });

});