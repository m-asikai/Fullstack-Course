import axios from 'axios';


const getAll = () => {
    const req = axios.get('http://localhost:3001/persons')
    return req.then(res => res.data);
}


const save = person => {
    const req = axios.post('http://localhost:3001/persons', person)
    return req;

}

const deletePerson = id => {
    const req = axios.delete(`http://localhost:3001/persons/${id}`);
    return req;
}

const update = person => {
    const req = axios.put(`http://localhost:3001/persons/${person.id}`, person);
    return req;
}


export default { getAll, save, deletePerson, update }