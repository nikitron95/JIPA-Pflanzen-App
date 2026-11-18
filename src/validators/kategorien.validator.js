import {body, validationResult} from 'express-validator';

export const validateKategorie = [
    body('name')
        .isString()
        .withMessage('Name muss ein Text sein')
        .bail()
        .trim()
        .notEmpty()
        .withMessage('Name darf nicht leer sein'),

    body('beschreibung')
        .isString()
        .withMessage('Beschreibung muss ein Text sein')
        .bail()
        .trim()
        .notEmpty()
        .withMessage('Beschreibung darf nicht leer sein'),

    (req, res, next) => {
        const errors = validationResult(req); //fehler holen

        if (!errors.isEmpty()) {
            
            return res.status(400).json({

                errors: errors.array().map(error => ({
                    
                    feld: error.path,
                    
                    fehler: error.msg
                }))
            });
        }
        next();
    }

];