import React from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const [term, setTerm] = useState("");
  const [result, setResult] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${term}&key=AIzaSyCrPr46tfT-V1tj9A53Bk-fHXM5ikzcvhs`
      );
      setResult(response.data.items);
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setTerm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();
  };

  const handleShowDetail = (e, rawData) => {
    console.log(rawData);
    navigate(`/books/${rawData.id}`, { state: { rawData } });
  };

  const filterEbooks = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${term}&key=AIzaSyCrPr46tfT-V1tj9A53Bk-fHXM5ikzcvhs`
      );
      //setResult(response.data.items);
      const filteredData = response.data.items.filter(
        (f) => f.saleInfo.isEbook === true
      );
      setResult(filteredData);
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <h1> Data is loading</h1>;
  if (error) return <h1>error is : {error.message}</h1>;

  return (
    <div className="home">
      <h1>Our Library</h1>
      <form onSubmit={handleSubmit} class="container">
        <div>
          <label htmlFor="search-books">Search your book here</label>
          <input
            id="search-books"
            type="search"
            value={term}
            onChange={handleChange}
            placeholder="Enter type of book you want to search"
            required
          />
          <button class="submit-btn" type="submit">
            Search
          </button>
          <button onClick={filterEbooks}>Search only e-books</button>
        </div>
      </form>
      <div className="display-data">
        <ul>
          {result.map((m) => (
            <li key={m.id}>
              <div>
                <div>
                  <h3>
                    {m.volumeInfo.title}
                    {"                   "}
                    <span>
                      <i>By</i>
                    </span>
                  </h3>
                  {m.volumeInfo.authors && (
                    <ul>
                      {m.volumeInfo.authors.map((author, index) => (
                        <li key={index}>{author}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
              <button onClick={(e) => handleShowDetail(e, m)}>
                Show detail
              </button>
              <hr />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Home;
