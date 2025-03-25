import React from 'react'
import { Link } from 'react-router-dom'


const PageNotFound = () => {
    return (
        <>
            <div className='errorSection'>
                <h1>404</h1>
                <div>Page Not found</div>
                <Link to="/" style={{ fontSize: '1.5rem', color: 'darkblue' }}>
                    <p>go back</p>
                </Link>
            </div>
        </>
    )
}

export default PageNotFound