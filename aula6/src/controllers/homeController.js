const homeModel = require('../models/homeModel');

homeModel.create({
    title: 'Um título qualquer',
    descricao: 'Uma descrição qualquer.'
})
.then(dados => console.log(dados))
.catch(e => console.log(e));

exports.paginaInicial = (req, res) => {
    res.render('index');
};


exports.trataPost = (req, res) => {
    res.send('Ei, sou sua nova rota de POST.');
};