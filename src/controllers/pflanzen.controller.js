import pool from '../db.js';

export const getPflanzen = (req, res) => {
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


export const getPflanzenById = (req, res) => {
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

export const postPflanzen = (req, res) => {
    console.log('POST-Anfrage angekommen');
    const pflanze = req.body;
    pool.query('INSERT INTO pflanzen (name, substrat, standort_licht, bemerkungen, kategorie_id, giessen_id) VALUES (?, ?, ?, ?, ?, ?)', 
        [
            pflanze.name,
            pflanze.substrat,
            pflanze.standort_licht,
            pflanze.bemerkungen,
            pflanze.kategorie_id,
            pflanze.giessen_id
        ], 
        (error, results) => {
        if(error){
            return res.status(500).json({
                message: 'Datenbankfehler'
            });
        }
        res.status(201).json({
            message: 'Pflanze erfolgreich erstellt',
            id: results.insertId
        })  
  })
};

export const putPflanzen = (req, res) =>{
    const id = req.params.id;
    const pflanze = req.body;
    const sql = 'UPDATE pflanzen SET name = ?, substrat = ?, standort_licht = ?, bemerkungen = ?,  kategorie_id = ?, giessen_id = ? WHERE id = ?';
    pool.query(sql, [
        pflanze.name,
        pflanze.substrat,
        pflanze.standort_licht,
        pflanze.bemerkungen,
        pflanze.kategorie_id,
        pflanze.giessen_id, 
        id
    ], (error, results) => {
        if(error){
            return res.status(500).json({
                message: 'Datenbankfehler'
            });
        }
        if(results.affectedRows === 0){
            return res.status(404).json({ message: 'Pflanze nicht gefunden'});
        }
        res.status(200).json({ message: 'Pflanze erfolgreich aktualisiert' });
    });
};

export const deletePflanzen = (req, res) => {
    const id = req.params.id;
    pool.query('DELETE FROM pflanzen WHERE id = ?',[id], (error, results) => {
        if(error){
            return res.status(500).json({
                message: 'Datenbankfehler'
            });
        }
        if(results.affectedRows === 0){
            return res.status(404).json({ message: 'Pflanze nicht gefunden'});
        }
        res.status(200).json({ message: 'gelöscht' });
    });
};