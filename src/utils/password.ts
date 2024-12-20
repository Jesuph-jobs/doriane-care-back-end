import generator from 'generate-password';

export const generatePassword = () => {
	return generator.generate({
		length: 10,
		numbers: true,
		symbols: true,
		uppercase: true,
		lowercase: true,
	});
};
