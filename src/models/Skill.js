/**
 * A Pokémon's special ability
 *
 * @typedef {Object} Skill
 * @property {number} cooldown The amount of time the ability requires to recharge after use
 * @property {string} description A description of the ability
 * @property {string} displayName The display name of the ability
 * @property {string} id The skill's ID, prefixed by the name of the Pokémon to whom the skill belongs
 * @property {string} pokemonID The ID of the Pokémon to whom the skill belongs
 * @property {string[]} requires A list of requirements that must be met for a Pokémon to be allowed to have the skill
 * @property {RSB} [rsb] The RSB associated with this skill
 * @property {number} slot The slot in which this ability can be set
 * @property {number} type The attack category of this skill
 */
