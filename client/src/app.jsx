import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

import ReviewList from './components/ReviewList.jsx';
import PhotoCarousel from './components/PhotoCarousel.jsx';
import ModalCarousel from './components/ModalCarousel.jsx';
import { Main } from './styled-components.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    let storeId = Number(location.pathname.split('/')[2]);
    let itemId = Number(location.pathname.split('/')[3]);
    this.state = {
      id: itemId,
      storeId: storeId,
      photoReviews: [],
      modalIdx: 0,
      modalShow: false,
      modalIsCarousel: true
    };

    this.getPhotoReviews = this.getPhotoReviews.bind(this)
    this.clickReviewPhoto = this.clickReviewPhoto.bind(this)
    this.modalHandleSelect = this.modalHandleSelect.bind(this)
    this.toggleModalShow = this.toggleModalShow.bind(this)
    this.carouselClick = this.carouselClick.bind(this)
  }

  getPhotoReviews() {
    $.get(`http://54.183.239.46:3001/api-photos/${this.state.storeId}/${this.state.id}`)
      .done((reviews) => {
        // formatting for photo carousel
        console.log(reviews)
        console.log('hello world')
        var slides = [[], [], [], [], []];
        var i = 0;
        for (let slide of slides) {
          slides[i] = slide.concat(reviews.slice(i * 4, (i * 4) + 4));
          i++;
        }
        this.setState({ photoReviews: slides });
      })
      .fail(() => {
        console.log('Request failed')
      })
  }

  clickReviewPhoto(e) {
    var reviews = this.state.photoReviews.flat();
    var modalIdx = reviews.indexOf(reviews.find((review) => review._id === e.target.id));
    this.setState({ modalIdx, modalIsCarousel: false, modalShow: true })
  }

  carouselClick(e) {
    this.setState({ modalIdx: Number(e.target.id), modalIsCarousel: true, modalShow: true });
  }

  modalHandleSelect(selectedIdx, e) {
    this.setState({ modalIdx: Number(selectedIdx) })
  }

  toggleModalShow() {
    this.setState({ modalShow: !this.state.modalShow })
  }

  componentDidMount() {
    this.getPhotoReviews()
  }

  render() {
    return (
      <Main>
        <ReviewList
          storeId={this.state.storeId}
          itemId={this.state.id}
          clickReviewPhoto={this.clickReviewPhoto}/>
        <PhotoCarousel
          photos={this.state.photoReviews}
          carouselClick={this.carouselClick} />
        <ModalCarousel
          reviewIdx={this.state.modalIdx}
          reviews={ this.state.photoReviews.flat() }
          show={this.state.modalShow}
          isCarousel={this.state.modalIsCarousel}
          toggleShow={this.toggleModalShow}
          handleSelect={this.modalHandleSelect} />
      </Main>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('reviews'))
