import React, { useState } from 'react'
import Navbar from './Components/Navbar/Navbar'
import {Route, Routes} from 'react-router-dom'
import Home from './Pages/Home/Home' 
import Videos from './Pages/Video/Video'

const App = () => {
    const [sidebar,setSidebar] = useState(true);
    const [searchData,setSearchData] = useState(""); 
    const [videoList,setVideoList] = useState([]); 
    return ( 
            <div>
                <Navbar sidebar={sidebar} setSidebar={setSidebar} searchData={searchData} setSearchData={setSearchData} setVideoList={setVideoList}/>
                <Routes>
                    <Route path='/'element={<Home sidebar = {sidebar} videoList={videoList}/>}/>
                    <Route path='/video/:categoryId/:videoId' element={<Videos/>}/>
                </Routes>
            </div> 
    )
}

export default App
