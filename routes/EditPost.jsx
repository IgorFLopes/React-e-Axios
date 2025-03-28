import blogFetch from '../axios/config'

// Necessário para gerenciar valores que se encontra nos inputs
import { useState, useEffect } from 'react'

// vamos simular um redrect quando usuário adiciona um post ele redireciona para home (responsavel pelo gerenciamento de rotas)
// Com ele, você pode redirecionar o usuário para outra página ou caminho sem precisar de um componente  ou de uma interação direta do usuário.
// O  retorna uma função que você pode chamar para realizar a navegação, passando o destino como argumento.

import { useNavigate, useParams } from 'react-router-dom'


const EditPost = () => {

    const navigate = useNavigate()

    const [title, setTitle] = useState()
    const [body, setBody] = useState()


    const { id } = useParams()

    const getPost = async () => {
        try {
            console.log(id)
            const response = await blogFetch.get(`/posts/${id}`)
            const data = response.data
            setTitle(data.title)
            setBody(data.body)
        } catch (error) {
            console.log(error)
        }
    }

    const editPost = async (e) => {
        e.preventDefault()

        const post = { title, body, userId: 1 }
        await blogFetch.put(`/posts/${id}`, {
            body: post,
        })
    }

    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    useEffect(() => {
        getPost()
    }, [])


    return <div className='new-post'>
        <h2>Editando: {title}</h2>
        <form onSubmit={(e) => editPost(e)}>
            <div className="form-control">
                <label htmlFor="title">Título:</label>
                <input type="text" name='title' id='title' placeholder='Digite o título' onChange={(e) => setTitle(e.target.value)} value={title || ""} />
            </div>
            <div className="form-control">
                <label htmlFor="body">Conteúdo:</label>
                <textarea name="body" id="body" placeholder='Digite o conteúdo' onChange={(e) => setBody(e.target.value)} value={body || ""} />
            </div>
            <input type="submit" value="Editar Post" className='btn' />
        </form>
    </div>


}

export default EditPost