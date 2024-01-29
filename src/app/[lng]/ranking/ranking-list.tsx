import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { Locale } from '@/app/i18n/settings';
import { Dictionary } from '@/types/app';
import { RankingWithCoach } from '@/types/tcoachp05';
import { UserDataSession } from '@/types/user';

type RankingListProps = {
	dictionary: Dictionary;
	currentLanguage: Locale;
	currentUser?: UserDataSession;
} & (
	| {
			data: RankingWithCoach[];
			error?: string;
	  }
	| {
			data?: RankingWithCoach[];
			error: string;
	  }
);
export default function RankingList({
	dictionary,
	currentLanguage,
	currentUser,
	data,
	error,
}: RankingListProps) {

	

	return (
		<div>
			{error ? (
				<div>{error}</div>
			) : (
				data && (
					<Table>
						<TableCaption>Ranking Mundial</TableCaption>
						<TableHeader>
							<TableRow>
								<TableHead>Position</TableHead>
								<TableHead className="w-[200px]">Coach</TableHead>
								<TableHead>Total Points</TableHead>
								<TableHead>Team Name</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{data.map((item, index) => (
								<TableRow key={item.coachId} className={`${currentUser?.coachId === item.coachId ? 'bg-red-300' : ''}`}>
									<TableCell>{index+1}</TableCell>
									<TableCell className="font-medium">
										{item.coachName}
									</TableCell>
									<TableCell>{item.rankingPosition}</TableCell>
									<TableCell>{item.teamName}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				)
			)}
		</div>
	);
}
