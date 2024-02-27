import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./DetailedPage.css";

function DetailedPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const { id, volumeInfo } = location.state.rawData;
  console.log(location.state.rawData);

  const handleMoveBack = () => {
    navigate("/");
  };

  return (
    <div className="detail">
      <h1>Book Details</h1>
      <h2> {volumeInfo.title} </h2>
      <img
        alt={`${volumeInfo.title} book`}
        src={`http://books.google.com/books/content?id=${id}&printsec=frontcover&img=1&zoom=1&source=gbs_api`}
      />
      <br />

      {volumeInfo.authors && (
        <ul>
          <label>Author Name:</label>
          {volumeInfo.authors.map((author, index) => (
            <li key={index}>{author}</li>
          ))}
        </ul>
      )}

      <h3>Publishing Date : {volumeInfo.publishedDate}</h3>
      <h4>Book description: </h4>
      <p> {volumeInfo.description}</p>
      <button className="btn" onClick={handleMoveBack}>
        Move back to home page
      </button>
    </div>
  );
}

export default DetailedPage;
