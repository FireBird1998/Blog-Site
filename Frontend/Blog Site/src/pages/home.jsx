import { useEffect, useState } from "react"
import Post from "../components/post"

const Home = () => {
  const[posts, setPost] = useState([]);


  useEffect(() => {
    fetch('http://localhost:4000/post')
    .then(res => res.json())
    .then(posts => {
      console.log(posts);
      setPost(posts);
    });
  }, []);

  return (
    <>
      {posts.length > 0 && posts.map(post => <Post {...post} />)}
    </>
  )
}

export default Home