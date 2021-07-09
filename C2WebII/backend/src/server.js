require('dotenv').config({
    path: process.env.NODE_ENV === "development" ? ".env.development" : ".env"
});


const express = require("express");
const sync = require('./infra/postgres').sincronizarPostgres;
const app = express();

const port = process.env.APP_PORT;
const hostname = process.env.APP_HOSTNAME;

(async () => await sync())()

const defaultRoutes = require('./routes/default-routes');

const unidadeRoutes = require('./routes/unidadeSaude-routes');
const pessoaRoutes = require('./routes/pessoa-routes');
const agendamentoRoutes = require('./routes/agendamento-routes');

const unidadeRoutesPg = require('./routes/unidadeSaude-routes-pg');
const pessoaRoutesPg = require('./routes/pessoa-routes-pg');
const agendamentoRoutesPg = require('./routes/agendamento-routes-pg');

app.use(express.urlencoded({
    extended: true
}));

app.use(express.json());

app.use('/', defaultRoutes);

app.use('/api/unidades-saude', unidadeRoutes);
app.use('/api/pessoa', pessoaRoutes);
app.use('/api/agendamento', agendamentoRoutes);

app.use('/api/unidades-saude-pg', unidadeRoutesPg);
app.use('/api/pessoa-pg', pessoaRoutesPg);
app.use('/api/agendamento-pg', agendamentoRoutesPg);


app.listen(port, hostname, ()=>{
    console.log(`Servidor rodando no endereço: https://${hostname}:${port}`);
});