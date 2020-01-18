import { apiKey } from '../apiKey.js';

export default (query, signal) => {
    const url = `http://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${query}`;
    const params = {
        method: 'GET',
        signal
    };
    return fetch(url, params)
        .then(data => data.json())
        .then(res => res)
        .catch(err => {
            if (err.name === 'AbortError') {
                console.log('Fetch aborted');
            } else {
                console.error('Uh oh, an error!', err);
            }
        });
};
