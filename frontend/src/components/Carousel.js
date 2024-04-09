import React, { useState, useEffect } from 'react';
import api from '../apis/store-api';
import { load_cards } from '../redux/actions/storeActions';
import { useDispatch } from 'react-redux';

const Carousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const dispatch = useDispatch();
  const [images, setImages] = useState([]);
  const [descriptions, setDescriptions] = useState([]);
  const [tags, setTags] = useState([]);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const loadCards = async () => {
      try {
        const response = await api.load_all_cards();
        const sortedCards = response.data.sort((a, b) => {
          // Sorting based on likes, descending order
          return (b.likes || 0) - (a.likes || 0);
        });
        dispatch(load_cards(sortedCards));
        const loadedCards = sortedCards;
        const loadedImages = sortedCards.map(card => card.image);
        const loadedDescriptions = sortedCards.map(card => card.description);
        const loadedTags = sortedCards.map(card => card.tags || []); // Ensure tags array exists
        setCards(loadedCards);
        setImages(loadedImages);
        setDescriptions(loadedDescriptions);
        setTags(loadedTags);
      } catch (error) {
        console.error('Error fetching cards', error);
      }
    };
    loadCards();
  }, [dispatch]);

  const nextSlide = () => {
    setActiveIndex((prevIndex) => {
      const newIndex = prevIndex === images.length - 1 ? 0 : prevIndex + 1;
      return newIndex;
    });
  };
  
  const prevSlide = () => {
    setActiveIndex((prevIndex) => {
      const newIndex = prevIndex === 0 ? images.length - 1 : prevIndex - 1;
      return newIndex;
    });
  };

  const handleLike = async () => {
    // Remove the current image, description, and tags from the state
    const updatedCards = [...cards];
    const updatedImages = [...images];
    const updatedDescriptions = [...descriptions];
    const updatedTags = [...tags];

    const cardToDelete = updatedCards[activeIndex];
    cardToDelete.likes++;
    const response = await api.update_card(cardToDelete);

    updatedCards.splice(activeIndex, 1);
    updatedImages.splice(activeIndex, 1);
    updatedDescriptions.splice(activeIndex, 1);
    updatedTags.splice(activeIndex, 1);

    setCards(updatedCards);
    setImages(updatedImages);
    setDescriptions(updatedDescriptions);
    setTags(updatedTags);

    // Ensure the index doesn't exceed the length of the updated images array
    setActiveIndex(activeIndex >= updatedImages.length ? 0 : activeIndex);
  

  };

  const handleDislike = async () => {
    // Remove the current image, description, and tags from the state
    const updatedCards = [...cards];
    const updatedImages = [...images];
    const updatedDescriptions = [...descriptions];
    const updatedTags = [...tags];

    const cardToDelete = updatedCards[activeIndex];
    cardToDelete.dislikes++;
    const response = await api.update_card(cardToDelete);

    updatedCards.splice(activeIndex, 1);
    updatedImages.splice(activeIndex, 1);
    updatedDescriptions.splice(activeIndex, 1);
    updatedTags.splice(activeIndex, 1);

    setCards(updatedCards);
    setImages(updatedImages);
    setDescriptions(updatedDescriptions);
    setTags(updatedTags);

    // Ensure the index doesn't exceed the length of the updated images array
    setActiveIndex(activeIndex >= updatedImages.length ? 0 : activeIndex);
  };

  return (
    <div className="carousel">
      <div className="carousel__content">
        <div className="carousel__image-container">
          {images[activeIndex] ?
          <img
            src={images[activeIndex]}
            alt={`Slide ${activeIndex}`}
            className="carousel__img"
          /> :
          "Images loading..."
          }
        </div>
        <div className="carousel__description">
          <p>Description: {descriptions[activeIndex]}</p>
          {tags[activeIndex] && tags[activeIndex].length > 0 && (
            <p>Tags: {tags[activeIndex].join(', ')}</p>
          )}
        </div>
        <div className="carousel__buttons">
          <button onClick={handleDislike} disabled={!images[activeIndex]} className="carousel__btn carousel__btn--dislike">
            Not
          </button>
          <button onClick={handleLike} disabled={!images[activeIndex]} className="carousel__btn carousel__btn--like">
            Hot
          </button>
        </div>
      </div>
      <div className="carousel__nav">
        <button onClick={prevSlide} disabled={!images[activeIndex]} className="carousel__nav-btn carousel__nav-btn--prev">
          &lt;
        </button>
        <button onClick={nextSlide} disabled={!images[activeIndex]} className="carousel__nav-btn carousel__nav-btn--next">
          &gt;
        </button>
      </div>
    </div>
  );
};

export default Carousel;