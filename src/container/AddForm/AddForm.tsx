import React, { FormEvent, useState } from 'react';
import axiosApi from '../../axiosApi';
import {Props} from '../../type';

const AddForm: React.FC = () => {
  const [formData, setFormData] = useState<Props>({
    category: '',
    author: '',
    text: ''
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await axiosApi.post('/quotes.json', formData);
      console.log('Post added successfully:', response.data);
    } catch (error) {
      console.error('Error adding post:', error);
    }
  };

  return (
    <div className='container-lg'>
      <h2>Добавить пост</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group mb-3">
          <label htmlFor="category" className="input-group-text">Категория</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="form-select"
            required
          >
            <option value="">Выберите категорию</option>
            <option value="star-wars">Star Wars</option>
            <option value="famous-people">Famous people</option>
            <option value="saying">Saying</option>
            <option value="humour">Humour</option>
            <option value="motivational">Motivational</option>
          </select>
        </div>
        <div className="input-group mb-3">
          <label htmlFor="author" className="input-group-text">Автор</label>
          <input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            required
            className="form-control"
            aria-label="Автор"
          />
        </div>
        <div className="input-group">
          <label htmlFor="text" className="input-group-text">Текст</label>
          <textarea
            id="text"
            name="text"
            value={formData.text}
            onChange={handleChange}
            required
            className="form-control"
            aria-label="Текст"
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">Создать пост</button>
      </form>
    </div>
  );
};

export default AddForm;