import {Request, Response} from "express";
import {fetchPokemonData} from "../services/InfoService";
import {TranslatedPokemonInfo} from "../interfaces";
import {fetchTranslation} from "../services/TranslationService";

/**
 * Description: This function after fetching the results from the translation API returns a TranslatedPokemonInfo object which contains the translation type as well.
 * @param req
 * @param res
 */
export const getTranslatedPokemonInfo = async (req: Request, res: Response) => {
    try {
        const {name} = req.params;
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
        res.status(404).json({error: error.message});
    }
};
