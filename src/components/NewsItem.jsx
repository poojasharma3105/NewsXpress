import React from 'react';
import image from "../assets/news.webp";

const NewsItem = ({ title, description, url, urlToImage }) => {
  return (
    <div
      className="card bg-dark text-light mb-3 d-inline-block my-3 mx-3 px-2 py-2"
      style={{
        width: "345px",
        height: "500px",
        overflow: "hidden"
      }}
    >
      <img
        src={urlToImage ? urlToImage : image}
        style={{
          height: "200px",
          width: "100%"
        }}
        className="card-img-top"
        alt="news"
      />
      <div className="card-body d-flex flex-column justify-content-between" style={{ height: "calc(100% - 200px)" }}>
        <div>
          <h5 className="card-title">{title ? title.slice(0, 50) : "No Title"}</h5>
          <p className="card-text" style={{ maxHeight: "80px", overflow: "hidden" }}>
            {description ? description.slice(0, 100) : "No description available for this news item."}
          </p>
        </div>
        <a href={url} target="_blank" rel="noopener noreferrer" className="btn btn-primary mt-auto">
          Read More
        </a>
      </div>
    </div>
  );
};

export default NewsItem;
