import {FunTranslationsResponse} from "../interfaces";
import {FUN_TRANSLATIONS_URL} from "../utils/constants";
import axios from "axios";


/**
 * Description : This function take the desciptiona and translation type of the Pokemon as a parameter and
 * fetches its information based on the translation type from the FUN_TRANSLATIONS_URL API.
 * @param text
 * @param translationType
 */
export const fetchTranslation = async (text: string, translationType: string): Promise<string> => {
    try {
        const response = await axios.post<FunTranslationsResponse>(`${FUN_TRANSLATIONS_URL}/${translationType}`, {
            text,
        });
        return response.data.contents.translated;
    } catch (error: any) {
        throw new Error('Translation service error');
    }
}

