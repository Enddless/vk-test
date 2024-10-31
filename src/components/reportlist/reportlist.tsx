import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { repoStore } from '../../store/store';

const RepoList: React.FC = observer(() => {
  const { repos, loading, loadMoreRepos, updateRepo, deleteRepo } = repoStore;

  useEffect(() => {
    // Загружаем начальные репозитории
    loadMoreRepos();
  }, []);

  const handleScroll = () => {
    // Проверяем, достиг ли пользователь дна страницы
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 &&
      !loading
    ) {
      loadMoreRepos();
    }
  };

  useEffect(() => {
    // Добавляем обработчик события прокрутки
    window.addEventListener('scroll', handleScroll);

    // Убираем обработчик при размонтировании компонента
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [loading]); // Зависимость от loading для обновления обработчика

  return (
    <div>
      {loading && <p>Загрузка...</p>}
      <ul>
        {repos.map((repo) => (
          <li key={repo.id}>
            <input
              type='text'
              value={repo.name}
              onChange={(e) => updateRepo(repo.id, e.target.value)}
            />
            <a href={repo.html_url} target='_blank' rel='noopener noreferrer'>
              Ссылка
            </a>
            <button onClick={() => deleteRepo(repo.id)}>Удалить</button>
          </li>
        ))}
      </ul>
    </div>
  );
});

export default RepoList;
