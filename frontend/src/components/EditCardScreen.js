import React, { useState, useEffect } from 'react';
import api from '../apis/store-api';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const EditCardScreen = () => {
    const card = useSelector((state) => state.store.cardToEdit);
    const navigate = useNavigate();
    const [title, setTitle] = useState(card.title);
    const [image, setImage] = useState(card.image);
    const [websiteLink, setWebsiteLink] = useState(card.websiteLink);
    const [description, setDescription] = useState(card.description);
    const [tagsInput, setTagsInput] = useState('');
    const [tags, setTags] = useState(card.tags);
    const [likes, setLikes] = useState(card.likes);
    const [dislikes, setDislikes] = useState(card.dislikes);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'tags') {
            setTagsInput(value);
        } else {
            // Handle other input changes
            switch(name) {
                case 'title':
                    setTitle(value);
                    break;
                case 'websiteLink':
                    setWebsiteLink(value);
                    break;
                case 'description':
                    setDescription(value);
                    break;
                default:
                    break;
            }
        }
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        setImage(file);
    };

    const handleEditCard = async (e) => {
        e.preventDefault();

        try {
            card.title = title;
            card.image = image;
            card.websiteLink = websiteLink;
            card.description = description;
            card.tags = tags;
            const response = await api.update_card(card);
            navigate('/my-cards');
        } catch (error) {
            console.error('Error editing card:', error);
        }
    };

    const handleAddTag = () => {
        if (tagsInput.trim() !== '') {
            setTags([...tags, tagsInput.trim()]);
            setTagsInput('');
        }
    };

    const handleRemoveTag = (indexToRemove) => {
        setTags(tags.filter((_, index) => index !== indexToRemove));
    };

    return (
        <div className="edit-card-container">
            <h2>Edit Card</h2>
            <form onSubmit={handleEditCard}>
                <div>
                    <label>Title:</label>
                    <input
                        type="text"
                        name="title"
                        value={title}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Image:</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                    />
                </div>
                <div>
                    <label>Website Link:</label>
                    <input
                        type="text"
                        name="websiteLink"
                        value={websiteLink}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea
                        name="description"
                        value={description}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="tag-list">
                    {tags.map((tag, index) => (
                        <div key={index} className="tag-item">
                            {tag}
                            <button type="button" onClick={() => handleRemoveTag(index)}>Remove</button>
                        </div>
                    ))}
                </div>
                <div className="tag-input-container">
                    <input
                        type="text"
                        name="tags"
                        value={tagsInput}
                        onChange={handleInputChange}
                        placeholder="Add tags"
                    />
                    <button type="button" onClick={handleAddTag}>Add Tag</button>
                </div>
                <button type="submit">Save Changes</button>
            </form>
        </div>
    );
};

export default EditCardScreen;