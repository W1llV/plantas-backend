const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

const TREFLE_TOKEN = 'VMuGl0hlhtLDZ7eNynk5Iz3dEbJpWG3ZCviMkWJd4gY';
const UNSPLASH_ACCESS_KEY = 'x5EPfC9Q1W8WZJHhos1apqT_Jl9zzRxsx4JnzLTvI7k';

app.use(cors());

// Obtener listado de plantas (paginado)
app.get('/get-plants', async (req, res) => {
    const page = req.query.page || 1;
    try {
        const response = await axios.get(`https://trefle.io/api/v1/plants?page=${page}&token=${TREFLE_TOKEN}`);
        res.json(response.data);
    } catch (error) {
        console.error('Error al obtener datos de Trefle:', error.message);
        res.status(500).json({ error: 'Error al obtener plantas.' });
    }
});

// Obtener detalle de planta por ID
app.get('/get-plants/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const response = await axios.get(`https://trefle.io/api/v1/plants/${id}?token=${TREFLE_TOKEN}`);
        res.json(response.data.data);
    } catch (error) {
        console.error(`Error al obtener planta con ID ${id}:`, error.message);
        res.status(500).json({ error: `Error al obtener planta con ID ${id}.` });
    }
});

// Obtener imágenes desde Unsplash
app.get('/get-images', async (req, res) => {
    const query = req.query.query || 'plant';
    try {
        const response = await axios.get(`https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&client_id=${UNSPLASH_ACCESS_KEY}`);
        res.json(response.data);
    } catch (error) {
        console.error('Error al obtener imágenes de Unsplash:', error.message);
        res.status(500).json({ error: 'Error al obtener imágenes.' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor backend corriendo en el puerto ${PORT}`);
});
