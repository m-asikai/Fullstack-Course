import { useMutation } from "@apollo/client";
import { useState } from "react";
import { ADD_BOOK, ALL_BOOKS } from "../Utils/queries";

const BookForm = () => {
  const [genres, setGenres] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [published, setPublished] = useState(null);
  const [genre, setGenre] = useState("");

  const [createBook] = useMutation(ADD_BOOK, {
    refetchQueries: [{ query: ALL_BOOKS }],
  });

  const addBook = (e) => {
    e.preventDefault();
    createBook({ variables: { title, author, published, genres } });
    setGenres([]);
    // setTitle("");
    // setAuthor("");
    // setPublished("");
    // setGenre("");
  };

  return (
    <form onSubmit={addBook}>
      <div>
        Title
        <input onChange={({ target }) => setTitle(target.value)}></input>
      </div>
      <div>
        Author
        <input onChange={({ target }) => setAuthor(target.value)}></input>
      </div>
      <div>
        Published
        <input
          onChange={({ target }) => setPublished(Number(target.value))}
        ></input>
      </div>
      <div>
        Genres
        <input onChange={({ target }) => setGenre(target.value)}></input>
        <button type="button" onClick={() => setGenres(genres.concat(genre))}>
          Add genre
        </button>
      </div>
      <p>Genres: </p>
      {genres.join(", ")}
      <button type="submit">Add book</button>
    </form>
  );
};

export default BookForm;
