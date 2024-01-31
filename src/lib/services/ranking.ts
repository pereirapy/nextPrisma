import { tcoachp05 } from '@prisma/client';
import prisma from 'packages/database/prisma';

export const getRankings = async () => {
  try {
    const rankings = await prisma.tcoachrk06.findMany({
      where: {
        points: {
          gt: 0,
        },
      },
      orderBy: { points: 'desc' },
      take: 50,
      include: {
        tcoach02: true,
      },
    });
    return { rankings };
  } catch (error) {
    return { error };
  }
};

export const getRanking = async (coachId: string) => {
  try {
    const ranking = await prisma.tcoachp05.findFirst({
      where: {
        coachId: Number(coachId),
      },
    });
    return { ranking };
  } catch (error) {
    return { error };
  }
};

export const deleteRankingById = async (coachId: string) => {
  try {
    const ranking = await prisma.tcoachp05.delete({
      where: { coachId: Number(coachId) },
    });
    return { ranking };
  } catch (error) {
    return { error };
  }
};

export const createRanking = async (data: tcoachp05) => {
  try {
    const ranking = await prisma.tcoachp05.create({
      data,
    });
    return { ranking };
  } catch (error) {
    return { error };
  }
};

export const updateRankingById = async (data: tcoachp05, coachId: string) => {
  try {
    const ranking = await prisma.tcoachp05.update({
      where: { coachId: Number(coachId) },
      data,
    });
    return { ranking };
  } catch (error) {
    return { error };
  }
};
