import React, { useEffect, useState } from 'react'
import './Feed.css'
import thumbnail1 from '../../assets/thumbnail1.png'
import thumbnail2 from '../../assets/thumbnail2.png'
import thumbnail3 from '../../assets/thumbnail3.png'
import thumbnail4 from '../../assets/thumbnail4.png'
import thumbnail5 from '../../assets/thumbnail5.png'
import thumbnail6 from '../../assets/thumbnail6.png'
import thumbnail7 from '../../assets/thumbnail7.png'
import thumbnail8 from '../../assets/thumbnail8.png'
import { Link } from 'react-router-dom'
import { API_KEY, value_converter } from '../../Data'
import moment from 'moment'

const Feed = ({category,videoList }) => {
    const [data, setData] = useState([]); 

    const fetchData = async () => {
        const videoList_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=US&videoCategoryId=${category}&key=${API_KEY}` 
        
        const response = await fetch(videoList_url);
        const res = await response.json();
        setData(res.items);

    }
    useEffect(() => {
        fetchData(); 
    }, [category])

    var videos;
    if(videoList.length!=0){   
        videos =  videoList.map((value, index) => {    
            return ( 
                <Link key={index} to={`video/${value.snippet.categoryId}/${value.id}`} className='card'>
                    <img src={value.snippet.thumbnails.medium.url} alt="" />
                    <h2>{value.snippet.title}</h2>
                    <h3>{value.snippet.channelTitle}</h3>
                    <p>{value_converter(value.statistics.viewCount)} views &bull; {moment(value.snippet.publishedAt).fromNow()}</p>
                </Link>
            )
        });
    }
    else{
        videos =  data.map((value, index) => {
            return ( 
                <Link key={index} to={`video/${value.snippet.categoryId}/${value.id}`} className='card'>
                    <img src={value.snippet.thumbnails.medium.url} alt="" />
                    <h2>{value.snippet.title}</h2>
                    <h3>{value.snippet.channelTitle}</h3>
                    <p>{value_converter(value.statistics.viewCount)} views &bull; {moment(value.snippet.publishedAt).fromNow()}</p>
                </Link>
            )
        });   
    }
    
  
    return (
        <div className="feed">
            {videos}
        </div>
    )
}

export default Feed
