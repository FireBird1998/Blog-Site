import { Link, Navigate, useParams } from 'react-router-dom';
import { useContext, useState } from 'react'
import { useEffect } from "react"
import {formatISO9075} from 'date-fns';
import { UserContext } from '../userContext';




const PostPage = () => {
    const [postInfo, setPostInfo] = useState(null);
    const {id} = useParams();
    const {userInfo} = useContext(UserContext);
    const [redirect, setRedirect] = useState(false);


    useEffect(() => {
        fetch(`http://localhost:4000/post/${id}`)
        .then(res => res.json())
        .then(post => {
            console.log(post); 
            
            setPostInfo(post); 
        })
    }, []);

    if(!postInfo) {
        return '';
    }

    const handleDelete = async (event) => {
        event.preventDefault();
        const response = await fetch(`http://localhost:4000/post/${id}`, {
            method: 'DELETE',
            credentials: 'include', // to send the cookies with the request
        });
        const data = await response.json();
        if (response.ok) {
            // Redirect to another page or update the state to remove the deleted post
            setRedirect(true);
    
        } else {
            // Handle the error
            console.error(data.error);
        }
    };

    if(redirect){
        return <Navigate to={`/`} />;  //redirecting to the home page      
    }

    
    return (
        <div className='post-page'>
            <div className='image'>
                <img src={`http://localhost:4000/${postInfo.cover}`} alt="" />
            </div>
            <h1>{postInfo.title}</h1>
            <time>{formatISO9075(new Date(postInfo.createdAt))}</time>
            <p>{postInfo.author.username}</p>
            {userInfo.id === postInfo.author._id && (
                <div className='post-actions'>
                    <Link to={`/edit/${postInfo._id}`}>Edit</Link>
                    <Link to="#" onClick={handleDelete}>Delete</Link>
                </div>
            )}
            <div dangerouslySetInnerHTML={{__html: postInfo.content}} />
        </div>
    )
}

export default PostPage