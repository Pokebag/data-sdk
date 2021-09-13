// Module imports
import { expect } from 'chai'





// Local imports
import {
	mockData,
	useMockFS,
} from './test-helpers/useMockFS.js'
import { parseSkillEnums } from './test-helpers/parseSkillEnums.js'
import { getSkills } from '../src/getSkills.js'





describe('getSkills', function () {
	useMockFS()

	it('is a function', () => {
		expect(getSkills).to.be.a('function')
	})

	describe('with no options', () => {
		it('returns all skills', async () => {
			const SKILLS_ARRAY = await parseSkillEnums(Object.values(mockData.skills))
			const RESPONSE = await getSkills()

			expect(RESPONSE).to.deep.equal(SKILLS_ARRAY)
		})
	})

	describe('with valid arguments', () => {
		describe('options.ids', () => {
			it('given an array of skill IDs, returns each skill in the array', async () => {
				const SKILL_IDS = ['crustle-attack', 'garchomp-dig']
				const SKILL_DATA = await parseSkillEnums(SKILL_IDS.map(id => mockData.skills[id]))
				const RESPONSE = await getSkills({ ids: SKILL_IDS })

				expect(RESPONSE).to.be.an('array')
				RESPONSE.forEach((item, index) => {
					expect(item).to.deep.equal(SKILL_DATA[index])
				})
			})
		})

		describe('options.parseEnums', () => {
			it('given true, returns each skill with enumerable properties parsed to their string values', async () => {
				const RESPONSE = await getSkills({ parseEnums: true })

				RESPONSE.forEach((item, index) => {
					const SKILL_ID = mockData.skillIDs[index]
					const SKILL_DATA = mockData.skills[SKILL_ID]
					const ENUMERATED_SLOT = mockData.enums['pokemon-skill-slot'][SKILL_DATA.slot]
					const ENUMERATED_TYPE = mockData.enums['pokemon-skill-type'][SKILL_DATA.type]
					expect(item.slot).to.equal(ENUMERATED_SLOT)
					expect(item.type).to.equal(ENUMERATED_TYPE)
				})
			})

			it('given false, returns each skill without parsing enumerable properties', async () => {
				const RESPONSE = await getSkills({ parseEnums: false })

				RESPONSE.forEach((item, index) => {
					const SKILL_ID = mockData.skillIDs[index]
					const SKILL_DATA = mockData.skills[SKILL_ID]
					expect(item.slot).to.equal(SKILL_DATA.slot)
					expect(item.type).to.equal(SKILL_DATA.type)
				})
			})
		})

		describe('options.pokemonIDs', () => {
			it('given an array of Pokémon IDs, returns only skills that belong to the listed Pokémon', async () => {
				const POKEMON_IDS = ['crustle', 'garchomp']
				const SKILL_DATA = await parseSkillEnums(Object.entries(mockData.skills)
					.filter(([skillID]) => {
						return POKEMON_IDS.some(pokemonID => {
							return skillID.startsWith(pokemonID)
						})
					})
					.map(([_, skillData]) => skillData))
				const RESPONSE = await getSkills({
					pokemonIDs: POKEMON_IDS,
				})

				expect(RESPONSE).to.be.an('array')

				SKILL_DATA.forEach(skill => {
					expect(RESPONSE).to.deep.include(skill)
				})
			})
		})
	})

	describe('with invalid arguments', () => {
		describe('given an invalid options type', () => {
			it('throws an error', async () => {
				const errorStuff = [TypeError, 'options must be an object']

				// @ts-ignore
				expect(getSkills(null)).to.eventually.throw(...errorStuff)
				// @ts-ignore
				expect(getSkills([])).to.eventually.throw(...errorStuff)
				// @ts-ignore
				expect(getSkills(12345)).to.eventually.throw(...errorStuff)
				// @ts-ignore
				expect(getSkills('mr-mime')).to.eventually.throw(...errorStuff)
			})
		})

		describe('given an object', () => {
			describe('options.pokemonIDs', () => {
				describe('given `null` as pokemonIDs', () => {
					it('throws an error', async () => {
						expect(getSkills({
							pokemonIDs: ['crustle', 'garchomp'],
						})).to.eventually.throw(TypeError, 'options must be an object')
					})
				})
			})
		})
	})
})
