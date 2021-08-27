/**
 * Async reducer for building a dataset result for a patch.
 *
 * @param {string[]} patches Array of patches to reduce
 * @param {(accumulator: any, currentPatch: string) => Promise<*> | *} reducer May be asynchronous
 * @param {*} accumulator
 *
 * @returns {Promise<*>} The compiled accumulator
 */
export async function patchReduce(patches, reducer, accumulator) {
	for (let index = 0; index < patches.length; index += 1) {
		accumulator = await reducer(accumulator, patches[index])
	}

	return accumulator
}
