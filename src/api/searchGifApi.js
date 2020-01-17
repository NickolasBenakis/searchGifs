import { apiKey } from '../apiKey.js';

export default query => {
    const url = `http://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${query}`;
    return fetch(url, {
        method: 'GET'
    })
        .then(data => data.json())
        .then(res => res)
        .catch(error => console.log(error));
};
