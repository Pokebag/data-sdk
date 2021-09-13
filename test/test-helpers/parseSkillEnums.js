import { getEnums } from '../../src/api/index.js'

/**
 * Loops through an array of skills and parses enumerable properties into their
 * representative strings
 *
 * @param {Skill[]} skills
 */
export async function parseSkillEnums(skills) {
	const [
		pokemonSkillSlots,
		pokemonSkillTypes,
	] = await Promise.all([
		getEnums({ type: 'pokemon-skill-slot' }),
		getEnums({ type: 'pokemon-skill-type' }),
	])

	return skills.map(skill => {
		return {
			...skill,
			slot: pokemonSkillSlots[skill.slot],
			type: pokemonSkillTypes[skill.type],
		}
	})
}
