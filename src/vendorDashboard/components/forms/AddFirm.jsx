import React, { useState } from 'react'
import { url } from '../../api'
const AddFirm = () => {
    const [firmName, setFirmName] = useState("")
    const [area, setArea] = useState("")
    const [category, setCategory] = useState([])
    const [region, setRegion] = useState([])
    const [offer, setOffer] = useState("")
    const [file, setFile] = useState(null)


    const updateImageHandler = (e) => {
        setFile(e.target.files[0])
    }

    const updateCategory = e => {
        const value = e.target.value
        if (category.includes(value)) {
            setCategory(category.filter(item => item !== value))
        } else {
            setCategory([...category, value])
        }
    }
    const updateRegion = (e) => {
        const value = e.target.value
        if (region.includes(value)) {
            setRegion(region.filter(item => item !== value))
        } else {
            setRegion([...region, value])
        }
    }

    const submitFirmData = async (e) => {
        e.preventDefault()
        const jwt = localStorage.getItem("jwt")
        if (!jwt) {
            console.log("user not authenticated")
        }
        try {
            const formData = new FormData();
            formData.append('firmName', firmName);
            formData.append('area', area);
            formData.append('offer', offer);
            formData.append('image', file)

            category.forEach((value) => {
                formData.append('category', value)
            });
            region.forEach((value) => {
                formData.append('region', value)
            })

            const options = {
                method: 'POST',
                headers: {
                    "token": `${jwt}`
                },
                body: formData
            }

            const response = await fetch(`${url}/firm/add-firm`, options)
            const data = await response.json()
            if (response.ok) {
                console.log("Add Firm Successfully")
                alert("Add Firm Successfully")
                setFirmName("")
                setArea("")
                setCategory([])
                setFile(null)
                setRegion(null)
                setOffer("")
            } else if (data.message === "vendor can have only one firm") {
                alert("Firm Exists 🥗. Only 1 firm can be added  ")
            } else {
                alert('Failed to add Firm')
            }

            const firmId = data.firmId
            const restaurantName = data.vendorFirmName
            localStorage.setItem("firmId", firmId)
            localStorage.setItem("firmName", restaurantName)
            window.location.reload()
        } catch (err) {
            console.error(err)
            alert("firm not added")
        }
    }



    return (
        <div className="firmSection">
            <form className="tableForm" onSubmit={submitFirmData}>
                <h2>Add Firm</h2>
                <label>Firm Name</label>
                <input type="text" className="FirmInput" value={firmName} name="firmName" onChange={e => setFirmName(e.target.value)} />
                <label>Area</label>
                <input type="text" className="FirmInput" value={area} name="area" onChange={e => setArea(e.target.value)} />
                <label htmlFor="">Category</label>
                <div className="categoryContainer">
                    <div className="checkBoxContainer">
                        <label htmlFor="veg">Veg</label>
                        <input type="checkbox" className="FirmInput" id="veg" value="veg" checked={category.includes("veg")} onChange={updateCategory} />
                    </div>
                    <div className="checkBoxContainer">
                        <label htmlFor="non-veg">Non Veg</label>
                        <input type="checkbox" className="FirmInput" id="non-veg" value="non-veg" checked={category.includes("non-veg")} onChange={updateCategory} />
                    </div>
                </div>
                <label>Offer</label>
                <input type="text" className="FirmInput" value={offer} name="offer" onChange={e => setOffer(e.target.value)} />
                <label>Region</label>
                <div className="categoryContainer">
                    <div className="checkBoxContainer">
                        <label htmlFor="veg">South-Indian</label>
                        <input type="checkbox" className="FirmInput" value="south-indian" id="veg" checked={region.includes("south-indian")} onChange={updateRegion} />
                    </div>
                    <div className="checkBoxContainer">
                        <label htmlFor="north-indian">North-Indian</label>
                        <input type="checkbox" className="FirmInput" id="north-indian" value='north-indian' checked={region.includes("north-indian")} onChange={updateRegion} />
                    </div>
                    <div className="checkBoxContainer">
                        <label htmlFor="south-indian">Chinese</label>
                        <input type="checkbox" className="FirmInput" id="south-indian" value="chinese" checked={region.includes("chinese")} onChange={updateRegion} />
                    </div>
                    <div className="checkBoxContainer">
                        <label htmlFor="bakery">Bakery</label>
                        <input type="checkbox" className="FirmInput" id="bakery" value="bakery" checked={region.includes("bakery")} onChange={updateRegion} />
                    </div>
                </div>

                <label>Firm Image</label>
                <input type="file" className="FirmInput" onChange={updateImageHandler} />
                <br />
                <div >
                    <button type="submit" className="submitButton">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default AddFirm