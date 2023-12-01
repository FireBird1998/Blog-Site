import { useParams } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import Edit from '../components/Edit';




const Editpost = () => {
    const [title,setTitle] = useState('');
    const [summary,setSummary] = useState('');
    const [content,setContent] = useState('');
    const [file,setFile] = useState('');
    const [redirect, setRedirect] = useState(false);
    const [cover, setCover] = useState('');
    const {id} = useParams();

    useEffect(() => {
        fetch('http://localhost:4000/post/'+id).then(res => res.json()).then(data => {

        setTitle(data.title);
        setSummary(data.summary);
        setContent(data.content);
        })
    }, []);

    async function updatePost(e){
        e.preventDefault();
        const data = new FormData();
        data.set('title', title);
        data.set('summary', summary);
        data.set('content', content);
        data.set('id', id);
        if(file) {
            data.set('file', file);
        }
        
        
        const responce = await fetch('http://localhost:4000/post', {
            method: 'PUT',
            body: data,
            credentials: 'include',
        });
        if(responce.ok){
            setRedirect(true);
        }
    }

    if(redirect){
        return <Navigate to={`/post/${id}`} />;  //redirecting to the home page 
        //after the post is created 
        //so that the user can see the post 
        //in the home page 
    }

  return (
    <form className="createPost" onSubmit={updatePost}>
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
        <Edit onChange={setContent} value={content}/>
        <button>Edit</button>
        

    </form>
  )
}

export default Editpost