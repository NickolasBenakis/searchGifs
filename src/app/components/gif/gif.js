import React from 'react';
import defaultGif from '../../../theme/assets/giphy.gif';

const Gif = ({ id, title, username, image }) => {
    const errorHandling = image => {
        return image ? image : '../../../theme/assets/giphy.gif';
    };
    const divStyle = {
        backgroundImage: 'url(' + errorHandling(image) + ')'
    };
    return (
        <div className="card" style={divStyle}>
            <div className="card-body">
                {/* <h5 className="card-title">{title}</h5> */}
                {/* <p className="card-text">{username}</p> */}
            </div>
        </div>
    );
};

export default Gif;
