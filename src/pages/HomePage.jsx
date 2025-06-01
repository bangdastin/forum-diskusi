import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  asyncReceiveThreadsAndUsers,
  asyncUpVoteThread,
  asyncDownVoteThread,
  asyncNeutralVoteThread,
} from '../redux/actions/threadsActions';
import ThreadCard from '../components/threads/ThreadCard';
import { getUniqueCategories } from '../utils/helpers';
import { Link } from 'react-router-dom';
import '../styles/homepage.css'; // Buat file styling ini

function HomePage() {
  const dispatch = useDispatch();
  // Ambil semua thread dan user dari Redux store
  const { list: threads } = useSelector((state) => state.threads);
  const { authUser } = useSelector((state) => state.authUser);
  const users = useSelector((state) => state.users);

  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    // Dispatch action untuk mengambil threads dan users saat komponen dimuat
    dispatch(asyncReceiveThreadsAndUsers());
  }, [dispatch]);

  // Gabungkan informasi owner ke dalam setiap thread
  const threadList = threads
    .map((thread) => ({
      ...thread,
      owner: users.find((user) => user.id === thread.ownerId),
    }))
    .filter((thread) => thread.owner); // Filter thread yang ownernya tidak ditemukan

  const categories = getUniqueCategories(threads);

  const filteredThreads = selectedCategory === 'all' ?
    threadList :
    threadList.filter((thread) => thread.category === selectedCategory);

  const onUpVoteThread = (threadId) => {
    dispatch(asyncUpVoteThread(threadId));
  };

  const onDownVoteThread = (threadId) => {
    dispatch(asyncDownVoteThread(threadId));
  };

  const onNeutralVoteThread = (threadId) => {
    dispatch(asyncNeutralVoteThread(threadId));
  };

  return (
    <div className="homepage">
      <div className="category-filter">
        <h3>Kategori:</h3>
        <button
          type="button"
          onClick={() => setSelectedCategory('all')}
          className={selectedCategory === 'all' ? 'active-category' : ''}
        >
          Semua
        </button>
        {categories.map((category) => (
          <button
            type="button"
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={selectedCategory === category ? 'active-category' : ''}
          >
            #
            {category}
          </button>
        ))}
      </div>

      <div className="threads-list">
        {filteredThreads.length > 0 ? (
          filteredThreads.map((thread) => (
            <ThreadCard
              key={thread.id}
              {...thread}
              authUser={authUser}
              onUpVote={onUpVoteThread}
              onDownVote={onDownVoteThread}
              onNeutralVote={onNeutralVoteThread}
            />
          ))
        ) : (
          <p>Tidak ada thread yang tersedia.</p>
        )}
      </div>
      {authUser && (
        <Link to="/new" className="add-thread-button">
          + Buat Thread
        </Link>
      )}
    </div>
  );
}

export default HomePage;
