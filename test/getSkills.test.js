// Module imports
import { expect } from 'chai'





// Local imports
import {
	mockData,
	useMockFS,
} from './test-helpers/useMockFS.js'
import { getSkills } from '../src/getSkills.js'





describe('getSkills', function () {
	useMockFS()

	it('is a function', () => {
		expect(getSkills).to.be.a('function')
	})

	describe('with no options', () => {
		it('returns all skills', async () => {
			const SKILLS_ARRAY = Object.values(mockData.skills)
			const RESPONSE = await getSkills()

			expect(RESPONSE).to.deep.equal(SKILLS_ARRAY)
		})
	})

	describe('with valid arguments', () => {
		describe('options.ids', () => {
			it('given an array of skill IDs, returns each skill in the array', async () => {
				const SKILL_IDS = ['crustle-attack', 'garchomp-dig']
				const SKILL_DATA = SKILL_IDS.map(id => mockData.skills[id])
				const RESPONSE = await getSkills({ ids: SKILL_IDS })

				expect(RESPONSE).to.be.an('array')
				RESPONSE.forEach((item, index) => {
					expect(item).to.deep.equal(SKILL_DATA[index])
				})
			})
		})

		xdescribe('options.patch', () => {
			it('given a patch version, returns only skills that would be available in that patch', async () => {
				// const POKEMON_IDS = ['crustle', 'zeraora']
				// const POKEMON_DATA = POKEMON_IDS.map(id => mockData.pokemon[id])
				// const RESPONSE = await getSkills({ ids: POKEMON_IDS })

				// expect(RESPONSE).to.be.an('array')
				// RESPONSE.forEach((item, index) => {
				// 	expect(item).to.deep.equal(POKEMON_DATA[index])
				// })
			})
		})
	})

	describe('with invalid arguments', () => {
		describe('given `null` as options', () => {
			it('throws an error', async () => {
				const errorStuff = [TypeError, 'options must be an object']

				// @ts-ignore
				expect(getSkills(null)).to.eventually.throw(...errorStuff)
			})
		})

		describe('given an array as options', () => {
			it('throws an error', async () => {
				const errorStuff = [TypeError, 'options must be an object']

				// @ts-ignore
				expect(getSkills([])).to.eventually.throw(...errorStuff)
			})
		})

		describe('given a number as options', () => {
			it('throws an error', async () => {
				const errorStuff = [TypeError, 'options must be an object']

				// @ts-ignore
				expect(getSkills(12345)).to.eventually.throw(...errorStuff)
			})
		})

		describe('given a string as options', () => {
			const errorStuff = [TypeError, 'options must be an object']

			it('throws an error', async () => {
				// @ts-ignore
				expect(getSkills('mr-mime')).to.eventually.throw(...errorStuff)
			})
		})
	})
})
