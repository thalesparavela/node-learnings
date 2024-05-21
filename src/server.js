const express = require("express");
const app = express();
app.get("/message/:id/:user", (request, response) => {
  const { id, user } = request.params;
/*route params são obrigatórios*/
  response.send(
    `ID da mensagem é : ${id}.
    Usuário é: ${user}.`
  );
});
app.get("/users", (request, response) => {
  const {page, limit} = request.query;
  /*query params não são obrigatórios*/
  response.send(
    `Página é: ${page}.
    Mostrar é: ${limit}.`
  );
});

const port = 3000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
