import { Request, Response } from 'express';
import axios from 'axios';
import { PokeAPIResponse, FunTranslationsResponse, PokemonInfo, TranslatedPokemonInfo } from './interfaces';

//note these should be moved to either env or database depending on the requirement to make it production ready.
const POKEAPI_URL = 'https://pokeapi.co/api/v2/pokemon-species/';
const FUN_TRANSLATIONS_URL = 'https://api.funtranslations.com/translate';

/**
 * Description : This function take the name of the Pokemon as a parameter and fetches its information from the POKEAPI.
 * @param name
 */
const fetchPokemonData = async (name: string): Promise<PokeAPIResponse> => {
    try {
        const response = await axios.get<PokeAPIResponse>(`${POKEAPI_URL}${name.toLowerCase()}`);
        return response.data;
    } catch (error: any) {
        if (error.response && error.response.status === 404) {
            throw new Error('Pokemon not found');
        }
        throw new Error('An error occurred while fetching Pokemon data');
    }
};


/**
 * Description : This function take the desciptiona and translation type of the Pokemon as a parameter and
 * fetches its information based on the translation type from the FUN_TRANSLATIONS_URL API.
 * @param text
 * @param translationType
 */
const fetchTranslation = async (text: string, translationType: string): Promise<string> => {
    try {
        const response = await axios.post<FunTranslationsResponse>(`${FUN_TRANSLATIONS_URL}/${translationType}`, {
            text,
        });
        return response.data.contents.translated;
    } catch (error: any) {
        throw new Error('Translation service error');
    }
};


/**
 * Description: This function after fetching the results from the Info API returns a PokemonInfo object.
 * @param req
 * @param res
 */
export const getPokemonInfo = async (req: Request, res: Response) => {
    try {
        const { name } = req.params;
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
        res.status(404).json({ error: error.message });
    }
};


/**
 * Description: This function after fetching the results from the translation API returns a TranslatedPokemonInfo object which contains the translation type as well.
 * @param req
 * @param res
 */
export const getTranslatedPokemonInfo = async (req: Request, res: Response) => {
    try {
        const { name } = req.params;
        const data = await fetchPokemonData(name);

        const description = data.flavor_text_entries.find(entry => entry.language.name === 'en')?.flavor_text || 'No description available';
        let translationType = 'shakespeare';

        if (data.habitat.name === 'cave' || data.is_legendary) {
            translationType = 'yoda';
        }

        const translatedDescription = await fetchTranslation(description, translationType);

        const translatedPokemonInfo: TranslatedPokemonInfo = {
            name: data.name,
            description: translatedDescription,
            habitat: data.habitat.name,
            is_legendary: data.is_legendary,
            translation_type: translationType,
        };

        res.json(translatedPokemonInfo);
    } catch (error: any) {
        res.status(404).json({ error: error.message });
    }
};
