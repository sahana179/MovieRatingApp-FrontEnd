import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { loadAuthors, saveAuthor } from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
import AuthorForm from "./AuthorForm";
import { newAuhor } from "../../../tools/mockData";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";

function ManageAuthorPage({
  authors,
  loadAuthors,
  saveAuthor,
  history,
  ...props
}) {
  const [author, setAuthor] = useState({ ...props.author });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (authors.length === 0) {
      loadAuthors().catch((error) => {
        alert("Loading authors failed" + error);
      });
    } else {
      setAuthor({ ...props.author });
    }
  }, [props.author]);

  function handleChange(event) {
    const { name, value } = event.target;
    setAuthor((prevAuthor) => ({
      ...prevAuthor,
      [name]: name === "id" ? parseInt(value, 10) : value,
    }));
  }

  function formIsValid() {
    const { name } = author;
    const errors = {};

    if (!name) errors.title = "Name is required.";

    setErrors(errors);
    // Form is valid if the errors object still has no properties
    return Object.keys(errors).length === 0;
  }

  function handleSave(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    setSaving(true);
    saveAuthor(author)
      .then(() => {
        toast.success("Author saved.");
        history.push("/authors");
      })
      .catch((error) => {
        setSaving(false);
        setErrors({ onSave: error.message });
      });
  }

  return authors.length === 0 ? (
    <Spinner />
  ) : (
    <AuthorForm
      author={author}
      errors={errors}
      onChange={handleChange}
      onSave={handleSave}
      saving={saving}
    />
  );
}

ManageAuthorPage.propTypes = {
  author: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired,
  loadAuthors: PropTypes.func.isRequired,
  saveAuthor: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

export function getAuthorByName(authors, name) {
  return authors.find((author) => author.name === name) || null;
}

function mapStateToProps(state, ownProps) {
  const name = ownProps.match.params.name;
  const author =
    name && state.authors.length > 0
      ? getAuthorByName(state.authors, name)
      : newAuhor;
  return {
    author,
    authors: state.authors,
  };
}

const mapDispatchToProps = {
  loadAuthors,
  saveAuthor,
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageAuthorPage);
