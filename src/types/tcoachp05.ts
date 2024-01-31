import { tcoach02, tcoachrk06 } from '@prisma/client';

interface IRankingWithCoach extends tcoachrk06 {
  tcoach02: tcoach02;
}

export type RankingWithCoach = IRankingWithCoach;
