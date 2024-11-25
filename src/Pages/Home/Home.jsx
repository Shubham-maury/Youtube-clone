import React, { useState } from 'react'
import './Home.css'
import Sidebar from '../../Components/SideBar/Sidebar'
import Feed from '../../Components/feed/feed'


const Home = ({sidebar,videoList}) => {
    const [category,setCategory] = useState(0);
    return (
        <>
        <Sidebar sidebar={sidebar} category={category} setCategory={setCategory}/>
        <div className={`container ${sidebar?"":'large-container'}`}>
            <Feed category={category} videoList={videoList}/>
        </div>
        </>
    )
}

export default Home
