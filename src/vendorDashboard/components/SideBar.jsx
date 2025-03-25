import React from 'react'

const SideBar = ({ showAddFirmHandiler, userDetialsHandler, firmToggle, showAddProductHandiler, showAllproudctsHandiler }) => {
    return (
        <div className="sideBarSection">
            <ul>
                {firmToggle ? (<li onClick={showAddFirmHandiler}>Add Firm</li>) : null}
                <li onClick={showAddProductHandiler}>Add Products</li>
                <li onClick={showAllproudctsHandiler}>All Products</li>
                <li onClick={userDetialsHandler}>User Details</li>
            </ul>
        </div>
    )
}
// 
export default SideBar