import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { routes } from '@/config/routes';
import { Locale } from '@/lib/i18n/settings';
import { OurLink } from '@/components/ui/our-link';
import { Dictionary } from '@/types/app';
import { tgver07 } from '@prisma/client';
import { H3 } from '@/components/ui/typographies';

type VersionsPageProps = {
	dictionary: Dictionary;
	currentLanguage: Locale;
	data?: tgver07[];
	error?: unknown;
};
export default function VersionList({
	dictionary,
	currentLanguage,
	data,
	error,
}: VersionsPageProps) {
	return (
		<div>
			{error ? (
				<div>{String(error)}</div>
			) : (
				<Table>
					<TableCaption>
						{dictionary.versionsPage.tableCaption}
					</TableCaption>
					<TableHeader>
						<TableRow>
							<TableHead className="w-[100px]">
								{dictionary.versionsPage.versionCode}
							</TableHead>
							<TableHead>
								{dictionary.versionsPage.versionDesc}
							</TableHead>
							<TableHead>
								{dictionary.versionsPage.yearLaunched}
							</TableHead>
							<TableHead className="text-center">
								{dictionary.common.action}
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{!data || data.length === 0 ? (
							<TableRow>
								<TableCell
									colSpan={4}
									className="text-center">
									<H3>{dictionary.common.noData}</H3>
								</TableCell>
							</TableRow>
						) : (
							data.map((item) => (
								<TableRow key={item.versioncode}>
									<TableCell className="font-medium">
										{item.versioncode}
									</TableCell>
									<TableCell>{item.versiondesc}</TableCell>
									<TableCell>{item.yearlauched}</TableCell>
									<TableCell className="text-center">
										<OurLink
											className="font-bold"
											href={`/${currentLanguage}${routes.buy}/${item.versioncode}`}>
											{dictionary.versionsPage.buyIt}
										</OurLink>
									</TableCell>
								</TableRow>
							))
						)}
					</TableBody>
				</Table>
			)}
		</div>
	);
}
