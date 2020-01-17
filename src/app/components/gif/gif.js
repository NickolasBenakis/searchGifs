import React from 'react';

const Gif = ({ id, title, username }) => {
    return (
        <div className="card">
            {/* <img src={image} className="card-img-top" alt="..." /> */}
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{username}</p>
                {/* <p className="card-text">{releaseDate}</p> */}
            </div>
        </div>
    );
};

export default Gif;
