import {Router} from 'express';
import {getPokemonInfo} from "../controllers/PokemonInfoController";
import {getTranslatedPokemonInfo} from "../controllers/TranslatedPokemonInfoController";

const router = Router();

router.get('/pokemon/:name', getPokemonInfo);
router.get('/pokemon/translated/:name', getTranslatedPokemonInfo);

export default router;
