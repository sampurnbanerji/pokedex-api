import express from 'express';
import { getPokemonInfo, getTranslatedPokemonInfo } from './pokemonController';

const app = express();
const port = process.env.PORT || 3000;

app.get('/pokemon/:name', getPokemonInfo);
app.get('/pokemon/translated/:name', getTranslatedPokemonInfo);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
