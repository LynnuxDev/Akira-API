# Akira Api

Welcome to the **LynnuxDev API**, the central hub for various services and features provided by LynnuxDev. This API currently includes mainly public endpoints for roleplay actions, with potential expansions for more functionality in the future.

## Overview

This API is designed to provide decently scalable endpoints for our services.

## Current Public Endpoints

### Roleplay

The `/akira/roleplay/<action>` endpoint provides access to roleplay-related GIFs, such as "bonk," "blush," and more.

- Base URL: `https://api.lynnux.xyz/akira/roleplay/<action>`
- Available Actions: `bonk, blush, bite, etc.`
- Response Format:

  ```json
  {
    "embed": {
      "title": "bonk-gif.gif",
      "description": "A gif provided by LynnuxDev!",
      "image": {
        "url": "https://cdn.lynnux.xyz/gifs/roleplay/bonk/RyyImNjQ_o.gif"
      }
    }
  }
  ```

### Error Handling

If an invalid action is requested, the API will return:

```json
{
  "error": "Action not found. Please check the available roleplay actions."
}
```

## Transparency

This API is developed and maintained by [LynnuxDev].
While the source code is visible for transparency, it is not intended for external installation.

## Future Plans

We plan to expand this API with additional endpoints and features.

## License

  This project is licensed under the [BSD 4-Clause "Original" License](./LICENSE).

[LynnuxDev]: https://github.com/LynnuxDev
