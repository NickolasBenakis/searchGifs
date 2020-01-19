import React, { useRef, useState } from 'react';

const Gif = ({ id, url, image }) => {
    const cardUrlRef = useRef(null);
    const [copied, setCopied] = useState(false);

    const imageUrl = {
        backgroundImage: 'url(' + image + ')'
    };

    const applyMockClass = () => {
        let num = parseInt(new Date().getTime());
        if (num % 3 === 0 && num % 5 === 0) {
            return 'mock-blue';
        } else if (num % 3 === 0) {
            return 'mock-purple';
        } else if (num % 5 === 0) {
            return 'mock-red';
        } else {
            return 'mock-green';
        }
    };

    const copyToClipBoard = e => {
        cardUrlRef.current.select();
        cardUrlRef.current.setSelectionRange(0, 99999);
        document.execCommand('copy');
        e.target.focus();
        setCopied(true);
        setInterval(() => {
            setCopied(false);
        }, 2000);
    };

    return (
        <div className="card-container">
            <div
                className={`card lazy-load ${applyMockClass()}`}
                data={imageUrl.backgroundImage}>
                <div className="card-body"></div>
            </div>
            <span
                className="badge badge-pill copied"
                style={{ opacity: copied ? 1 : 0 }}>
                copied!
            </span>
            <div className="card-url">
                <input
                    type="text"
                    className="card-url-textarea"
                    readOnly
                    value={url}
                    ref={cardUrlRef}
                    onClick={copyToClipBoard}></input>
            </div>
        </div>
    );
};
export default Gif;
