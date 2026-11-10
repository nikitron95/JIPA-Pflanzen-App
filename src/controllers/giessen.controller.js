import pool from '../db.js';

export const getGiessen = (req, res) => {
    pool.query('SELECT * FROM giessen', (error, results) => {
        if(error){
            console.error(error);
            return res.status(500).json({
                message: 'Datenbankfehler'
            });
        }
        res.json(results);
    });
};

export const getGiessenById = (req, res) => {
    const id = req.params.id;
    pool.query('SELECT * FROM giessen WHERE id = ?', [id], (error, results) => {
        if(error){
            console.error(error);
            return res.status(500).json({
                message: 'Datenbankfehler'
            });
        }

        if(results.length === 0){
            return res.status(404).json({
                message: 'Giessangabe nicht gefunden'
            });
        }
        res.json(results[0]);
    })
};

export const postGiessen = (req, res) => {
    console.log('POST-Anfrage angekommen');
    const giessen = req.body;
    pool.query('INSERT INTO giessen (bezeichnung, intervall_tage, beschreibung) VALUES (?, ?, ?)', 
        [
            giessen.bezeichnung,
            giessen.intervall_tage,
            giessen.beschreibung,
        ], 
        (error, results) => {
        if(error){
            return res.status(500).json({
                message: 'Datenbankfehler'
            });
        }
        res.status(201).json({
            message: 'Giessangabe erfolgreich erstellt',
            id: results.insertId
        })  
  })
};

export const putGiessen = (req, res) =>{
    const id = req.params.id;
    const giessen = req.body;
    const sql = 'UPDATE giessen SET bezeichnung = ?, intervall_tage = ?, beschreibung = ?  WHERE id = ?';
    pool.query(sql, [
        giessen.bezeichnung,
        giessen.intervall_tage,
        giessen.beschreibung,
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

export const deleteGiessen = (req, res) => {
    const id = req.params.id;
    pool.query('DELETE FROM giessen WHERE id = ?',[id], (error, results) => {
        if(error){
            return res.status(500).json({
                message: 'Datenbankfehler'
            });
        }
        if(results.affectedRows === 0){
            return res.status(404).json({ message: 'Giessangaben nicht gefunden'});
        }
        res.status(200).json({ message: 'gelöscht' });
    });
};