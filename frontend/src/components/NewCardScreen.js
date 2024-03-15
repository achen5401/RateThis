import React, { useState } from 'react';
import api from '../apis/store-api';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const NewCardScreen = () => {
    const [title, setTitle] = useState('');
    const [image, setImage] = useState(null);
    const [websiteLink, setWebsiteLink] = useState('');
    const [description, setDescription] = useState('');
    const [tagsInput, setTagsInput] = useState('');
    const [tags, setTags] = useState([]);
    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);

    const username = useSelector((state) => state.auth.username);
    const navigate = useNavigate();

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        setImage(file);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('ownerUsername', username);
            formData.append('image', image);
            formData.append('websiteLink', websiteLink);
            formData.append('description', description);
            formData.append('tags', tags);
            formData.append('likes', likes);
            formData.append('dislikes', dislikes);
            const response = await api.new_card(formData);
            console.log(response.data);


            // Clear form fields after successful submission
            setTitle('');
            setImage(null);
            setWebsiteLink('');
            setDescription('');
            setTagsInput('');
            setTags([]);
            setLikes(0);
            setDislikes(0);

            navigate("/");

            // You may also add a success message or redirect the user
        } catch (error) {
            // Handle error
            console.error('Error creating new card:', error);
        }
    };

    const handleTagInputChange = (event) => {
        setTagsInput(event.target.value);
    };

    const handleAddTag = () => {
        if (tagsInput.trim() !== '') {
            setTags([...tags, tagsInput.trim()]);
            setTagsInput('');
        }
    };

    const handleRemoveTag = (tagToRemove) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
    };

    return (
        <div className="new-card-container">
            <h2>Create New Card</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>
                <div>
                    <label>Image:</label>
                    <input type="file" accept="image/*" onChange={handleImageUpload} required />
                </div>
                <div>
                    <label>Website Link:</label>
                    <input type="text" value={websiteLink} onChange={(e) => setWebsiteLink(e.target.value)} />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
                </div>
                <div className="tag-list">
                    {tags.map(tag => (
                        <div key={tag} className="tag-item">
                            {tag}
                            <button type="button" onClick={() => handleRemoveTag(tag)}>Remove</button>
                        </div>
                    ))}
                </div>
                <div className="tag-input-container">
                    <input type="text" value={tagsInput} onChange={handleTagInputChange} placeholder="Add tags" />
                    <button type="button" onClick={handleAddTag}>Add Tag</button>
                </div>
                <button type="submit">Create Card</button>
            </form>
        </div>
    );
};

export default NewCardScreen;