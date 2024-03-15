import React, { useState, useEffect } from 'react';
import api from '../apis/store-api';
import { load_cards } from '../redux/actions/storeActions';
import { useDispatch, useSelector } from 'react-redux';

const RecentlyAdded = () => {
  const [recentCards, setRecentCards] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const loadCards = async () => {
      try {
        const response = await api.load_all_cards();
        dispatch(load_cards(response.data));
        const sortedCards = response.data.slice().sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).slice(0, 5);
        setRecentCards(sortedCards);
      } catch (error) {
        console.error('Error fetching cards', error);
      }
    };
    loadCards();
  }, [dispatch]);

  return (
    <div className="recent-cards">
      <div className="recent-cards__list">
        {recentCards.map((card, index) => (
          <div key={index} className="recent-cards__item">
            <img src={card.image} alt={`Card ${index}`} className="recent-cards__img" />
            <span className="recent-cards__title">{card.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentlyAdded;