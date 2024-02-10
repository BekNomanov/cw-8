import React, { useCallback, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axiosApi from '../../axiosApi';
import { ApiPosts, Post } from '../../type';

const Quotes = () => {
  const [posts, setPosts] = useState<Post[]>();
  const history = useHistory();

  const fetchData = useCallback(async () => {
    const response = await axiosApi.get<ApiPosts>('/quotes.json');
    const posts = response.data;

    if (posts) {
      setPosts(Object.keys(posts).map(id => ({
        ...posts[id],
        id
      })));
    } else {
      setPosts([]);
    }
  }, []);

  useEffect(() => {
    void fetchData();
  }, [fetchData]);

  const handleDelete = async (postId: string) => {
    await axiosApi.delete(`/quotes/${postId}.json`);
    setPosts(posts.filter(post => post.id !== postId));
  };

  const handleEdit = (postId: string, text: string) => {
    // Переходим на страницу формы создания с передачей текста цитаты
    history.push(`/create-form?postId=${postId}&quoteText=${text}`);
  };

  return (
    <div className="container-fluid d-flex">
      <div>
        <ul className="list-group mt-3 me-3">
          <Link to="/quotes/star-wars" className="list-group-item">Звездные Войны</Link>
          <Link to="/quotes/famous-people" className="list-group-item">Известные Личности</Link>
          <Link to="/quotes/saying" className="list-group-item">Изречения</Link>
          <Link to="/quotes/humour" className="list-group-item">Юмор</Link>
          <Link to="/quotes/motivational" className="list-group-item">Мотивация</Link>
        </ul>
      </div>
      <div>
        {posts && posts.map(post => (
          <div className="card mt-3" key={post.id}>
            <div className="card-header">Категория: {post.category}</div>
            <div className="card-body">
              <h5 className="card-title">Автор: {post.author}</h5>
              <p className="card-text">Цитата: {post.text}</p>
              <button className="btn btn-danger float-end" onClick={() => handleDelete(post.id)}>Удалить</button>
              <button className="btn btn-success float-end me-2" onClick={() => handleEdit(post.id, post.text)}>Edit</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Quotes;