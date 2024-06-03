import {FunTranslationsResponse, PokeAPIResponse, TranslatedPokemonInfo} from "../src/interfaces";
import {getTranslatedPokemonInfo} from "../src/controllers/TranslatedPokemonInfoController";
import {Request, Response} from "express";
import axios from "axios";

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Pokemon Controller', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let jsonMock: jest.Mock;

    beforeEach(() => {
        req = {};
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        jsonMock = res.json as jest.Mock;
    });

    afterEach(() => {
        jest.clearAllMocks();
    });
    describe('getTranslatedPokemonInfo', () => {
        it('should return translated Pokemon info with Shakespeare translation', async () => {
            req.params = {name: 'pikachu'};

            const mockPokemonData: PokeAPIResponse = {
                name: 'pikachu',
                flavor_text_entries: [
                    {flavor_text: 'A yellow mouse.', language: {name: 'en'}}
                ],
                habitat: {name: 'forest'},
                is_legendary: false,
            };

            const mockTranslationData: FunTranslationsResponse = {
                contents: {
                    translated: 'A yellow mouse, verily.'
                }
            };

            mockedAxios.get.mockResolvedValue({data: mockPokemonData});
            mockedAxios.post.mockResolvedValue({data: mockTranslationData});

            await getTranslatedPokemonInfo(req as Request, res as Response);

            const expectedResponse: TranslatedPokemonInfo = {
                name: 'pikachu',
                description: 'A yellow mouse, verily.',
                habitat: 'forest',
                is_legendary: false,
                translation_type: 'shakespeare'
            };

            expect(res.json).toHaveBeenCalledWith(expectedResponse);
        });

        it('should return translated Pokemon info with Yoda translation for legendary Pokemon', async () => {
            req.params = {name: 'mewtwo'};

            const mockPokemonData: PokeAPIResponse = {
                name: 'mewtwo',
                flavor_text_entries: [
                    {flavor_text: 'A psychic Pokemon.', language: {name: 'en'}}
                ],
                habitat: {name: 'rare'},
                is_legendary: true,
            };

            const mockTranslationData: FunTranslationsResponse = {
                contents: {
                    translated: 'A psychic Pokemon, it is.'
                }
            };

            mockedAxios.get.mockResolvedValue({data: mockPokemonData});
            mockedAxios.post.mockResolvedValue({data: mockTranslationData});

            await getTranslatedPokemonInfo(req as Request, res as Response);

            const expectedResponse: TranslatedPokemonInfo = {
                name: 'mewtwo',
                description: 'A psychic Pokemon, it is.',
                habitat: 'rare',
                is_legendary: true,
                translation_type: 'yoda'
            };

            expect(res.json).toHaveBeenCalledWith(expectedResponse);
        });

        it('should return 404 for an invalid name', async () => {
            req.params = {name: 'invalid'};

            mockedAxios.get.mockRejectedValue({response: {status: 404}});

            await getTranslatedPokemonInfo(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({error: 'Pokemon not found'});
        });
    });
});