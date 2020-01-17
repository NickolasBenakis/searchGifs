import React, { Fragment } from 'react';
import Gif from '../gif/gif';

const GifList = ({ gifs }) => {
    return (
        <Fragment>
            <div className="gif-list">
                {gifs.map(gif => {
                    return (
                        <Gif
                            key={gif.id}
                            id={gif.id}
                            title={gif.title}
                            image={gif.username}
                        />
                    );
                })}
            </div>
        </Fragment>
    );
};

export default GifList;
