import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import ThreadCard from './ThreadCard'; // Pastikan path ini benar
import { postedAt } from '../../utils/helpers';

/**
 * Test Scenario for ThreadCard Component
 *
 * - ThreadCard component
 * - should display thread title, category, truncated body, owner name, and creation date correctly
 * - should display total comments correctly
 * - should call onUpVote when upvote button is clicked
 * - should call onDownVote when downvote button is clicked
 */

const mockStore = configureStore([]);

const fakeThread = {
  id: 'thread-1',
  title: 'Test Thread Title',
  body: 'This is the body of the test thread. It is a bit long to test truncation.',
  category: 'testing',
  createdAt: new Date().toISOString(),
  totalComments: 5,
  owner: { id: 'user-1', name: 'Test User', avatar: 'avatar.png' },
  upVotesBy: ['user-2'],
  downVotesBy: ['user-3'],
};

const authUser = { id: 'user-1' };

const mockOnUpVote = jest.fn();
const mockOnDownVote = jest.fn();
const mockOnNeutralVote = jest.fn();

describe('ThreadCard component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      authUser: { authUser }, // Simulating logged-in user
    });
    mockOnUpVote.mockClear();
    mockOnDownVote.mockClear();
    mockOnNeutralVote.mockClear();
  });

  it('should display thread title, category, truncated body, owner name, and creation date correctly', () => {
    // Arrange
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ThreadCard
            {...fakeThread}
            authUser={authUser}
            onUpVote={mockOnUpVote}
            onDownVote={mockOnDownVote}
            onNeutralVote={mockOnNeutralVote}
          />
        </BrowserRouter>
      </Provider>,
    );

    // Assert
    expect(screen.getByText(fakeThread.title)).toBeInTheDocument();
    expect(screen.getByText(`#${fakeThread.category}`)).toBeInTheDocument();
    // Cek body yang sudah ditruncate
    const expectedTruncatedBody = `${fakeThread.body.substring(0, 150)}...`;
    // Karena dangerouslySetInnerHTML, kita perlu mencari elemen dengan cara lain atau memverifikasi kontennya
    const bodyElement = screen.getByText((content, element) => element.innerHTML === expectedTruncatedBody);
    expect(bodyElement).toBeInTheDocument();

    expect(screen.getByText(fakeThread.owner.name)).toBeInTheDocument();
    expect(screen.getByText(postedAt(fakeThread.createdAt))).toBeInTheDocument();
  });

  it('should display total comments correctly', () => {
    // Arrange
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ThreadCard
            {...fakeThread}
            authUser={authUser}
            onUpVote={mockOnUpVote}
            onDownVote={mockOnDownVote}
            onNeutralVote={mockOnNeutralVote}
          />
        </BrowserRouter>
      </Provider>,
    );

    // Assert
    expect(screen.getByText(`${fakeThread.totalComments} Komentar`)).toBeInTheDocument();
  });

  it('should call onUpVote when upvote button is clicked', () => {
    // Arrange
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ThreadCard
            {...fakeThread}
            authUser={authUser}
            onUpVote={mockOnUpVote}
            onDownVote={mockOnDownVote}
            onNeutralVote={mockOnNeutralVote}
          />
        </BrowserRouter>
      </Provider>,
    );
    const upVoteButton = screen.getByRole('button', { name: /upvote thread/i });

    // Act
    fireEvent.click(upVoteButton);

    // Assert
    expect(mockOnUpVote).toHaveBeenCalledWith(fakeThread.id);
  });

  it('should call onDownVote when downvote button is clicked', () => {
    // Arrange
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ThreadCard
            {...fakeThread}
            authUser={authUser}
            onUpVote={mockOnUpVote}
            onDownVote={mockOnDownVote}
            onNeutralVote={mockOnNeutralVote}
          />
        </BrowserRouter>
      </Provider>,
    );
    const downVoteButton = screen.getByRole('button', { name: /downvote thread/i });

    // Act
    fireEvent.click(downVoteButton);

    // Assert
    expect(mockOnDownVote).toHaveBeenCalledWith(fakeThread.id);
  });
});