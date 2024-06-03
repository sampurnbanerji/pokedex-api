import {PokeAPIResponse} from "../interfaces";
import {POKEAPI_URL} from "../utils/constants";
import axios from "axios";

/**
 * Description : This function take the name of the Pokemon as a parameter and fetches its information from the POKEAPI.
 * @param name
 */

export const fetchPokemonData = async (name: string): Promise<PokeAPIResponse> => {
    try {
        const response = await axios.get<PokeAPIResponse>(`${POKEAPI_URL}${name.toLowerCase()}`);
        return response.data;
    } catch (error: any) {
        if (error.response && error.response.status === 404) {
            throw new Error('Pokemon not found');
        }
        throw new Error('An error occurred while fetching Pokemon data');
    }
}




