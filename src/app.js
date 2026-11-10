// import ... kann der Name selbstbestummen werden. Mit {} wird genaue Funktion importier

import express from 'express';
import pflanzenRoutes from './routes/pflanzen.routes.js';
import giessenRoutes from './routes/giessen.routes.js';
import kategorienRoutes from './routes/kategorie.routes.js';

const app = express();
app.use(express.json());

app.get('/health', (req, res) => {
    res.json({status: 'ok'})
});

app.use('/api/pflanzen', pflanzenRoutes);
app.use('/api/giessen', giessenRoutes);
app.use('/api/giessen', kategorienRoutes);

export default app;
