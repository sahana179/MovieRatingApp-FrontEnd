import React from "react";
import { connect } from "react-redux";
import * as authorActions from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import AuthorList from "./AuthorList";
import { Redirect } from "react-router-dom";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";

class AuthorsPage extends React.Component {
  state = {
    redirectToAddCoursePage: false,
    localAuthors: [],
  };

  const = this.props;
  componentDidMount() {
    const { authors, actions } = this.props;

    if (authors.length === 0) {
      actions
        .loadAuthors()
        .then((x) => {
          console.log(x);
        })
        .catch((error) => {
          alert("Loading authors failed" + error);
        });
      this.setState({ localAuthors: this.props.authors });
    }
    //this.setState({ localAuthors: this.props.authors });
  }

  handleDeleteAuthor = async (author) => {
    toast.success("Author deleted");
    try {
      await this.props.actions.deleteAuthor(author);
    } catch (error) {
      toast.error("Delete failed. " + error.message, { autoClose: false });
    }
  };
  filterItems = (arr, query) => {
    return arr.filter(function (el) {
      return el.name.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    });
  };
  handleSearchClick = async (event) => {
    debugger;
    const { name, value } = event.target;

    var _localAuthors = this.filterItems(this.props.authors, value);
    this.setState({ authors: _localAuthors });
    console.log(this.props.authors);
  };

  render() {
    return (
      <>
        {this.state.redirectToAddCoursePage && <Redirect to="/author" />}
        <h2>Authors</h2>
        {this.props.loading ? (
          <Spinner />
        ) : (
          <>
            <button
              style={{ marginBottom: 20 }}
              className="btn btn-primary add-course"
              onClick={() => this.setState({ redirectToAddCoursePage: true })}
            >
              Add Author
            </button>

            <AuthorList
              onDeleteClick={this.handleDeleteAuthor}
              authors={this.props.authors}
              onSearchClick={this.handleSearchClick}
            />
          </>
        )}
      </>
    );
  }
}

AuthorsPage.propTypes = {
  authors: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  return {
    authors: state.authors,
    loading: state.apiCallsInProgress > 0,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch),
      deleteAuthor: bindActionCreators(authorActions.deleteAuthor, dispatch),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthorsPage);
