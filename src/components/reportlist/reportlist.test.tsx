import React from 'react';
import { render } from '@testing-library/react';
import { repoStore } from '../../store/store';
import '@testing-library/jest-dom';
import RepoList from './reportlist';

jest.mock('../../store/store', () => ({
  repoStore: {
    repos: [],
    loading: false,
    loadMoreRepos: jest.fn(),
    updateRepo: jest.fn(),
    deleteRepo: jest.fn()
  }
}));

describe('RepoList', () => {
  beforeEach(() => {
    // Устанавливаем начальное состояние перед каждым тестом
    repoStore.repos = [
      { id: 1, name: 'Repo 1', html_url: 'http://example.com/repo1' },
      { id: 2, name: 'Repo 2', html_url: 'http://example.com/repo2' }
    ];
    repoStore.loading = false;
  });

  it('renders loading state', () => {
    // Симулируем состояние загрузки
    repoStore.loading = true;
    const { getByText } = render(<RepoList />);
    expect(getByText(/загрузка/i)).toBeInTheDocument(); // Проверяем наличие текста "загрузка"
  });

  it('renders repositories', () => {
    const { getByText } = render(<RepoList />);
    expect(getByText(/Repo 1/i)).toBeInTheDocument(); // Проверяем наличие Repo 1
    expect(getByText(/Repo 2/i)).toBeInTheDocument(); // Проверяем наличие Repo 2
  });

  it('does not render loading state when not loading', () => {
    const { queryByText } = render(<RepoList />);
    expect(queryByText(/загрузка/i)).not.toBeInTheDocument(); // Проверяем, что текст "загрузка" не отображается
  });
});
