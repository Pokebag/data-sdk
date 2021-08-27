function sort(versionA, versionB) {
	const VERSION_ARRAY_A = versionA.split('.')
	const VERSION_ARRAY_B = versionB.split('.')

	const V_A = Number(VERSION_ARRAY_A.shift())
	const V_B = Number(VERSION_ARRAY_B.shift())

	if (V_A > V_B) return 1

	if (V_A < V_B) return -1

	if (!VERSION_ARRAY_A.length && !VERSION_ARRAY_B.length) return 0

	return sort(VERSION_ARRAY_A.join('.'), VERSION_ARRAY_B.join('.'))
}

/**
 * Given a list of version strings, returns a sorted copy of the original list.
 *
 * @param {string[]} versions A list of versions to be sorted
 *
 * @returns {string[]} A sorted copy of the original version list
 */
export function sortVersions(versions) {
	return [...versions].sort(sort)
}
