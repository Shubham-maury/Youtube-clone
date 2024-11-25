import React, { useState } from 'react'
import './Navbar.css'
import menu_icon from '../../assets/menu.png'
import logo from '../../assets/logo2.png'
import search_icon from '../../assets/search.png'
import upload_icon from '../../assets/upload.png'
import more_icon from '../../assets/more.png'
import notification_icon from '../../assets/notification.png'
import profile_icon from '../../assets/jack.png'
import { Link } from 'react-router-dom'
import { API_KEY } from '../../Data'
import ProgressBar from '../ProgressBar/ProgressBar'

const Navbar = ({sidebar,setSidebar,searchData,setSearchData,setVideoList}) => {
    const [loading,setLoading] = useState(false);
    const SearchVideo = async ()=>{
        setLoading(true);
        const search_url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${searchData}&type=video&key=${API_KEY}`
        try{
            const response = await fetch(search_url);
            if(!response.ok){
                throw new Error("Error fetching data...");
            }
            const data = await response.json();
            const videoIds = data.items.map((item)=>item.id.videoId).join(',');
            const getcategoryid_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoIds}&key=${API_KEY}`
            const response2 = await fetch(getcategoryid_url);
            if(!response2.ok){
                throw new Error("Error fetching data2...");
            }
            const res = await response2.json()
            setVideoList(res.items);
        }
        catch(error){
            alert(`An error occurred: ${error.message}`);
        }
        finally{
            setLoading(false);
        }
    }
    const SearchVideoifEnter = (event)=>{
        if(event.key==='Enter'){
            SearchVideo();
        }
    }
    return (
        <>
        {/* !sidebar = prev=>prev===false?true:false (Used in onClick property on menu-icon )*/}
            <nav className='flex-div'>
                <div className="nav-left flex-div">
                    <img className='menu-icon' onClick={()=>setSidebar(!sidebar)} src={menu_icon} alt="" />
                    <Link to={'/'}> <img className='logo' src={logo} alt="" /></Link>
                </div>
                <div className="nav-middle flex-div">
                    <div className="search-box flex-div">
                        <input type="text" value={searchData} onKeyDown={SearchVideoifEnter} onChange={(event)=>setSearchData(event.target.value)} placeholder='Search' />
                        <img src={search_icon} onClick={SearchVideo} alt="" />
                    </div>
                </div>
                <div className="nav-right flex-div">
                    <img src={upload_icon} alt="" />
                    <img src={more_icon} alt="" />
                    <img src={notification_icon} alt="" />
                    <img src={profile_icon} className="user-icon" alt="" />
                </div>
            </nav>
            {loading && (<ProgressBar/>)}
        </>
    )
}

export default Navbar
