const express = require('express');
const app = express();
const data = require('./data.json');

app.use(express.json());

//localhost:3000/clients
try {
  app.get('/users', function (req, res) {
    res.json(data);
  });
} catch (error) {
  console.error(error);
}

//GET receber dados de um resource,
app.get('/users/:id', async function (req, res) {
  const { id } = await req.params;
  const users = data.find((user) => user.id == id);

  res.json(users);
});

//POST enviar dados ou informações para serem processados por um resource,
app.post('/users', function (req, res) {
  const { name, email } = req.body;

  res.json({ name, email });
});

//PUT atualizar os dados de um resource
app.put('/users/:id', function (req, res) {
  const { id } = req.params;
  const user = data.find((user) => user.id == id);

  if (!user) return res.status(404).json();

  const { name } = req.body;

  user.name = name;

  res.json(user);
});

//DELETE deletar um resource

app.delete('/users/:id', function (req, res) {
  const { id } = req.params;
  const deletfilt = data.filter((users) => users.id != id);

  res.json(deletfilt);
});

app.listen(3000, function () {
  console.log('estamos ao vivo');
});
