import blogFetch from "../axios/config"

import { useState, useEffect } from "react"

import { useParams } from "react-router-dom"

import "./Post.css"



const Post = () => {

    const { id } = useParams()

    const [post, setPost] = useState({})

    const getPost = async () => {
        try {
            console.log(id)
            const response = await blogFetch.get(`/posts/${id}`)
            const data = response.data
            setPost(data)
        } catch (error) {
            console.log(error)
        }
    }

    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    useEffect(() => {
        getPost()
    }, [])


    return <div className="post-container">
        {!post.title ? (
            <p>Carregando...</p>
        ) : (<div className="post">
            <h2>{post.title}</h2>
            <p>{post.body}</p>
        </div>)}
    </div>


}

export default Post