import pool from '../db.js';

const getPflanzen = (req, res) => {
    pool.query('SELECT * FROM pflanzen', (error, results) => {
        if(error){
            console.error(error);
            return res.status(500).json({
                message: 'Datenbankfehler'
            });
        }
        res.json(results);
    });
};


const getPflanzenById = (req, res) => {
    const id = req.params.id;
    pool.query('SELECT * FROM pflanzen WHERE id = ?', [id], (error, results) => {
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
};

module.exports = {getPflanzen, getPflanzenById};