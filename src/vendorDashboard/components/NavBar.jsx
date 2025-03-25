import React from 'react'

const Navbar = ({ showLoginHandiler, showRegisterHandiler, showLogOut, logOutHandler }) => {
    const firmName = localStorage.getItem("firmName")
    return (
        <div className="navSection">
            <div className="company">
                Vendor Dashboard
            </div>
            {firmName ?
                (<div className="firmName">
                    <h1 className="loginREgister">FirmName : {firmName}</h1>
                </div>)
                : null}
            <div className="userAuth">
                {showLogOut ? (<span onClick={logOutHandler} className="loginREgister">Logout</span>) :
                    <>
                        <span onClick={showLoginHandiler} className="loginREgister">Login / </span>
                        <span onClick={showRegisterHandiler} className="loginREgister">Register</span>
                    </>}
            </div>
        </div >
    )
}

export default Navbar