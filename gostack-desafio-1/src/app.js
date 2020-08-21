const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.status(200).send(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;
  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  };

  repositories.push(repository);

  return response.status(200).send(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;

  let repository;

  for(let i = 0; i < repositories.length; i++){
    const value = repositories[i];

    if(value.id === id){
      value.title = title;
      value.url = url;
      value.techs = techs;

      repository = value;
      break;
    }
  }
  
  if(repository){
    return response.send(repository);
  } else {
    return response.status(400).send({ message: 'Not found' });
  }

});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  for(let i = 0; i < repositories.length; i++){
    const value = repositories[i];

    if(value.id === id){
      repositories.splice(i, 1);

      return response.status(204).send({ message: 'Repository removed' });
    }
  }
  
  return response.status(400).send({ message: 'Not found' });
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  for(let i = 0; i < repositories.length; i++){
    const value = repositories[i];

    if(value.id === id){
      value.likes += 1;

      return response.status(200).send({ likes: value.likes });
    }
  }
  
  return response.status(400).send({ message: 'Not found' });
});

module.exports = app;
