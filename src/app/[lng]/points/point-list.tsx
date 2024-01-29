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
import { tcoachgpt03 } from '@prisma/client';

type PointListProps = {
	dictionary: Dictionary;
	currentLanguage: Locale;
} & (
	| {
			data: tcoachgpt03[];
			error?: string | unknown;
	  }
	| {
			data?: tcoachgpt03[];
			error: string | unknown;
	  }
);
export default function PointList({
	dictionary,
	currentLanguage,
	data,
	error,
}: PointListProps) {
	return (
		<div>
			{error ? (
				<div>{String(error)}</div>
			) : (
				data && (
					<Table>
						<TableCaption>Point List</TableCaption>
						<TableHeader>
							<TableRow>
								<TableHead>Points</TableHead>
								<TableHead >Team Name</TableHead>
								<TableHead>Date</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{data.map((item) => (
								<TableRow key={String(item.timestamp)}>
									<TableCell>{item.points}</TableCell>
									<TableCell>{item.teamName}</TableCell>
									<TableCell>
										{new Date(item.timestamp).toLocaleDateString()}
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				)
			)}
		</div>
	);
}
