const express = require('express');
const fs = require('fs');
const app = express();
app.use(express.json());
app.use(express.static('.'));

app.post('/log', (req,res)=>{
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  fs.appendFileSync('ips.txt', `${new Date().toISOString()} - ${ip} - ${req.body.ref} - ${req.body.ua}\n`);
  res.sendStatus(200);
});

app.listen(3000, ()=>console.log('Servidor rodando na porta 3000'));