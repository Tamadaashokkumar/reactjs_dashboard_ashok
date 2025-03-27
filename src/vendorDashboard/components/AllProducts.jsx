import React, { useState, useEffect } from 'react'
import { url } from '../api'

const AllProducts = () => {
    const [products, setProducts] = useState([])
    const firmId = localStorage.getItem("firmId")
    const getProductsHandler = async () => {
        try {
            const response = await fetch(`${url}/product/${firmId}/products`)
            const data = await response.json()
            setProducts(data.products)
            console.log(data.products)

        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        getProductsHandler()
    }, [])

    const delteProductHandler = async (productId) => {
        try {
            const value = confirm("ARE YOU SURE,YOU WANT TO DELETE")
            if (value) {
                const response = await fetch(`${url}/product/${productId}`, {
                    method: 'DELETE'
                })
                const data = await response.json()
                if (response.ok) {
                    setProducts(products.filter(item => item._id !== productId))

                    alert("Product Deleted Successfully")
                    console.log("proudct deleted successfully")

                }
            }


        } catch (err) {
            console.log("product deleted failed")
            alert("proudct deleted failed")
        }
    }


    return (
        <div className="productsContainer">
            <div className="tableCard">
                {!products ?
                    (< p > products not added</p >) :
                    (<table className="product-table">
                        <thead>
                            <tr>
                                <th>
                                    ProductName
                                </th>
                                <th>
                                    Price
                                </th>
                                <th>
                                    Image
                                </th>
                                <th>
                                    Delete
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(item => {
                                return (
                                    <>
                                        <tr key={item._id}>
                                            <td>{item.productName}</td>
                                            <td>{item.price}</td>
                                            <td>
                                                <img src={`${url}/uploads/${item.image}`} className="productImage" alt={item.productName} />
                                            </td>
                                            <td>
                                                <button className="submitButton" onClick={() => delteProductHandler(item._id)}>Delete</button>
                                            </td>
                                        </tr>
                                    </>)
                            })}
                        </tbody>
                    </table>)}
            </div>
        </div >

    )
}

export default AllProducts