import React, { useEffect, useState } from 'react'
import './Playvideo.css'
import video1 from '../../assets/video.mp4'
import like from '../../assets/like.png'
import dislike from '../../assets/dislike.png'
import share from '../../assets/share.png'
import save from '../../assets/save.png'
import jack from '../../assets/jack.png'
import user_profile from '../../assets/user_profile.jpg'
import { API_KEY, value_converter } from '../../Data'
import moment from 'moment'
import { useParams } from 'react-router-dom'
import ProgressBar from '../ProgressBar/ProgressBar'

const Playvideo = () => {
    const { videoId } = useParams()
    const [apiData, setApiData] = useState(null);
    const [channelData, setChannelData] = useState(null);
    const [commentData, setCommentData] = useState([]);
    const [loading1, setLoading1] = useState(false);
    const [loading2, setLoading2] = useState(false);

    const fetchVideoData = async () => {
        //Fetching video data
        const video_details_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`
        setLoading1(true);
        try {
            const response = await fetch(video_details_url);
            if (!response.ok) {
                throw new Error("Error fetching data...");
            }
            const res = await response.json();
            setApiData(res.items[0]);
        }
        catch (error) {
            alert(`An error occurred: ${error.message}`);
        }
        finally {
            setLoading1(false);
        }
    }
    useEffect(() => {
        fetchVideoData();
    }, [videoId])
    const fetchOtherData = async () => {
        //Fetching Channel Data
        setLoading2(true);
        const channelData_url = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apiData.snippet.channelId}&key=${API_KEY}`
        //fetching comment Data
        const comment_url = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=50&videoId=${videoId}&key=${API_KEY}`
        try {
            const response = await fetch(channelData_url);
            const response2 = await fetch(comment_url);
            if (!response.ok || !response2.ok) {
                throw new Error('Error fetching data...');
            }
            const res = await response.json();
            setChannelData(res.items[0]);
            const res2 = await response2.json();
            setCommentData(res2.items);
        }
        catch (error) {
            console.log(`An error occurred: ${error.message}`);
        }
        finally {
            setLoading2(true);
        }
    }
    useEffect(() => {
        if (apiData?.snippet?.channelId) {
            fetchOtherData();
        }
    }, [apiData])
    return (
        <div className='play-video' >
            {/* <video src={video1} controls autoPlay muted></video> */}
            <iframe src={`https://www.youtube.com/embed/${videoId}?autoplay=1`} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
            <h3>{apiData ? apiData.snippet.title : "Title Here"}</h3>
            <div className="play-video-info">
                <p>{apiData ? value_converter(apiData.statistics.viewCount) : '16K'} views &bull; {apiData ? moment(apiData.snippet.publishedAt).fromNow() : ""}</p>
                <div>
                    <span><img src={like} alt="" /> {apiData ? value_converter(apiData.statistics.likeCount) : 155}</span>
                    <span><img src={dislike} alt="" /></span>
                    <span><img src={share} alt="" /> Share</span>
                    <span><img src={save} alt="" /> Save</span>
                </div>
            </div>
            <hr />
            <div className="publisher">
                <img src={channelData ? channelData.snippet.thumbnails.default.url : ""} alt="" />
                <div>
                    <p>{apiData ? apiData.snippet.channelTitle : ""}</p>
                    <span>{channelData ? value_converter(channelData.statistics.subscriberCount) : "1M"} Subscribers</span>
                </div>
                <button>Subscribe</button>
            </div>
            <div className="vid-description">
                <p>{apiData ? apiData.snippet.description.slice(0, 250) : "Description Here"}</p>
                <hr />
                <h4>{apiData ? value_converter(apiData.statistics.commentCount) : 142} Comments</h4>

                {commentData.map((item, index) => {
                    return (

                        <div key={index} className="comment">
                            <img src={item.snippet.topLevelComment.snippet.authorProfileImageUrl} alt="" />
                            <div>
                                <h3>{item.snippet.topLevelComment.snippet.authorDisplayName}<span> {moment(item.snippet.topLevelComment.snippet.updatedAt).fromNow()}</span></h3>
                                <p>{item.snippet.topLevelComment.snippet.textOriginal}</p>
                                <div className="comment-action">
                                    <img src={like} alt="" />
                                    <span>{value_converter(item.snippet.topLevelComment.snippet.likeCount)}</span>
                                    <img src={dislike} alt="" />
                                </div>
                            </div>
                        </div>
                    )
                })}

            </div>

        </div>
    )
}

export default Playvideo
