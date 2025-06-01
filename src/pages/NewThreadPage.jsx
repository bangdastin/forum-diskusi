import React from 'react';
import ThreadInput from '../components/threads/ThreadInput';
import '../styles/new-thread-page.css';

function NewThreadPage() {
  return (
    <div className="new-thread-page">
      <ThreadInput />
    </div>
  );
}

export default NewThreadPage;
