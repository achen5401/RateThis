import React, { useState, useEffect } from 'react';
import api from '../apis/store-api';
import { load_cards, delete_card } from '../redux/actions/storeActions';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { edit_card } from '../redux/actions/storeActions';

const ViewCards = () => {
    const [recentCards, setRecentCards] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const email = useSelector((state) => state.auth.email);

    useEffect(() => {
        const loadCards = async () => {
            try {
                const response = await api.load_all_cards();
                dispatch(load_cards(response.data));
                const filteredCards = response.data.filter(card => card.ownerEmail === email);
                const sortedCards = filteredCards.slice().sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
                setRecentCards(sortedCards.reverse()); // Reverse the order to sort from newest to oldest
            } catch (error) {
                console.error('Error fetching cards', error);
            }
        };
        loadCards();
    }, [dispatch, email]);

    const handleEdit = async (card) => {
        dispatch(edit_card(card));
        navigate('/edit-card');
    }

    const handleDelete = async (id) => {
        try {
          await api.delete_card(id);
          setRecentCards(recentCards.filter(card => card._id !== id)); // Use card._id instead of card.id
        } catch (error) {
          console.error('Error deleting card', error);
        }
      };

    return (
        <div className="view-cards" style={{ marginTop: '20px', marginBottom: '20px' }}>
            <div className="view-cards__list">
                {recentCards.map((card, index) => (
                    <div key={index} className="view-cards__item">
                        {(!card.likes && !card.dislikes) && (
                            <div>
                            <button className="edit-button" onClick={() => handleEdit(card)}>Edit</button>
                            <button className="delete-button" onClick={() => handleDelete(card._id)}>X</button>
                            </div>
                        )}
                        <span className="view-cards__title">{card.title}</span>
                        <img src={card.image} alt={`Card ${index}`} className="view-cards__img" />
                        <p className="view-cards__description">Desc: {card.description}</p>
                        <div className="view-cards__metadata">
                            <p>Likes: {card.likes}</p>
                            <p>Dislikes: {card.dislikes}</p>
                            <p>Tags: {card.tags.join(', ')}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ViewCards;