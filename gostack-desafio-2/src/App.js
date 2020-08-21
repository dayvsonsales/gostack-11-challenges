import React, { useState, useEffect } from "react";

import "./styles.css";

import api from 'services/api';

function App() {

  const [repositories, setRepositories] = useState([]);
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [techs, setTechs] = useState('');

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title,
      url,
      techs
    });

    setTitle('');
    setUrl('');
    setTechs('');

    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    setRepositories(repositories.filter((value) => value.id !== id));

    await api.delete(`repositories/${id}`);
  }

  useEffect(() => {
    async function loadRepositories() {
      const { data } = await api.get('repositories');

      setRepositories(data);
    }

    loadRepositories();
  }, []);

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => (
          <li key={repository.id}>
            {repository.title}

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>
      
      <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)}/>
      <input type="text" placeholder="Url" value={url} onChange={(e) => setUrl(e.target.value)}/>
      <input type="text" placeholder="Techs" value={techs} onChange={(e) => setTechs(e.target.value.split(","))}/>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
