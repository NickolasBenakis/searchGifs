import React from 'react';

const Gif = ({ id, title, username, image }) => {
    const divStyle = {
        backgroundImage: 'url(' + image + ')'
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
