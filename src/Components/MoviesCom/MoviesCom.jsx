import React from "react";
import { Link } from "react-router-dom";

export default function MoviesCom({ items }) {
  return (
    <>
      <div className="col-md-2">
    <Link className="text-decoration-none text-white" to={`/itemsDetails/${items.id}/${items.media_type}`}>
        <div className="position-relative">
          {items.poster_path ? (
            <img
              src={"https://image.tmdb.org/t/p/w500" + items.poster_path}
              className="w-100"
              alt=""
            />
          ) : (
            <img
              src={"https://image.tmdb.org/t/p/w500" + items.profile_path}
              className="w-100"
              alt=""
            />
          )}

          <h3 className="h6 titles mt-1">
            {items.title} {items.name}
          </h3>
          {items.vote_average ? (
            <div className="vote top-0 end-0 position-absolute p-1">
              {items.vote_average.toFixed(1)}
            </div>
          ) : (
            ""
          )}
        </div>
      </Link>
      </div>
    </>
  );
}
