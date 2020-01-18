import React, { Fragment, useState, useEffect, useRef } from 'react';
import SearchBar from '../searchBar/searchBar';
import { isValidQuery } from '../../utils/isValidQuery';
import searchGifApi from '../../../api/searchGifApi';
import GifList from '../../components/gifList/gifList';
import SkeletonCardList from '../skeletonCard/skeletonCardList';
import useDebounce from '../../hooks/useDebounce';

const HomePage = () => {
    const [loading, setLoading] = useState(false);
    const [noResults, setNoResults] = useState(false);
    const [gifs, setGifs] = useState([]);
    const [query, setQuery] = useState('');
    const [isRefreshed, setIsRefreshed] = useState(false);
    const SearchBarRef = useRef(null);

    const debouncedQuery = useDebounce(query, 400);

    useEffect(() => {
        SearchBarRef.current.focus();
        handleRefresh();
    }, []);

    useEffect(() => {
        const searchGifs = async () => {
            try {
                setLoading(true);

                let results = await searchGifApi(query);
                results = results.data;
                console.log(results);
                setLoading(false);

                if (results) {
                    saveData(results, query);
                    setGifs(results);
                }
                if (!results.length) {
                    setNoResults(true);
                }
            } catch (error) {
                console.error(error);
            }
        };
        if (isValidQuery(debouncedQuery) && !isRefreshed) {
            searchGifs();
        }
        // eslint-disable-next-line
    }, [debouncedQuery]);

    const handleSearch = e => {
        e.preventDefault();
        const value = SearchBarRef.current.value.toLowerCase();
        console.log(value);
        setIsRefreshed(false);
        setQuery(value);
    };

    const handleClear = () => {
        setGifs([]);
        setQuery('');
        setNoResults(false);
        SearchBarRef.current.value = '';
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
                    SearchBarRef.current.value = window.sessionStorage
                        .getItem('query')
                        .toString();
                    setQuery(window.sessionStorage.getItem('query').toString());
                }
            }
        }
    };

    // const abortHandler = () => {

    // }

    const saveData = (gifs, query) => {
        window.sessionStorage.setItem('gifs', JSON.stringify(gifs));
        window.sessionStorage.setItem('query', query);
    };

    return (
        <Fragment>
            <main className="main">
                <SearchBar
                    handleSearch={handleSearch}
                    handleClear={handleClear}
                    ref={SearchBarRef}
                />
                {gifs.length & !loading ? (
                    <GifList gifs={gifs} />
                ) : noResults ? (
                    <div className="alert alert-warning" role="alert">
                        No results !
                    </div>
                ) : loading ? (
                    <SkeletonCardList />
                ) : null}
            </main>
        </Fragment>
    );
};

export default HomePage;
