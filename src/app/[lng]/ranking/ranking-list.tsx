import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { Dictionary } from '@/types/app';
import { RankingWithCoach } from '@/types/tcoachp05';
import { UserDataSession } from '@/types/user';
import { H3 } from '@/components/ui/typographies';

type RankingListProps = {
	dictionary: Dictionary;
	currentUser?: UserDataSession;
} & (
	| {
			data: RankingWithCoach[];
			error?: unknown;
	  }
	| {
			data?: RankingWithCoach[];
			error: unknown;
	  }
);
export default function RankingList({
	dictionary,
	currentUser,
	data,
	error,
}: RankingListProps) {
	return (
		<div>
			{error ? (
				<div>{String(error)}</div>
			) : (
				<Table>
					<TableCaption>{dictionary.rankingPage.tableCaption}</TableCaption>
					<TableHeader>
						<TableRow>
							<TableHead>{dictionary.rankingPage.position}</TableHead>
							<TableHead className="w-[200px]">{dictionary.rankingPage.coach}</TableHead>
							<TableHead>{dictionary.rankingPage.rankingPosition}</TableHead>
							<TableHead>{dictionary.rankingPage.teamName}</TableHead>
							<TableHead>{dictionary.rankingPage.points}</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
					{!data || data.length === 0 ? (
							<TableRow>
								<TableCell colSpan={4} className='text-center'>
									<H3>{dictionary.common.noData}</H3>
								</TableCell>
							</TableRow>
						) : (
							data.map((item, index) => (
								<TableRow
									key={item.coachId}
									className={`${
										currentUser?.coachId === item.coachId
											? 'bg-red-300'
											: ''
									}`}>
									<TableCell>{index + 1}</TableCell>
									<TableCell className="font-medium">
										{item.coachName}
									</TableCell>
									<TableCell>{item.rankingPosition}</TableCell>
									<TableCell>{item.teamName}</TableCell>
									<TableCell>{item.points}</TableCell>
								</TableRow>
							))
						)}
					</TableBody>
				</Table>
			)}
		</div>
	);
}
