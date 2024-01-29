'use client';

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
import { tgver07 } from '@prisma/client';

type BuyPageProps = {
	dictionary: Dictionary;
	currentLanguage: Locale;
} & (
	| {
			data: tgver07;
			error?: null;
	  }
	| { data?: null; error: string }
);
export default function VersionToBuy({
	dictionary,
	currentLanguage,
	data,
	error,
}: BuyPageProps) {
	return (
		<div className='mt-4'>
			{error && error != '' ? (
				<div>{error}</div>
			) : (
				data && (
					<Table>
						<TableCaption>You did a great choice!</TableCaption>
						<TableHeader>
							<TableRow>
								<TableHead className="w-[100px]">
									Version Code
								</TableHead>
								<TableHead>Version Desc</TableHead>
								<TableHead>Year lauched</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							<TableRow key={data.versioncode}>
								<TableCell className="font-medium">
									{data.versioncode}
								</TableCell>
								<TableCell>{data.versiondesc}</TableCell>
								<TableCell>{data.yearlauched}</TableCell>
							</TableRow>
						</TableBody>
					</Table>
				)
			)}
		</div>
	);
}
