import axios from 'axios';

const BASE_URL = '/api/persons/';
const RENDER_URL = 'https://fullstack-course-ty1h.onrender.com';


const getAll = () => {
    const req = axios.get(RENDER_URL + BASE_URL);
    return req.then(res => res.data);
}


const save = person => {
    const req = axios.post(RENDER_URL + BASE_URL, person)
    return req;

}

const deletePerson = id => {
    const req = axios.delete(RENDER_URL + BASE_URL`${id}`);
    return req;
}

const update = person => {
    const req = axios.put(RENDER_URL + BASE_URL`${person.id}`, person);
    return req;
}


export default { getAll, save, deletePerson, update }