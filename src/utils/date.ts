export const getAgeFromBirthYear = (
	birthYear: number,
	now: Date = new Date(),
): number => now.getFullYear() - birthYear

export const getYearsSinceYear = (
	startYear: number,
	now: Date = new Date(),
): number => now.getFullYear() - startYear
