import {
  FETCH_BOOKS,
  FETCH_SEARCHED_BOOKS,
  ADD_TO_BOOKSHELF,
  REMOVE_FROM_BOOKSHELF,
  GET_BOOKSHELF,
  ERROR,
  LOADING,
} from "./type";
import axios from "axios";

export const fetchBooks = () => async (dispatch) => {
  try {
    dispatch({
      type: LOADING,
      payload: true,
    });
    //fetching books
    let Bookdata = await axios.get(
      "https://openlibrary.org/search.json?q=harry+potter&limit=10&page=1"
    );
    Bookdata = Bookdata.data?.docs;
    return dispatch({
      type: FETCH_BOOKS,
      payload: Bookdata,
    });
  } catch (error) {
    return dispatch({
      type: ERROR,
      payload: error.message,
    });
  }
};

export const fetchSearchedBooks = (query) => async (dispatch) => {
  try {
    dispatch({
      type: LOADING,
      payload: true,
    });
    //fetching searched books
    let Bookdata = await axios.get(
      `https://openlibrary.org/search.json?q=${query}&limit=10&page=1`
    );
    Bookdata = Bookdata.data?.docs;
    return dispatch({
      type: FETCH_SEARCHED_BOOKS,
      payload: Bookdata,
    });
  } catch (error) {
    return dispatch({
      type: ERROR,
      payload: error.message,
    });
  }
};

export const getBookShelf = () => (dispatch) => {
  try {
    dispatch({
      type: LOADING,
      payload: true,
    });
    let bookShelf = [];
    //checking bookshelf present or not
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      bookShelf = user.bookShelf;
    } else {
      bookShelf = [];
    }

    return dispatch({
      type: GET_BOOKSHELF,
      payload: bookShelf,
    });
  } catch (error) {
    return dispatch({
      type: ERROR,
      payload: error.message,
    });
  }
};

export const addToBookShelf = (book) => (dispatch) => {
  try {
    dispatch({
      type: LOADING,
      payload: true,
    });
    let bookShelf = [];
    //checking bookshelf present or not
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      bookShelf = [...user.bookShelf, book];
      user.bookShelf = bookShelf;
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      const newUser = {
        bookShelf: [book],
      };
      //create new user if not present
      localStorage.setItem("user", JSON.stringify(newUser));
    }

    return dispatch({
      type: ADD_TO_BOOKSHELF,
      payload: bookShelf,
    });
  } catch (error) {
    return dispatch({
      type: ERROR,
      payload: error.message,
    });
  }
};

export const removeFromBookShelf = (book) => (dispatch) => {
  try {
    dispatch({
      type: LOADING,
      payload: true,
    });
    const user = JSON.parse(localStorage.getItem("user"));
    // Filter out the book
    const newBookShelf = user.bookShelf.filter((each) => each.id !== book.id);
    // Update the user's bookShelf
    user.bookShelf = newBookShelf;
    localStorage.setItem("user", JSON.stringify(user));

    return dispatch({
      type: REMOVE_FROM_BOOKSHELF,
      payload: newBookShelf,
    });
  } catch (error) {
    return dispatch({
      type: ERROR,
      payload: error.message,
    });
  }
};
