import React, { useState } from 'react'
import { url } from '../../api'


const AddProduct = () => {
    const [productName, setProductName] = useState("")
    const [price, setPrice] = useState("")
    const [bestSeller, setBestSeller] = useState(false)
    const [Description, setDescription] = useState("")
    const [file, setFile] = useState(null)
    const [category, setCategory] = useState([])

    const updateimages = (e) => {
        const val = e.target.files[0]
        setFile(val)

    }
    const bestSetterUpdate = (e) => {
        const value = e.target.value === "true"
        setBestSeller(value)
    }
    const updateCategory = (e) => {
        const value = e.target.value
        if (category.includes(value)) {
            setCategory(category.filter(item => item !== value))
        } else {
            setCategory([...category, value])
        }
    }




    const productSubmitHandler = async (e) => {
        e.preventDefault()
        try {
            const firmId = localStorage.getItem("firmId")
            const jwt = localStorage.getItem("jwt")
            if (!firmId || !jwt) {
                console.error("user not authenticated")
            }

            const productForm = new FormData()
            productForm.append("productName", productName)
            productForm.append("price", price)
            productForm.append("bestSeller", bestSeller)
            productForm.append("description", Description)
            productForm.append("image", file)
            category.forEach(item => {
                productForm.append("category", item)
            })


            const options = {
                method: "POST",
                body: productForm
            }
            const response = await fetch(`${url}/product/add-product/${firmId}`, options)
            const data = await response.json()
            if (response.ok) {
                alert("product added successfully")
                console.log("product added successfully")
                setProductName("")
                setPrice("")
                setCategory([])
                setBestSeller("")
                setFile(null)
                setDescription("")
            }

        } catch (err) {
            console.log(err)
        }

    }



    return (
        <div className="firmSection">
            <div className="firmSection">
                <form className="tableForm" onSubmit={productSubmitHandler}>
                    <h2>Add Product</h2>
                    <label htmlFor="name">Product Name</label>
                    <input type="text" id="name" className="FirmInput" value={productName} onChange={e => setProductName(e.target.value)} />
                    <label htmlFor="price">Price</label>
                    <input type="text" id="price" className="FirmInput" value={price} onChange={e => setPrice(e.target.value)} />
                    <label htmlFor="">Category</label>
                    <div className="categoryContainer">
                        <div className="checkBoxContainer">
                            <label htmlFor="veg">Veg</label>
                            <input type="checkbox" className="FirmInput" id="veg" value="veg" checked={category.includes("veg")} onChange={updateCategory} />
                        </div>
                        <div className="checkBoxContainer">
                            <label htmlFor="nonveg" >Non Veg</label>
                            <input type="checkbox" className="FirmInput" id="nonveg" value="non-veg" checked={category.includes("non-veg")} onChange={updateCategory} />
                        </div>
                    </div>
                    <label>Best Seller</label>
                    <div className="categoryContainer">
                        <div className="checkBoxContainer">
                            <label htmlFor="yes">Yes</label>
                            <input type="radio" className="FirmInput" id="yes" name="bestseller" value="true" checked={bestSeller === true} onChange={bestSetterUpdate} />
                        </div>
                        <div className="checkBoxContainer">
                            <label htmlFor="no" >No</label>
                            <input type="radio" className="FirmInput" id="no" name="bestseller" value="false" checked={bestSeller === false} onChange={bestSetterUpdate} />
                        </div>
                    </div>
                    <label>Description</label>
                    <input type="text" className="FirmInput" value={Description} onChange={e => setDescription(e.target.value)} />
                    <label>Firm Image</label>
                    <input type="file" className="FirmInput" onChange={updateimages} />
                    <br />
                    <div>
                        <button type="submit" className="submitButton">Submit</button>
                    </div>
                </form>
            </div>


        </div>
    )
}

export default AddProduct