import React, { Fragment, useState, useEffect, useRef } from 'react';
import SearchBar from '../searchBar/searchBar';
import { isValidQuery } from '../../utils/isValidQuery';
import searchGifApi from '../../../api/searchGifApi';
import GifList from '../../components/gifList/gifList';
import SkeletonCardList from '../skeletonCard/skeletonCardList';
import useDebounce from '../../hooks/useDebounce';
import lazyLoadImages from '../../utils/lazyLoadImages';

const HomePage = () => {
    const [loading, setLoading] = useState(false);
    const [noResults, setNoResults] = useState(false);
    const [networkError, setNetworkError] = useState(false);
    const [isRefreshed, setIsRefreshed] = useState(false);

    const [gifs, setGifs] = useState([]);
    const [query, setQuery] = useState('');
    const SearchBarRef = useRef(null);

    const debouncedQuery = useDebounce(query, 400);

    useEffect(() => {
        SearchBarRef.current.focus();
        handleRefresh();
    }, []);

    useEffect(() => {
        const searchGifs = async () => {
            try {
                setNoResults(false);
                setNetworkError(false);
                setLoading(true);

                const apiResponse = await searchGifApi(debouncedQuery);
                const results = apiResponse.data;
                const { status } = apiResponse.meta;

                setLoading(false);

                if (results.length && status === 200) {
                    saveData(results, debouncedQuery);
                    setGifs(results);
                }
                if (!results.length && status === 200) {
                    setNoResults(true);
                }
                if (status !== 200) {
                    setNetworkError(true);
                }
            } catch (error) {
                console.log(error);
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
        setIsRefreshed(false);
        setQuery(value);
    };

    const handleClear = () => {
        setGifs([]);
        setQuery('');
        setNoResults(false);
        setNetworkError(false);
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

    const showGifs = () => {
        if (gifs.length && !loading) {
            setTimeout(() => {
                lazyLoadImages();
            }, 1000);
            return true;
        } else {
            return false;
        }
    };

    return (
        <Fragment>
            <main className="main">
                <SearchBar
                    handleSearch={handleSearch}
                    handleClear={handleClear}
                    ref={SearchBarRef}
                />
                {networkError ? (
                    <div className="alert alert-danger" role="alert">
                        Oups! NetworkError
                    </div>
                ) : noResults ? (
                    <div className="alert alert-warning" role="alert">
                        No results !
                    </div>
                ) : loading ? (
                    <SkeletonCardList />
                ) : showGifs() ? (
                    <GifList gifs={gifs} />
                ) : null}
            </main>
        </Fragment>
    );
};

export default HomePage;
