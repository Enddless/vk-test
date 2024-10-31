import { makeAutoObservable } from 'mobx';
import axios from 'axios';

interface Repo {
  id: number;
  name: string;
  html_url: string;
}

class RepoStore {
  repos: Repo[] = [];
  loading: boolean = false;
  page: number = 1;
  perPage: number = 20;

  constructor() {
    makeAutoObservable(this);
  }

  loadMoreRepos = async () => {
    this.loading = true;
    try {
      const response = await axios.get(
        `https://api.github.com/search/repositories?q=javascript&sort=stars&order=asc&page=${this.page}&per_page=${this.perPage}`
      );
      const data = response.data.items;
      this.repos.push(...data);
      this.page++;
    } catch (error) {
      console.error('Ошибка при загрузке репозиториев:', error);
    } finally {
      this.loading = false;
    }
  };

  updateRepo = (id: number, name: string) => {
    // Используем стрелочную функцию
    const repo = this.repos.find((repo) => repo.id === id);
    if (repo) {
      repo.name = name;
    }
  };

  deleteRepo = (id: number) => {
    // Используем стрелочную функцию
    this.repos = this.repos.filter((repo) => repo.id !== id);
  };
}

export const repoStore = new RepoStore();
