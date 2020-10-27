const express = require("express");
const cors = require("cors");
const { v4: uuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.status(200).json(repositories)
});

app.post("/repositories", (request, response) => {
  const {title, url, techs} = request.body

  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0,
  }

  repositories.push(repository)

  return response.status(200).json(repository)
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params
  const { title, url, techs, likes  } = request.body

  const repositoryIndex = repositories.findIndex(repository => repository.id === id)

  if (repositoryIndex < 0) {
    return response.status(400).json({error: 'repository dont exists'})
  }

  const repository = {
    id,
    title,
    url,
    techs
  }
 
  repositories[repositoryIndex] = repository

  repository.likes = 0
  repository.techs = ["React", "ReactNative", "TypeScript", "ContextApi"]

  response.status(200).json(repository)

});

app.delete("/repositories/:id", (request, response) => {
  const {id} = request.params
  const { title, url, techs, likes  } = request.body

  const repositoryIndex = repositories.findIndex(repository => repository.id === id)

  if (repositoryIndex < 0) {
    return response.status(400).json({error: 'repository dont exists'})
  }

  repositories.splice(repositoryIndex, 1)

  return response.status(204).json({message: 'Repository deleted'})
});

app.post("/repositories/:id/like", (request, response) => {
  const {id} = request.params

  const repository = repositories.find(repository => repository.id === id)

  if (!repository) {
    return response.status(400).json({error: 'repository dont exists'})
  }
  
  repository.likes += 1

  return response.status(200).json(repository)
});

module.exports = app;
