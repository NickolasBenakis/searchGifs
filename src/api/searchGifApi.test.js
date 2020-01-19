import fetchMock from 'fetch-mock';
import { gifJSONsample } from './__mocks__/searchGifSample';

describe('search Gif Api', () => {
    it('should fetch Gifs ', async () => {
        fetchMock.get(
            'https://api.giphy.com/v1/gifs/search?api_key=tjRgt5224O4KraMmsvjyjuNsd0gnB4wE&q=nikos',
            gifJSONsample
        );

        const response = await fetch(
            'https://api.giphy.com/v1/gifs/search?api_key=tjRgt5224O4KraMmsvjyjuNsd0gnB4wE&q=nikos'
        );
        const result = await response.json();
        expect(result).toEqual(gifJSONsample);
    });
});
