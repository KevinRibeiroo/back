import db from './db.js';
import express from 'express'
import cors from 'cors'

const app = express();
app.use(cors());
app.use(express.json());

app.get('/matricula', async (req, resp) => {
    try {
        let consul = await db.tb_matricula.findAll();
        resp.send(consul);
    }

    catch(e){
        console.log(resp.send('vish fi, faz direito o bglh').toString());
    }
})

app.post('/matricula', async (req, resp) => {
    try{
        let matricula = req.body;

        let aluno = {
            nm_aluno: matricula.nm_aluno,
            nr_chamada: matricula.nr_chamada,
            nm_curso: matricula.nm_curso,
            nm_turma: matricula.nm_turma
        }

        let insert = await db.tb_matricula.create(aluno);
        resp.send(insert);
    }
    catch(e){
        console.log(resp.send('vish fi3, faz direito o bglh').toString());
    }
})


app.put('/matricula/:id', async (req, resp) => {
    try {
        let matricu = req.body;
        let id = req.params.id;


        
        let alterando = await db.tb_matricula.update({
            nm_aluno: matricu.nm_aluno,
            nr_chamada: matricu.nr_chamada,
            nm_curso: matricu.nm_curso,
            nm_turma: matricu.nm_turma
        },
        {
            where:{ id_matricula: id}
        })

        resp.sendStatus(200);
        
    } catch (error) {
        console.log(resp.send('só pode numero que não seja negativo, e sem').toString());
    }
})


app.delete('/matricula/:id', async (req, resp) => {
    try {
        let id = req.params.id;
        let deletando = await db.tb_matricula.destroy({where: {id_matricula: id}})

        resp.sendStatus(200);
    } catch (e) {
        console.log(resp.send('vish fi, faz direito o bglh').toString());
    }
})

app.listen(process.env.PORT,
    X => console.log(`boa amigão, servidor subiu lá na ${process.env.PORT}`))