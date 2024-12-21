const Filter = ({ handleFilter }) => {
    return (
    <div>
        Filter: <input onChange={handleFilter}/>
    </div>
    )
}

export default Filter;