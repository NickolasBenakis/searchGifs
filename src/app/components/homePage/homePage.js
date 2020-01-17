import React, { Fragment, useState, useEffect } from 'react';
import SearchBar from '../searchBar/searchBar';
import { isValidQuery } from '../../utils/isValidQuery';
import searchGifApi from '../../../api/searchGifApi';
import GifList from '../../components/gifList/gifList';

const HomePage = () => {
    const [loading, setLoading] = useState(false);
    const [gifs, setGifs] = useState([]);
    const [query, setQuery] = useState('');

    useEffect(() => {
        const searchGifs = async () => {
            let data = await searchGifApi(query);
            const results = data && data.data;
            console.log(results);
            if (results.length) {
                setGifs(results);
                setLoading(false);
            }
        };
        if (isValidQuery(query)) {
            setLoading(true);
            searchGifs();
        }
    }, [query]);

    const handleSearch = e => {
        e.preventDefault();
        const el = document.getElementById('main-search-bar');
        const value = el.value.toLowerCase();
        console.log(value);
        setQuery(value);
    };

    return (
        <Fragment>
            <header className="App-header"></header>
            <main className="main">
                <SearchBar handleSearch={handleSearch} />
                {gifs.length ? (
                    <GifList gifs={gifs} />
                ) : loading ? (
                    <div className="loading-bar"></div>
                ) : null}
            </main>
        </Fragment>
    );
};

export default HomePage;
