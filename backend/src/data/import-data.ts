import { readFileSync } from 'fs';

import { prisma } from './postgres';

const petMockData = JSON.parse(
	readFileSync(`${__dirname}/pets-mock-data.json`, 'utf-8')
);
const shelterMockData = JSON.parse(
	readFileSync(`${__dirname}/shelter-mock-data.json`, 'utf-8')
);

const loadPetData = async () => {
	try {
		await prisma.pet.createMany({
			data: petMockData,
			skipDuplicates: true,
		});
		console.log('pet mock data successfully loaded! 😃✨');
	} catch (error) {
		console.log(error);
	}
};

const loadShelterData = async () => {
	try {
		await prisma.shelter.createMany({
			data: shelterMockData,
			skipDuplicates: true,
		});
		console.log('shelter mock data successfully loaded! 😃✨');
	} catch (error) {
		console.log(error);
	}
};

const deletePetData = async () => {
	try {
		await prisma.application.deleteMany();
		await prisma.pet.deleteMany();
		console.log('Pet Data Successfully Deleted!🙀');
	} catch (error) {
		console.log(error);
	}
};
const deleteShelterData = async () => {
	try {
		await prisma.shelter.deleteMany();
		console.log('Shelter Data Successfully Deleted!🙀');
	} catch (error) {
		console.log(error);
	}
};

(async () => {
	await deletePetData();
	await deleteShelterData();

	await loadShelterData();
	await loadPetData();
})();
// deletePetData();
// deleteShelterData();

// loadShelterData();
// loadPetData();
