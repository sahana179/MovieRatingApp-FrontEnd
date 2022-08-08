import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const AuthorList = ({ authors, onDeleteClick, onSearchClick }) => (
  <table className="table">
    <thead>
      <tr>
        <th>
          <input type="text" onChange={onSearchClick} />
        </th>
        <th>Author</th>
        <th />
      </tr>
    </thead>
    <tbody>
      {authors.map((author) => {
        return (
          <tr key={author.id}>
            <td>
              <Link to={"/author/" + author.name}>{author.name}</Link>
            </td>
            <td>
              <button
                className="btn btn-outline-danger"
                onClick={() => onDeleteClick(author)}
              >
                Delete
              </button>
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
);

AuthorList.propTypes = {
  authors: PropTypes.array.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  onSearchClick: PropTypes.func.isRequired,
};

export default AuthorList;
