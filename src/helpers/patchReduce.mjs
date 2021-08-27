export async function patchReduce(patches, reducer, accumulator) {
	for (let index = 0; index < patches.length; index += 1) {
		accumulator = await reducer(accumulator, patches[index])
	}

	return accumulator
}
