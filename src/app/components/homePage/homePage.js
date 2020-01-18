import React, { Fragment, useState, useEffect, useRef } from 'react';
import SearchBar from '../searchBar/searchBar';
import { isValidQuery } from '../../utils/isValidQuery';
import searchGifApi from '../../../api/searchGifApi';
import GifList from '../../components/gifList/gifList';
import SkeletonCard from '../skeletonCard/skeletonCard';
import SkeletonCardList from '../skeletonCard/skeletonCardList';

const HomePage = () => {
    const [loading, setLoading] = useState(false);
    const [gifs, setGifs] = useState([]);
    const [query, setQuery] = useState('');
    const [isRefreshed, setIsRefreshed] = useState(false);
    const SearchBarEl = useRef(null);

    useEffect(() => {
        handleRefresh();
    }, []);

    useEffect(() => {
        const searchGifs = async () => {
            try {
                setLoading(true);

                const data = await searchGifApi(query);
                const results = data && data.data;

                setLoading(false);

                if (results.length) {
                    saveData(results, query);
                    setGifs(results);
                }
            } catch (error) {
                console.error(error);
            }
        };
        if (isValidQuery(query) && !isRefreshed) {
            searchGifs();
        }
    }, [query]);

    const handleSearch = e => {
        e.preventDefault();
        const value = SearchBarEl.current.value.toLowerCase();
        console.log(value);
        setIsRefreshed(false);
        setQuery(value);
    };

    const handleClear = () => {
        setGifs([]);
        setQuery('');
        SearchBarEl.current.value = '';
        window.sessionStorage.clear();
    };

    const handleRefresh = () => {
        if (window.performance) {
            if (parseInt(performance.navigation.type) === 1) {
                console.log('Refresh');
                setIsRefreshed(true);
                if (
                    window.sessionStorage.getItem('gifs') !== null &&
                    window.sessionStorage.getItem('query') !== null
                ) {
                    setGifs(JSON.parse(window.sessionStorage.getItem('gifs')));
                    console.log(window.sessionStorage.getItem('query'));
                    setQuery(window.sessionStorage.getItem('query').toString());
                }
            }
        }
    };

    const saveData = (gifs, query) => {
        window.sessionStorage.setItem('gifs', JSON.stringify(gifs));
        window.sessionStorage.setItem('query', query);
    };

    return (
        <Fragment>
            <header className="App-header"></header>
            <main className="main">
                <SearchBar
                    handleSearch={handleSearch}
                    handleClear={handleClear}
                    ref={SearchBarEl}
                />
                {gifs.length & !loading ? (
                    <GifList gifs={gifs} />
                ) : loading ? (
                    <SkeletonCardList />
                ) : // <div className="loading-bar"></div>
                null}
            </main>
        </Fragment>
    );
};

export default HomePage;
