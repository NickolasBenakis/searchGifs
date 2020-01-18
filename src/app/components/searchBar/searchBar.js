import React, { Fragment } from 'react';

const SearchBar = ({ handleSearch, handleClear }, ref) => {
    return (
        <Fragment>
            <form method="POST" onSubmit={handleSearch} className="form">
                <div className="form-group">
                    <input
                        ref={ref}
                        className="form__searchbar form-control"
                        id="main-search-bar"
                        type="text"
                        name="search"
                        autoCapitalize="off"
                        autoCorrect="off"
                        placeholder="search GIPHY"
                    />
                    <button
                        id="submit-btn"
                        className="btn btn-primary form__searchbar-submit"
                        type="submit"
                        name="submit"
                        value="search">
                        Search
                    </button>
                </div>
            </form>
            <div className="clear">
                <button
                    className="btn btn-secondary form__searchbar-clear"
                    onClick={handleClear}>
                    Clear
                </button>
            </div>
        </Fragment>
    );
};

const forwardedSearchBar = React.forwardRef(SearchBar);
export default forwardedSearchBar;
