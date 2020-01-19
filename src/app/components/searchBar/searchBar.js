import React, { Fragment } from 'react';
import gifLogo from '../../../theme/assets/gif.svg';
const SearchBar = ({ handleSearch, handleClear }, ref) => {
    return (
        <Fragment>
            <form name="searchbar" onSubmit={handleSearch} className="form">
                <img className="form__logo" src={gifLogo} alt="gifLogo" />
                <div className="form-group" role="group">
                    <input
                        ref={ref}
                        className="form__searchbar form-control"
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
