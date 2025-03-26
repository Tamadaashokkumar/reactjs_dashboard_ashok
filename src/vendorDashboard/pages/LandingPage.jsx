import React, { useState, useEffect } from 'react'
import SideBar from '../components/SideBar'
import Login from '../components/forms/Login'
import Register from '../components/forms/Register'
import AddFirm from '../components/forms/AddFirm'
import AddProduct from '../components/forms/AddProduct'
import Welcome from '../components/Welcome'
import AllProducts from '../components/AllProducts'
import Navbar from '../components/NavBar'



const LandingPage = () => {
    const [showLogin, setShowLogin] = useState(false)
    const [showRegister, setShowRegister] = useState(false)
    const [showAddFirm, setshowAddFirm] = useState(false)
    const [showAddProduct, setShowAddProduct] = useState(false)
    const [showWelcome, setShowWelcome] = useState(false)
    const [showAllProducts, setShowAllProducts] = useState(false)
    const [showLogOut, setShowLogOut] = useState(false)
    const [firmToggle, setFrimToggle] = useState(true)

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
            setShowLogOut(false)
            setFrimToggle(true)
            setShowWelcome(false)
        }
    }


    const showLoginHandiler = () => {
        setShowLogin(true)
        setShowRegister(false)
        setshowAddFirm(false)
        setShowAddProduct(false)
        setShowAllProducts(false)
        setShowWelcome(false)

    }
    const showRegisterHandiler = () => {
        setShowRegister(true)
        setShowLogin(false)
        setshowAddFirm(false)
        setShowAddProduct(false)
        setShowAllProducts(false)
        setShowWelcome(false)

    }
    const showAddFirmHandiler = () => {
        if (showLogOut) {
            setShowRegister(false)
            setShowLogin(false)
            setshowAddFirm(true)
            setShowAddProduct(false)
            setShowAllProducts(false)
            setShowWelcome(false)
            setShowWelcome(false)


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
            setShowWelcome(false)

        } else {
            alert("Please Login")
            setShowLogin(true)
        }

    }
    const showWelcomeHandiler = () => {
        setShowRegister(false)
        setShowLogin(false)
        setshowAddFirm(false)
        setShowAddProduct(false)
        setShowWelcome(true)
        setShowAllProducts(false)

    }
    const showAllproudctsHandiler = () => {
        if (showLogOut) {
            setShowRegister(false)
            setShowLogin(false)
            setshowAddFirm(false)
            setShowAddProduct(false)
            setShowWelcome(false)
            setShowAllProducts(true)
            setShowWelcome(false)


        } else {
            alert("Please Login")
            setShowLogin(true)
        }
    }
    return (
        <section className="landingSection">
            <Navbar showWelcomeHandiler={showWelcomeHandiler} logOutHandler={logOutHandler} showLogOut={showLogOut} showLoginHandiler={showLoginHandiler} showRegisterHandiler={showRegisterHandiler} />
            <div className="collectionSection">
                <SideBar firmToggle={firmToggle} showAllproudctsHandiler={showAllproudctsHandiler} showAddFirmHandiler={showAddFirmHandiler} showAddProductHandiler={showAddProductHandiler} />
                {showAddFirm && showLogOut && <AddFirm />}
                {showLogin && <Login showWelcomeHandiler={showWelcomeHandiler} />}
                {showRegister && <Register showLoginHandiler={showLoginHandiler} />}
                {showAddProduct && showLogOut && <AddProduct />}
                {showWelcome && showLogOut && <Welcome />}
                {showAllProducts && showLogOut && <AllProducts />}
            </div>

        </section>
    )


}












export default LandingPage