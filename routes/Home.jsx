// import axios from "axios"
import blogFetch from "../axios/config"

import { useState, useEffect } from "react"

import { Link } from 'react-router-dom'

import "./Home.css"

const Home = () => {

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
  // para executar ela vou utilizar o useEffect

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {

    getPosts()

  }, [])





  return <div className="home">
    <h1>Últimos posts</h1>
    {posts.length === 0 ? <p>Carregando...</p> : (
      posts.map((post) => (
        <div className="post" key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
          <Link to={`/post/${post.id}`} className="btn">Ler mais</Link>
        </div>
      ))
    )}
  </div>



}

export default Home