import React from 'react';
import { observer } from 'mobx-react-lite';
import RepoList from '../reportlist/reportlist';

const App: React.FC = observer(() => {
  return (
    <div>
      <h1>Список репозиториев</h1>
      <RepoList />
    </div>
  );
});

export default App;

