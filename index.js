import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url';

import apirouter from './router/api.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // Set the views directory

// Define a route to render the HTML file
app.get('/', (req, res) => {
    res.render('dashboard'); // Assuming you have a 'dashboard.ejs' file in the 'views' directory
});

app.use('/api', apirouter)
app.listen('8080', () => {
    console.log(`Online!`)
})

export default app