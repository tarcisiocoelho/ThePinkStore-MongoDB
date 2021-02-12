const { response } = require('express');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

app.use(express.json())
const cors = require('cors');
app.use(cors())

require('./src/models/Usuario');
const Usuario = mongoose.model("usuarios")

require('./src/db/connect');

app.get('/usuarios', async (req, res) =>{
    const usuarioResponse = await Usuario.find()
    const usuariosJson = await usuarioResponse

    return res.json(usuariosJson);
});

app.post('/usuarios', async(req, res) =>{
    const validate = await Usuario.findOne({email: req.body.email})
    if(validate){
        return res.json({message: "Já existe um usuário com esse email"})
    }  else {
        const novoUsuario = new Usuario({
            nome: req.body.nome,
            email: req.body.email,
            produto: req.body.produto
        });
        
        novoUsuario.save();
        res.json({message: "Cadastro concluído com sucesso", usuario: novoUsuario})
    }
   
});

app.put('/usuarios/:id', async(req, res) =>{
    const {id} = req.params
    const usuario = await Usuario.findOne({_id:id})

    usuario.nome = req.body.nome
    usuario.email = req.body.email
    usuario.senha = req.body.senha

    usuario.save()
    res.json({message: "Usuario alterado", usuario: usuario})
})

app.delete('/usuario/:id', async(req, res) => {
    const {id} = req.params;
    const usuario = await Usuario.findOneAndDelete({_id:id})

    res.json({message: "Usuario deletado com sucesso", usuario: usuario})
});


app.listen(3333);