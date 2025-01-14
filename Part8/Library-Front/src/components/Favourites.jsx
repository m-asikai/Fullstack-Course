import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { ALL_BOOKS } from "../Utils/queries";

const Favourites = (props) => {
  const favouriteGenre = localStorage.getItem("fav-genre");
  const [books, setBooks] = useState([]);
  const { data, loading } = useQuery(ALL_BOOKS, {
    variables: { genre: favouriteGenre },
  });
  useEffect(() => {
    if (data) {
      setBooks(data.allBooks);
    }
  }, [data]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!favouriteGenre || !props.show) {
    return null;
  }

  return (
    <div>
      <p>Favourite genre: {favouriteGenre}</p>
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
    </div>
  );
};

export default Favourites;
