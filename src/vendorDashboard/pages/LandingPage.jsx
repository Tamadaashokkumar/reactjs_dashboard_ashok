import React, { useState, useEffect } from 'react'
import SideBar from '../components/SideBar'
import Login from '../components/forms/Login'
import Register from '../components/forms/Register'
import AddFirm from '../components/forms/AddFirm'
import AddProduct from '../components/forms/AddProduct'
import Welcome from '../components/Welcome'
import AllProducts from '../components/AllProducts'
import Navbar from '../components/NavBar'
import UserDetails from '../components/UserDetails'
const LandingPage = () => {
    const [showLogin, setShowLogin] = useState(false)
    const [showRegister, setShowRegister] = useState(false)
    const [showAddFirm, setshowAddFirm] = useState(false)
    const [showAddProduct, setShowAddProduct] = useState(false)
    const [showWelcome, setShowWelcome] = useState(false)
    const [showAllProducts, setShowAllProducts] = useState(false)
    const [showLogOut, setShowLogOut] = useState(false)
    const [firmToggle, setFrimToggle] = useState(true)
    const [userDetails, setUserDetials] = useState(false)

    const showLoginHandiler = () => {
        setShowLogin(true)
        setShowRegister(false)
        setshowAddFirm(false)
        setShowAddProduct(false)
        setShowAllProducts(false)
        setUserDetials(false)
    }
    const showRegisterHandiler = () => {
        setShowRegister(true)
        setShowLogin(false)
        setshowAddFirm(false)
        setShowAddProduct(false)
        setShowAllProducts(false)
        setUserDetials(false)
    }
    const showAddFirmHandiler = () => {
        if (showLogOut) {
            setShowRegister(false)
            setShowLogin(false)
            setshowAddFirm(true)
            setShowAddProduct(false)
            setShowAllProducts(false)
            setShowWelcome(false)
            setUserDetials(false)

        } else {
            alert("Please Login")
            setShowLogin(true)
        }

    }
    const showAddProductHandiler = () => {
        if (showLogOut) {
            setShowRegister(false)
            setShowLogin(false)
            setshowAddFirm(false)
            setShowAddProduct(true)
            setShowAllProducts(false)
            setShowWelcome(false)
            setUserDetials(false)
        } else {
            alert("Please Login")
            setShowLogin(true)
        }

    }
    const showWelcomeHandiler = () => {
        if (showLogOut) {
            setShowRegister(false)
            setShowLogin(false)
            setshowAddFirm(false)
            setShowAddProduct(false)
            setShowWelcome(true)
            setShowAllProducts(false)
            setUserDetials(false)
        } else {
            alert("Please Login")
            setShowLogin(true)
        }
    }
    const showAllproudctsHandiler = () => {
        if (showLogOut) {
            setShowRegister(false)
            setShowLogin(false)
            setshowAddFirm(false)
            setShowAddProduct(false)
            setShowWelcome(false)
            setShowAllProducts(true)
            setUserDetials(false)

        } else {
            alert("Please Login")
            setShowLogin(true)
        }

    }
    const userDetialsHandler = () => {
        if (showLogOut) {
            setShowRegister(false)
            setShowLogin(false)
            setshowAddFirm(false)
            setShowAddProduct(false)
            setShowWelcome(false)
            setShowAllProducts(false)
            setUserDetials(true)

        } else {
            alert("Please Login")
            setShowLogin(true)
        }


    }


    useEffect(() => {
        const jwt = localStorage.getItem("jwt")
        if (jwt) {
            setShowLogOut(true)
            setShowWelcome(true)

        }
    }, [])

    useEffect(() => {
        const firmId = localStorage.getItem("firmId")
        const firmName = localStorage.getItem("firmName")
        if (firmId || firmName) {
            setFrimToggle(false)
            setShowWelcome(true)
        }
    }, [])

    const logOutHandler = () => {
        const value = confirm("Are you sure to logout")
        if (value) {
            localStorage.removeItem("jwt")
            localStorage.removeItem("firmId")
            localStorage.removeItem("firmName")
            localStorage.removeItem("vendorId")
            setShowLogOut(false)
            setFrimToggle(true)
            setShowWelcome(false)
        }
    }



    return (
        <section className="landingSection">
            <Navbar showWelcomeHandiler={showWelcomeHandiler} logOutHandler={logOutHandler} showLogOut={showLogOut} showLoginHandiler={showLoginHandiler} showRegisterHandiler={showRegisterHandiler} />
            <div className="collectionSection">
                <SideBar userDetialsHandler={userDetialsHandler} firmToggle={firmToggle} showAllproudctsHandiler={showAllproudctsHandiler} showAddFirmHandiler={showAddFirmHandiler} showAddProductHandiler={showAddProductHandiler} />
                {showAddFirm && showLogOut && <AddFirm />}
                {showLogin && <Login showWelcomeHandiler={showWelcomeHandiler} />}
                {showRegister && <Register showLoginHandiler={showLoginHandiler} />}
                {showAddProduct && showLogOut && <AddProduct />}
                {showWelcome && <Welcome />}
                {showAllProducts && showLogOut && <AllProducts />}
                {userDetails && showLogOut && <UserDetails />}

            </div>

        </section>
    )
}

export default LandingPage