import {Request, Response} from "express";
import {fetchPokemonData} from "../services/InfoService";
import {PokemonInfo} from "../interfaces";


/**
 * Description: This function after fetching the results from the Info API returns a PokemonInfo object.
 * @param req
 * @param res
 */
export const getPokemonInfo = async (req: Request, res: Response) => {
    try {
        const {name} = req.params;
        const data = await fetchPokemonData(name);

        const description = data.flavor_text_entries.find(entry => entry.language.name === 'en')?.flavor_text || 'No description available';

        const pokemonInfo: PokemonInfo = {
            name: data.name,
            description,
            habitat: data.habitat.name,
            is_legendary: data.is_legendary,
        };

        res.json(pokemonInfo);
    } catch (error: any) {
        res.status(404).json({error: error.message});
    }
};