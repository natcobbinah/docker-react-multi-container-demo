import { useEffect, useState } from "react";
import axios from "axios";

function Fib2() {
  const [seenIndexes, setSeenIndex] = useState([]);
  const [values, setValues] = useState({});
  const [index, setIndex] = useState("");

  useEffect(() => {
    fetchIndexes()
      .then((result) => {
        setValues(result.data);
      })
      .catch((error) => console.log(error));

    fetchValues()
      .then((result) => {
        setSeenIndex(result.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const fetchValues = async () => {
    return await axios.get("/api/values/current");
    // setValues(values.data);
  };

  const fetchIndexes = async () => {
    return await axios.get("/api/values/all");
    // setSeenIndex(seenIndexes.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post("/api/values", index);
    setIndex("");
  };

  const renderSeenIndexes = () => {
    return seenIndexes?.map(({ number }) => number).join(",");
  };

  const renderValues = () => {
    const entries = [];
    for (let key in values) {
      entries.push(
        <div key={key}>
          For index {key} I calculated {values[key]}
        </div>
      );
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>Enter your index:</label>
        <input
          type="text"
          value={index}
          onChange={(e) => setIndex(e.target.value)}
        ></input>
        <button>Submit</button>
      </form>

    <h3>Indexes I have seen</h3>
      {renderSeenIndexes()}

      <h3>Calculated Values:</h3>
      {renderValues()} 
    </>
  );
}

export default Fib2;