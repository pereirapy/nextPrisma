import { tgver07 } from '@prisma/client';
import prisma from 'packages/database/prisma';

export const getVersions = async () => {
	try {
		const versions = await prisma.tgver07.findMany({
			where: {
				versioncode: {
					not: null,
				},
			},
			orderBy: {yearlauched: 'desc'}
		});
		return { versions };
	} catch (error) {
		return { error };
	}
};

export const getVersion = async (versioncode: string) => {
	try {
		const version = await prisma.tgver07.findFirst({
			where: {
				versioncode,
			},
		});
		return { version };
	} catch (error) {
		return { error };
	}
};

export const deleteVersionById = async (versioncode: string) => {
	try {
		const version = await prisma.tgver07.delete({
			where: { versioncode },
		});
		return { version };
	} catch (error) {
		return { error };
	}
};

export const createVersion = async (data: tgver07) => {
	try {
		const version = await prisma.tgver07.create({
			data,
		});
		return { version };
	} catch (error) {
		return { error };
	}
};

export const updateVersionById = async (
	data: tgver07,
	versioncode: string
) => {
	try {
		const version = await prisma.tgver07.update({
			where: { versioncode },
			data,
		});
		return { version };
	} catch (error) {
		return { error };
	}
};
