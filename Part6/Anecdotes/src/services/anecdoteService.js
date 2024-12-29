import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const get = async () => {
    const res = await axios.get(baseUrl)
    return res.data
}

const post = async (newAnecdote) => {
    const res = await axios.post(baseUrl, newAnecdote)
    return res.data
}

const put = async (anecdote) => {
    const res = await axios.put(`${baseUrl}/${anecdote.id}`, anecdote)
    return res.data
}


export default { get, post, put }