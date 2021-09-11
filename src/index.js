import db from './db.js';
import express from 'express'
import cors from 'cors'



const app = express();
app.use(cors());
app.use(express.json());

app.get('/produto', async (req, resp) => {
    try {
        let consul = await db.tb_produto.findAll();
        resp.send(consul);
    }

    catch(e){
        console.log(resp.send('vish fi, faz direito o bglh').toString());
    }
})

app.post('/produto', async (req, resp) => {
    try{
        let produt = req.body;
         
        let r = await db.tb_produto.findOne({where: {nm_produto: produt.nm_produto}});

        if (r != null)
            return resp.send({erro: "produto já existe"});

        let insert = await db.tb_produto.create({
            nm_produto: produt.nm_produto,
            ds_categoria: produt.ds_categoria,
            vl_preco_de: produt.vl_preco_de,
            vl_preco_por: produt.vl_preco_por,
            vl_avaliacao: produt.vl_avaliacao,
            ds_produto: produt.ds_produto,
            qtd_estoque: produt.qtd_estoque,
            img_produto: produt.img_produto,
            bt_ativo: produt.bt_ativo,
            dt_inclusao: produt.dt_inclusao
        });
        resp.send(insert);
    }
    catch(e){
        resp.send({erro: "coloca os valores do tipo correto"});
    }
})


app.put('/produto/:id', async (req, resp) => {
    try {
        let produt = req.body;
        let id = req.params.id;


        
        
        let insert = await db.tb_produto.update({
            nm_produto: produt.nm_produto,
            ds_categoria: produt.ds_categoria,
            vl_preco_de: produt.vl_preco_de,
            vl_preco_por: produt.vl_preco_por,
            vl_avaliacao: produt.vl_avaliacao,
            ds_produto: produt.ds_produto,
            qtd_estoque: produt.qtd_estoque,
            img_produto: produt.img_produto,
            bt_ativo: produt.bt_ativo,
            dt_inclusao: produt.dt_inclusao
        },
        {
            where:{ id_produto: id}
        });

        resp.sendStatus(200);
        
    } catch (error) {
        resp.send({erro: "coloca os valores do tipo correto"});
    }
})


app.delete('/produto/:id', async (req, resp) => {
    try {
        let id = req.params.id;
        let deletando = await db.tb_produto.destroy({where: {id_produto: id}})

        resp.sendStatus(200);
    } catch (e) {
        console.log(resp.send('vish fi, faz direito o bglh').toString());
    }
})

app.listen(process.env.PORT,
    X => console.log(`boa amigão, servidor subiu lá na ${process.env.PORT}`))