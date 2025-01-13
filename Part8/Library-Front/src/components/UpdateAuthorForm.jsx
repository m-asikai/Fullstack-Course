import { useState } from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_YEAR, ALL_AUTHORS } from "../Utils/queries";

const UpdateAuthorForm = ({ authors }) => {
  const [year, setYear] = useState(null);
  const [name, setName] = useState("");

  const [update] = useMutation(UPDATE_YEAR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  const updateYear = (e) => {
    e.preventDefault();
    update({ variables: { name, year } });
  };
  return (
    <form onSubmit={updateYear} style={{ margin: "1rem" }}>
      <div>
        <select onChange={({ target }) => setName(target.value)}>
          {authors.map((author) => (
            <option value={author.name} key={author.name}>
              {author.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        Year:
        <input onChange={({ target }) => setYear(Number(target.value))}></input>
      </div>
      <button type="submit" style={{ margin: "1rem" }}>
        Update birthyear
      </button>
    </form>
  );
};

export default UpdateAuthorForm;
