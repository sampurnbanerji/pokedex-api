# Pokémon API

This project implements two REST endpoints for retrieving and translating Pokémon information using the PokeAPI and
FunTranslations API. It is built with Node.js and TypeScript, ensuring type safety and maintainability.

## Features

1. **Get Pokémon Info**: Fetches Pokémon information, including name, description, habitat, and legendary status.
2. **Get Translated Pokémon Info**: Fetches the same information as the first endpoint but translates the description
   using FunTranslations API based on certain conditions.

## Endpoints

1. **Get Pokémon Info**

   **GET** `/api/pokemon/:name`

    - **Parameters**: `name` (string) - The name of the Pokémon.
    - **Response**: JSON object containing:
        - `name`: The Pokémon's name.
        - `description`: The first English flavor text.
        - `habitat`: The Pokémon's habitat.
        - `is_legendary`: Boolean indicating if the Pokémon is legendary.

2. **Get Translated Pokémon Info**

   **GET** `/api/pokemon/translated/:name`

    - **Parameters**: `name` (string) - The name of the Pokémon.
    - **Response**: JSON object containing:
        - `name`: The Pokémon's name.
        - `description`: The translated description.
        - `habitat`: The Pokémon's habitat.
        - `is_legendary`: Boolean indicating if the Pokémon is legendary.
        - `translation_type`: The type of translation applied ('yoda' or 'shakespeare').

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/pokemon-api.git
   cd pokemon-api

2. Install dependencies:
    ```bash
    npm install

3. Run the server:
    ```bash
   npm start
4. Run the tests:
   ```bash
    npm test

## Code Structure

- `src/`
    - app.ts: Initializes the Express application.
      - `controllers`
        - PokemonInfoController.ts: Contains the logic for handling requests for getting the info of the Pokemon.
        - TranslatedPokemonInfoController.ts: Contains the logic for handling requests for getting the translated info of the Pokemon.
      - `services`
         - InfoService.ts: Contains the logic for calling the external info api to fetch the Pokemon Info.
         - TranslationService.ts: Contains the logic for calling the external translated info api to fetch the  translated Pokemon Info.
      - `routes`
         - router.ts: Contains the configured endpoints for the application.
      - `utils`
         - constants.ts: Defines the constants required in the application globally.
    - interfaces.ts: Defines TypeScript interfaces for type safety.
- `tests/`
    - PokemonInfoController.test.ts: Contains unit tests for the pokemon info controller functions.
    - TranslatedPokemonInfoController.test.ts: Contains unit tests for the translated pokemon info controller functions.

## Tradeoffs and Considerations

1. Error Handling:
    - The error handling is basic and returns a generic error message for most issues. This keeps the code simple but could
  be improved by providing more specific error messages.
2. API Limitations:
    - The FunTranslations API has rate limits, which are not handled in the current implementation. In a production
      environment, we would need to handle rate limiting gracefully.
3. API Security: 
    - API authentication and security should be considered if the code needs to production ready.
4. Logs and Monitoring: 
    - Logging and monitoring tools should be added to make it easier to debug and monitor. For example New Relic, DataDog etc.  
5. Caching
    - There is no caching implemented. Fetching data from PokeAPI and FunTranslations API for each request can be slow
      and increases the load on these services. Implementing caching would improve performance.
6. Scalability:
    - The current implementation is suitable for small to moderate loads. For higher loads, we would need to consider
      more robust error handling, retry mechanisms, and better resource management.
7. Testing:
    - The tests mock external API calls to ensure they do not depend on actual API responses. While this is good for
      unit testing, integration tests with actual API calls could also be beneficial.
8. Extensibility:
    - The code is designed to be extendable. Adding new endpoints or modifying existing ones is straightforward.
      However, more complex business logic might require restructuring the code for better separation of concerns.
9. Infrastructure as Code:
   - This project does not include Infrastructure as Code (IaC) configurations. In a production environment, using tools like Terraform, AWS CloudFormation, or Docker Compose would help automate and manage infrastructure provisioning and deployment. Implementing IaC ensures consistency across environments and enables easy scaling and maintenance. However, it adds an initial overhead in setting up the infrastructure scripts and requires knowledge of the IaC tools.
10. Code Configuration: 
    - Code can be re-structured based on different design principles like SOLID, MVC, etc.  

## Conclusion

This project demonstrates how to build a RESTful API with Node.js and TypeScript, integrating with external APIs and
handling data transformations. The emphasis is on clean, maintainable code with proper type safety and testing. Future
improvements could focus on better error handling, caching, and handling API rate limits.
 


