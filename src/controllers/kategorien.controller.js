import pool from '../db.js';

export const getKategorien = (req, res) => {
    pool.query('SELECT * FROM kategorien', (error, results) => {
        if(error){
            console.error(error);
            return res.status(500).json({
                message: 'Datenbankfehler'
            });
        }
        res.json(results);
    });
};

export const getKategorienById = (req, res) => {
    const id = req.params.id;
    pool.query('SELECT * FROM kategorien WHERE id = ?', [id], (error, results) => {
        if(error){
            console.error(error);
            return res.status(500).json({
                message: 'Datenbankfehler'
            });
        }

        if(results.length === 0){
            return res.status(404).json({
                message: 'Kategorie nicht gefunden'
            });
        }
        res.json(results[0]);
    })
};

export const postKategorien = (req, res) => {
    console.log('POST-Anfrage angekommen');
    const kategorien = req.body;
    pool.query('INSERT INTO kategorien (name, beschreibung) VALUES (?, ?)', 
        [
            kategorien.name,
            kategorien.beschreibung
        ], 
        (error, results) => {
        if(error){
            return res.status(500).json({
                message: 'Datenbankfehler'
            });
        }
        res.status(201).json({
            message: 'Kategorie erfolgreich erstellt',
            id: results.insertId
            //id selbstgewählter propertyname
        })  
  })
};

export const putKategorien = (req, res) =>{
    const id = req.params.id;
    const kategorien = req.body;

    const sql = 'UPDATE kategorien SET name = ?, beschreibung = ? WHERE id = ?';
    pool.query(sql, [
        kategorien.name,
        kategorien.beschreibung,
        id
    ], (error, results) => {
        if(error){
            return res.status(500).json({
                message: 'Datenbankfehler'
            });
        }
        if(results.affectedRows === 0){
            return res.status(404).json({ message: 'Giessangabe nicht gefunden'});
        }
        res.status(200).json({ message: 'Giessangabe erfolgreich aktualisiert' });
    });
};

export const deleteKategorien = (req, res) => {
    const id = req.params.id;
    pool.query('DELETE FROM giessen WHERE id = ?',[id], (error, results) => {
        if(error){
            return res.status(500).json({
                message: 'Datenbankfehler'
            });
        }
        if(results.affectedRows === 0){
            return res.status(404).json({ message: 'Kategorie nicht gefunden'});
        }
        res.status(200).json({ message: 'gelöscht' });
    });
};