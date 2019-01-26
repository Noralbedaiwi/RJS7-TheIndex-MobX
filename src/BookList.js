import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { observer } from "mobx-react";

import BookStore from "./stores/BookStore";

// Components
import Loading from "./Loading";
import SearchBar from "./SearchBar";
import BookTable from "./BookTable";

const instance = axios.create({
  baseURL: "https://the-index-api.herokuapp.com"
});

class BookList extends Component {
  render() {
    const bookColor = this.props.match.params.bookColor;
    let books = BookStore.books;
    let allBooksButton;

    if (bookColor) {
      books = BookStore.filterBooksByColor(bookColor);
      allBooksButton = (
        <Link to="/books">
          <button className="btn">All Books</button>
        </Link>
      );
    }

    return (
      <div>
        <h3>Books</h3>
        <SearchBar store={{ BookStore }} />
        {allBooksButton}
        <BookTable books={books} />
      </div>
    );
  }
}

export default observer(BookList);
