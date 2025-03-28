import blogFetch from "../axios/config"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

import './Admin.css'

const Admin = () => {
    const [posts, setPosts] = useState([])


    // função para fazer o resgate de dados da API
    const getPosts = async () => {
        // console.log("testando")
        try {
            const resposta = await blogFetch.get("/posts")

            const data = resposta.data

            setPosts(data)

            // console.log(resposta)

        } catch (error) {
            console.log(error)
        }

    }

    const deletePost = async (id) => {
        await blogFetch.delete(`/posts/${id}`)

        const filteredPosts = posts.filter((post) => post.id !== id)

        setPosts(filteredPosts)

    }

    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    useEffect(() => {
        getPosts()
    }, [])




    return <div className="admin">
        <h1>Gerenciar Posts</h1>
        {posts.length === 0 ? (<p>Carregando...</p>) : (
            posts.map((post) => (
                <div className="post" key={post.id}>
                    <h2>{post.title}</h2>
                    <div className="actions">
                        <Link className="btn edit-btn" to={`/posts/edit/${post.id}`}>Editar</Link>
                        <button type="button" className="btn delete-btn" onClick={() => deletePost(post.id)}>Excluir</button>
                    </div>
                </div>
            ))
        )}
    </div>


}

export default Admin