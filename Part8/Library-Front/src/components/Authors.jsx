import { useQuery } from "@apollo/client";
import { ALL_AUTHORS } from "../Utils/queries";
import UpdateAuthorForm from "./UpdateAuthorForm";

const Authors = (props) => {
  if (!props.show) {
    return null;
  }
  const res = useQuery(ALL_AUTHORS);

  if (res.loading) {
    return <div>Loading...</div>;
  }
  const authors = res.data.allAuthors;

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <UpdateAuthorForm authors={authors} />
    </div>
  );
};

export default Authors;
