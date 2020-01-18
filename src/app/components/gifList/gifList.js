import React, { Fragment } from 'react';
import Gif from '../gif/gif';
import { handleImageUrl } from '../../utils/handleImageUrl';
const GifList = ({ gifs }) => {
    return (
        <Fragment>
            <div className="gif-list">
                {gifs.map(gif => {
                    return (
                        <Gif
                            key={gif.id}
                            id={gif.id}
                            url={gif.url}
                            image={handleImageUrl(
                                gif.images.downsized_large.url
                            )}
                        />
                    );
                })}
            </div>
        </Fragment>
    );
};
export default GifList;
