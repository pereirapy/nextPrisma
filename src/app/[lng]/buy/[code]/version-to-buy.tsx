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
import { H3 } from '@/components/ui/typographies';

type BuyPageProps = {
	dictionary: Dictionary;
} & (
	| {
			data: tgver07;
			error?: null;
	  }
	| { data?: null; error: string }
);
export default function VersionToBuy({
	dictionary,
	data,
	error,
}: BuyPageProps) {
	return (
		<div className="mt-4">
			{error && error != '' ? (
				<div>{error}</div>
			) : (
				<Table>
					<TableCaption>{dictionary.buyPage.tableCaption}</TableCaption>
					<TableHeader>
						<TableRow>
							<TableHead className="w-[100px]">
								{dictionary.buyPage.versionCode}
							</TableHead>
							<TableHead>{dictionary.buyPage.versionDesc}</TableHead>
							<TableHead>{dictionary.buyPage.yearLaunched}</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{!data ? (
							<TableRow>
								<TableCell
									colSpan={3}
									className="text-center">
									<H3>{dictionary.common.noData}</H3>
								</TableCell>
							</TableRow>
						) : (
							<TableRow key={data.versioncode}>
								<TableCell className="font-medium">
									{data.versioncode}
								</TableCell>
								<TableCell>{data.versiondesc}</TableCell>
								<TableCell>{data.yearlauched}</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			)}
		</div>
	);
}
