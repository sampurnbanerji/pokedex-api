// Interface for the PokeAPI response
export interface PokeAPIResponse {
    name: string;
    flavor_text_entries: {
        flavor_text: string;
        language: { name: string };
    }[];
    habitat: { name: string };
    is_legendary: boolean;
}

// Interface for the FunTranslations API response
export interface FunTranslationsResponse {
    contents: {
        translated: string;
    };
}

// Interface for the Pokemon Info
export interface PokemonInfo {
    name: string;
    description: string;
    habitat: string;
    is_legendary: boolean;
}

// Interface for the Translated Pokemon Info
export interface TranslatedPokemonInfo extends PokemonInfo {
    translation_type: string;
}
