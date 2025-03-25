import React, { useState, useEffect } from "react";
const url = "https://nodejs-backend-ashok.onrender.com"


const UserDetails = () => {
    const [vendorDetails, setVendorDetials] = useState([])
    const vendorId = localStorage.getItem("vendorId")
    const getVendorDetails = async () => {
        const vendorResponse = await fetch(`${url}/vendor/single-vendor/${vendorId}`)
        const value = await vendorResponse.json()
        setVendorDetials(value.vendor)


    }

    useEffect(() => {
        getVendorDetails()
    }, [])


    return (
        <div className="firmSection">
            <div className="tableForm" >
                <p>username : {vendorDetails.username}</p>
                <p>Email : {vendorDetails.email} </p>
            </div>
        </div>
    );
};

export default UserDetails;
