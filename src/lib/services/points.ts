import { tcoachgpt03 } from '@prisma/client';
import prisma from 'packages/database/prisma';

export const getPoints = async () => {
	try {
		const points = await prisma.tcoachgpt03.findMany({
			where: {
				points: {
					gt: 0,
				},
			},
			orderBy: { points: 'desc' },
			take: 50,
		});
		return { points };
	} catch (error) {
		return { error };
	}
};

export const getPointsByCoach = async (coachId?: number) => {
	try {
		if (!coachId) return { error: 'no_coachId' };
		const points = await prisma.tcoachgpt03.findMany({
			where: {
				coachId: Number(coachId),
			},
			orderBy: { points: 'desc' },
		});
		return { points };
	} catch (error) {
		return { error };
	}
};

export const deletePointByCoach = async (coachId?: string) => {
	try {
		if (!coachId) return { error: 'no_coachId' };

		const points = await prisma.tcoachgpt03.deleteMany({
			where: { coachId: Number(coachId) },
		});
		return { points };
	} catch (error) {
		return { error };
	}
};

export const createPoint = async (data: tcoachgpt03) => {
	try {
		const point = await prisma.tcoachgpt03.create({
			data,
		});
		return { point };
	} catch (error) {
		return { error };
	}
};

export const updatePointByCoach = async (
	data: tcoachgpt03,
	coachgameId: string,
	coachId?: string,
) => {
	try {
		if (!coachId) return { error: 'no_coachId' };
		const point = await prisma.tcoachgpt03.updateMany({
			where: {
				coachId: Number(coachId),
				coachgameId: Number(coachgameId),
			},
			data,
		});
		return { point };
	} catch (error) {
		return { error };
	}
};
