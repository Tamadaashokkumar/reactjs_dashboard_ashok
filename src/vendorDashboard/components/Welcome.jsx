import React from 'react'

const Welcome = () => {
    const firmName = localStorage.getItem("firmName")

    return (
        <div className='welcomeSection'>
            <h2>Welcome {firmName}</h2>

        </div>
    )
}

export default Welcome