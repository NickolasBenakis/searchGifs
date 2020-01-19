import { apiKey } from '../apiKey.js';

export default (query, signal) => {
    const url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${query}`;
    const params = {
        method: 'GET',
        signal: signal
    };
    return fetch(url, params).then(data => data.json());
};
