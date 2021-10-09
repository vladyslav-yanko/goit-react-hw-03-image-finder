import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import ApiPixabay from 'services/ApiPixabay';
import SearchForm from 'Component/SearchForm/SearchForm';
import './App.css';
import ImageGallery from 'Component/ImageGallery/ImageGallery';
import Button from 'Component/Button/Button';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
// import ImageItem from 'Component/ImageItem/ImageItem';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};
export default class App extends Component {
  state = {
    query: '',
    error: null,
    page: 1,
    status: 'idle',
    images: [],
  };
  componentDidUpdate(prevProps, prevState) {
    const prevName = prevState.query;
    const nextName = this.state.query;

    if (prevName !== nextName) {
      this.renderImg();
    }
  }

  handleFormSubmit = newQuery => {
    this.setState({
      query: newQuery,
      page: 1,
      images: [],
    });
  };

  renderImg = () => {
    const { query, page } = this.state;
    this.setState({
      status: Status.PENDING,
    });
    ApiPixabay.fetchImg(query, page)
      .then(response => {
        const responseLength = response.hits.length;

        if (responseLength === 0) {
          this.setState({
            error: new Error(`No search results for ${query}`),
            status: Status.REJECTED,
          });
          return;
        }

        this.setState(prevState => ({
          images: [...prevState.images, ...response.hits],
          page: prevState.page + 1,
          status: Status.RESOLVED,
        }));
      })

      .catch(error => this.setState({ error, status: Status.REJECTED }));
  };

  render() {
    const { error, status } = this.state;

    return (
      <div className="App">
        <SearchForm onSubmit={this.handleFormSubmit}></SearchForm>
        <ToastContainer autoClose={4000} />
        {status === Status.IDLE && <div className="imgGreet">Hello =)</div>}
        <ImageGallery images={this.state.images} />
        {status === Status.REJECTED && (
          <div className="imgGreet">
            {error.message}
            <img
              src="https://cdn.pixabay.com/photo/2016/02/19/10/13/pug-1209129_960_720.jpg"
              alt=""
            />
          </div>
        )}
        {status === Status.PENDING && (
          <Loader
            type="Puff"
            color="#3fb566"
            height={100}
            width={200}
            timeout={3000}
          />
        )}
        {status === Status.RESOLVED && <Button onClick={this.renderImg} />}
      </div>
    );
  }
}
