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
import { H3 } from '@/components/ui/typographies';

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
				<Table>
					<TableCaption>{dictionary.rankingPage.tableCaption}</TableCaption>
					<TableHeader>
						<TableRow>
							<TableHead>{dictionary.rankingPage.position}</TableHead>
							<TableHead className="w-[200px]">{dictionary.rankingPage.coach}</TableHead>
							<TableHead>{dictionary.rankingPage.totalPoints}</TableHead>
							<TableHead>{dictionary.rankingPage.teamName}</TableHead>
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
								</TableRow>
							))
						)}
					</TableBody>
				</Table>
			)}
		</div>
	);
}
