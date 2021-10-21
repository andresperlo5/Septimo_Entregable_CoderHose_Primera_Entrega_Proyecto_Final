import React from 'react'
import NavbarHome from '../Components/NavbarHome'
import '../css/home.css'
function HomePages() {
    return (
        <div className='overflowY'>
            <NavbarHome />
            <div>
                <img className='imgBodyHome' src="https://res.cloudinary.com/dbb9coys1/image/upload/v1634857017/market_kjo71q.jpg" alt="" />
            </div>

        </div>
    )
}

export default HomePages;