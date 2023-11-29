import { Navigate } from 'react-router-dom';
import { useState } from "react";
import ReactQuill from "react-quill";

import "react-quill/dist/quill.snow.css";

const modules = {
    toolbar: [
        [{ header: [1, 2, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{'list':'ordered'},{'list':'bullet'},{'indent':'-1'},{'indent':'+1'}],
        ['link', 'image'],
        ['clean']
    ]
}
const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
]

const CreatePost = () => {
    const [title,setTitle] = useState('');
    const [summary,setSummary] = useState('');
    const [content,setContent] = useState('');
    const [file,setFile] = useState('');
    const [redirect, setRedirect] = useState(false);
    async function createNewPost(e){
        e.preventDefault();
        //makinf data set for the from to send 
        const data = new FormData();
        data.set('title', title);
        data.set('summary', summary);
        data.set('content', content);
        data.set('file', file);

        //sending the data to the server 
        const responce = await fetch('http://localhost:4000/post',{
            method: 'POST',
            body: data, 
            credentials: 'include',
        });

        if(responce.ok){
            setRedirect(true);
        }
    }
    
    if(redirect){
        return <Navigate to={'/'} />;  //redirecting to the home page 
        //after the post is created 
        //so that the user can see the post 
        //in the home page 
    }

  return (
    <form className="createPost" onSubmit={createNewPost}>
        <input 
            type="text" 
            placeholder={'Title'} 
            value={title} 
            onChange={e => setTitle(e.target.value)}
        />
        <input 
            type="text" 
            placeholder={'Summary'} 
            value={summary} 
            onChange={e => setSummary(e.target.value)}
        />
        <input
            type="file"
            onChange={e => setFile(e.target.files[0])}
        />
        <ReactQuill 
            theme="snow" 
            value={content} 
            onChange={e => setContent(e)}
            modules={modules} 
            formats={formats} />
        <button>Publish</button>
        

    </form>
  )
}

export default CreatePost