import blogFetch from '../axios/config'

// Necessário para gerenciar valores que se encontra nos inputs
import { useState } from 'react'

// vamos simular um redrect quando usuário adiciona um post ele redireciona para home (responsavel pelo gerenciamento de rotas)
// Com ele, você pode redirecionar o usuário para outra página ou caminho sem precisar de um componente  ou de uma interação direta do usuário.
// O  retorna uma função que você pode chamar para realizar a navegação, passando o destino como argumento.

import { useNavigate } from 'react-router-dom'

import './NewPost.css'



const NewPost = () => {
    const navigate = useNavigate()

    const [title, setTitle] = useState()

    const [body, setBody] = useState()

    // agora vou criar a função para quando esse formulário for enviado
    const createPost = async (e) => {
        e.preventDefault()

        // console.log(title, body)
        // criar um novo objeto "post"
        const post = { title, body, userId: 1 }

        await blogFetch.post("/posts", {
            body: post,
        })

        navigate("/")
    }


    return <div className='new-post'>
        <h2>Inserir novo Post:</h2>
        <form onSubmit={(e) => createPost(e)}>
            <div className="form-control">
                <label htmlFor="title">Título:</label>
                <input type="text" name='title' id='title' placeholder='Digite o título' onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="form-control">
                <label htmlFor="body">Conteúdo:</label>
                <textarea name="body" id="body" placeholder='Digite o conteúdo' onChange={(e) => setBody(e.target.value)} />
            </div>
            <input type="submit" value="Criar Post" className='btn' />
        </form>
    </div>


}

export default NewPost
