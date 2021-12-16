import React from 'react'
import './Error404.css'

const Error404 = () => {
    return (
        <div className='Error404body'>
            <h1 className="Error404">404</h1>
            <div className="cloak__wrapper">
                <div className="cloak__container">
                    <div className="cloak"></div>
                </div>
            </div>
            <div className="info">
                <h2>We can't find that page</h2>
                <p>We're fairly sure that page used to be here, but seems to have gone missing. We do apologise on it's behalf.</p><a href="https://jhey.dev" target="_blank" rel="noreferrer noopener">Home</a>
            </div>
        </div>
    )
}

export default Error404;
