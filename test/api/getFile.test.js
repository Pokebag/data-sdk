// Module imports
import { expect } from 'chai'





// Local imports
import {
	mockData,
	useMockFS,
} from '../test-helpers/useMockFS.js'
import { getFile } from '../../src/api/getFile.js'





// Constants
const FILES_DATA = {}





describe('getFile', () => {
	useMockFS()

	before('Retrieve file data for all Pokémon in each patch', async () => {
		let patchIndex = 0

		while(patchIndex < mockData.patches.length) {
			const PATCH = mockData.patches[patchIndex]

			FILES_DATA[PATCH] = {}

			let pokemonIndex = 0

			while(pokemonIndex < mockData.pokemonIDs.length) {
				const POKEMON_ID = mockData.pokemonIDs[pokemonIndex]
				const POKEMON_DATUM = await getFile(`pokemon/${POKEMON_ID}.json`, PATCH)

				FILES_DATA[PATCH][POKEMON_ID] = POKEMON_DATUM

				pokemonIndex += 1
			}

			patchIndex += 1
		}
	})

	it('is a function', () => {
		expect(getFile).to.be.a('function')
	})

	describe('for each patch', () => {
		mockData.patches.forEach((patch, patchIndex) => {
			describe(patch, () => {
				describe('for each Pokémon', () => {
					mockData.pokemonIDs.forEach((pokemonID, pokemonIndex) => {
						describe(pokemonID, () => {
							if (pokemonIndex <= (patchIndex + 1)) {
								it('has the correct stats', () => {
									const POKEMON_DATUM = FILES_DATA[patch][pokemonID]
									expect(POKEMON_DATUM).to.deep.equal(mockData.pokemon[pokemonID])
								})
							} else {
								it('doesn\'t exist', () => {
									const POKEMON_DATUM = FILES_DATA[patch][pokemonID]
									expect(POKEMON_DATUM).to.be.null
								})
							}
						})
					})
				})
			})
		})
	})
})
