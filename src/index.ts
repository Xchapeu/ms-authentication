import express from 'express';
import errorHandler from './middlewares/error-handler.middleware';
import authorizationRoute from './routes/authorization.route';
import statusRoute from './routes/status.route';
import usersRoute from './routes/users.route';

const app = express();
const port = 3000;

//Configuração da aplicação
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Configuração das rotas
app.use(usersRoute);
app.use(statusRoute);
app.use(authorizationRoute);

//Configuração dos handlers de error
app.use(errorHandler);

//Inicialização do servidor
app.listen(port, () => {
  console.log(`API rodando na porta ${port}...`);
});

export default app;