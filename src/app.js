import express from 'express';
import pool from './db.js'

const app = express();

app.get('/health', (req, res) => {
    res.json({status: 'ok'})
});

app.get('/api/pflanzen', (req, res) => {
    pool.query('SELECT * FROM pflanzen', (error, results) => {
        if(error){
            console.error(error);
            return res.status(500).json({
                message: 'Datenbankfehler'
            });
        }
        res.json(results);
    });
});

app.get('/api/pflanzen/:id', (req, res) => {
    const id = req.params.id;
    pool.query('SELECT * FROM pflanze WHERE id = ?', [id], (error, results) => {
        if(error){
            console.error(error);
            return res.status(500).json({
                message: 'Datenbankfehler'
            });
        }

        if(results.length === 0){
            return res.status(404).json({
                message: 'Pflanze nicht gefunden'
            });
        }
        res.json(results[0]);
    })
});

export default app;


