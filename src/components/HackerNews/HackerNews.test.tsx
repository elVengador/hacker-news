import { render, screen } from '@testing-library/react'
import { act } from 'react-dom/test-utils';

import { HackerNews } from './HackerNews'
import { New, News } from '../../interfaces';

const HACKER_NEWS_MOCK: New[] = [{
    objectID: '001',
    author: 'elVengador',
    created_at: new Date().toISOString(),
    isFave: false,
    story_title: 'Amazing history',
    story_url: 'blog.jimynicanor.com'
}]

jest.mock('../../hooks/useHackerNews', () => ({
    useHackerNews: () => {
        const hackerNews: News = {
            hits: HACKER_NEWS_MOCK,
            hitsPerPage: 2,
            nbPages: 2,
            page: 0
        }
        return { hackerNews, setHackerNews: jest.fn, refetching: jest.fn, isLoading: false }
    }
}));

describe('Hacker News', () => {

    beforeEach(() => {
        const mockIntersectionObserver = jest.fn();
        mockIntersectionObserver.mockReturnValue({
            observe: () => null,
            unobserve: () => null,
            disconnect: () => null
        });
        window.IntersectionObserver = mockIntersectionObserver;
    });

    it('should render Hacker News with data fetched ', () => {
        act(() => { render(<HackerNews />) })
        expect(screen.getByText(HACKER_NEWS_MOCK[0].story_title)).toBeInTheDocument()
    });

});