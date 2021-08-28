// Module imports
import { expect } from 'chai'





// Local imports
import {
	mockData,
	useMockFS,
} from './test-helpers/useMockFS.js'
import { getDirectory } from '../src/getDirectory.js'





// Constants
const DIRECTORIES_DATA = {}





describe('getDirectory', function () {
	useMockFS()

	before('Get Pokémon directory contents for each patch', async () => {
		let patchIndex = 0

		while(patchIndex < mockData.patches.length) {
			const PATCH = mockData.patches[patchIndex]

			DIRECTORIES_DATA[PATCH] = await getDirectory('pokemon', PATCH)

			patchIndex += 1
		}
	})

	it('is a function', () => {
		expect(getDirectory).to.be.a('function')
	})

	it('returns the latest data if no version is provided', async () => {
		const AVAILABLE_POKEMON = [
			'charizard',
			...mockData.pokemon,
		].map(item => `${item}.json`)
		const DIRECTORY_CONTENTS = await getDirectory('pokemon')

		expect(DIRECTORY_CONTENTS).to.have.members(AVAILABLE_POKEMON)
	})

	describe('for each patch', () => {
		mockData.patches.forEach((patch, patchIndex) => {
			describe(patch, () => {
				it('returns available Pokémon', () => {
					const AVAILABLE_POKEMON = [
						'charizard',
						...mockData.pokemon.slice(0, patchIndex + 1),
					].map(item => `${item}.json`)
					const PATCH_DIRECTORY_DATA = DIRECTORIES_DATA[patch]

					expect(PATCH_DIRECTORY_DATA).to.have.ordered.members(AVAILABLE_POKEMON)
				})

				it('doesn\'t return unavailable Pokémon', () => {
					const UNAVAILABLE_POKEMON = [
						'charizard',
						...mockData.pokemon.slice(patchIndex + 1),
					].map(item => `${item}.json`)
					const PATCH_DIRECTORY_DATA = DIRECTORIES_DATA[patch]

					expect(PATCH_DIRECTORY_DATA).to.not.have.ordered.members(UNAVAILABLE_POKEMON)
				})
			})
		})
	})
})
