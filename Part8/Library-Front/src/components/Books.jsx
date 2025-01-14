import { useQuery } from "@apollo/client";
import { ALL_BOOKS } from "../Utils/queries";
import { useState, useEffect } from "react";

const Books = (props) => {
  const [filter, setFilter] = useState("");
  const [books, setBooks] = useState([]);
  const { loading, data, refetch } = useQuery(ALL_BOOKS, {
    variables: { genre: filter },
  });

  useEffect(() => {
    refetch({ genre: filter });
  }, [filter]);

  useEffect(() => {
    if (data) {
      setBooks(data.allBooks);
    }
  }, [data]);

  if (!props.show) {
    return null;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  const createFilters = (books) => {
    const genres = [];
    books.forEach((book) => {
      if (book.genres) {
        book.genres.forEach((genre) => {
          if (!genres.includes(genre)) {
            genres.push(genre);
          }
        });
      }
    });
    return genres;
  };

  const setFavourite = () => {
    localStorage.setItem("fav-genre", filter);
  };

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <select onChange={({ target }) => setFilter(target.value)}>
        <option value={""}>Select a genre</option>
        {createFilters(props.books).map((genre) => (
          <option value={genre} key={genre}>
            {genre}
          </option>
        ))}
      </select>
      <button onClick={setFavourite}>Set as favourite genre</button>
      <button onClick={() => setFilter(null)}>Reset filter</button>
    </div>
  );
};

export default Books;
