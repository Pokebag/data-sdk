// Local imports
import './Skill.js'





/**
 * Ratings for a Pokémon
 * @typedef {Object} PokemonRatings
 * @property {number} assistance
 * @property {number} combat
 * @property {number} mobility
 * @property {number} resistance
 * @property {number} scoring
 * @property {number} total
 */

/**
 * A held item
 * @typedef {Object} PokemonStat
 * @property {number} attack
 * @property {number} defense
 * @property {number} hp
 * @property {number} spAttack
 * @property {number} spDefense
 */

/**
 * An object containing the various tags for a Pokémon
 * @typedef {Object} PokemonTags
 * @property {number} range
 * @property {number} difficulty
 * @property {number} role
 */

/**
 * A held item
 * @typedef {Object} Pokemon
 * @property {string} displayName
 * @property {string} damageType
 * @property {PokemonTags} tags
 * @property {PokemonRatings} ratings
 * @property {Skill[]} skills
 * @property {PokemonStat[]} stats
 */
