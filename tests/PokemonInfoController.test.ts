import axios from 'axios';
import {Request, Response} from 'express';
import {PokeAPIResponse, PokemonInfo} from '../src/interfaces';
import {getPokemonInfo} from "../src/controllers/PokemonInfoController";

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

    describe('getPokemonInfo', () => {
        it('should return Pokemon info for a valid name', async () => {
            req.params = {name: 'pikachu'};

            const mockPokemonData: PokeAPIResponse = {
                name: 'pikachu',
                flavor_text_entries: [
                    {flavor_text: 'A yellow mouse.', language: {name: 'en'}}
                ],
                habitat: {name: 'forest'},
                is_legendary: false,
            };

            mockedAxios.get.mockResolvedValue({data: mockPokemonData});

            await getPokemonInfo(req as Request, res as Response);

            const expectedResponse: PokemonInfo = {
                name: 'pikachu',
                description: 'A yellow mouse.',
                habitat: 'forest',
                is_legendary: false
            };

            expect(res.json).toHaveBeenCalledWith(expectedResponse);
        });

        it('should return 404 for an invalid name', async () => {
            req.params = {name: 'invalid'};

            mockedAxios.get.mockRejectedValue({response: {status: 404}});

            await getPokemonInfo(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({error: 'Pokemon not found'});
        });
    });


});
