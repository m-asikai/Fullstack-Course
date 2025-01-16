import { useEffect, useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import BookForm from "./components/BookForm";
import Login from "./components/Login";
import { useApolloClient, useQuery, useSubscription } from "@apollo/client";
import { ALL_BOOKS, BOOK_ADDED } from "./Utils/queries";
import Favourites from "./components/Favourites";

export const updateCache = (cache, query, bookAdded) => {
  const uniqueByName = (n) => {
    const seen = new Set();
    return n.filter((item) => {
      let k = item.title;
      return seen.has(k) ? false : seen.add(k);
    });
  };

  cache.updateQuery(query, ({ allBooks }) => {
    return {
      allBooks: uniqueByName(allBooks.concat(bookAdded)),
    };
  });
};

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(null);
  const res = useQuery(ALL_BOOKS);
  const [books, setBooks] = useState([]);
  const client = useApolloClient();

  useSubscription(BOOK_ADDED, {
    onData: ({ data, client }) => {
      const addedBook = data.data.bookAdded;
      window.alert(`${addedBook.title} added to the database.`);
      updateCache(client.cache, { query: ALL_BOOKS }, addedBook);
    },
    onError: (e) => console.log(e),
  });

  useEffect(() => {
    const savedToken = localStorage.getItem("book-token");
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  useEffect(() => {
    if (res.data) {
      setBooks(res.data.allBooks);
    }
  }, [res.data]);

  const handleLogout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {token && <button onClick={() => setPage("add")}>add book</button>}
        {token && <button onClick={() => setPage("rec")}>Recommended</button>}
        {!token && <button onClick={() => setPage("login")}>Login</button>}
        {token && <button onClick={handleLogout}>Logout</button>}
      </div>

      <Authors show={page === "authors"} />

      <Books show={page === "books"} books={books} />

      <Login show={page === "login"} setToken={setToken} setPage={setPage} />

      <BookForm show={page === "add"} token={token} />

      <Favourites show={page === "rec"} />
    </div>
  );
};

export default App;
