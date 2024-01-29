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
import { Locale } from '@/app/i18n/settings';
import { VersionsState } from '@/app/[lng]/page';
import { OurLink } from '@/components/ui/our-link';
import { Dictionary } from '@/types/app';

type VersionsPageProps = {
	dictionary: Dictionary;
	currentLanguage: Locale;
	data: VersionsState;
};
export default function VersionList({
	dictionary,
	currentLanguage,
	data,
}: VersionsPageProps) {
	return (
		<div>
			{data.error !== '' ? (
				<div>{data.error}</div>
			) : (
				<Table>
					<TableCaption>A list of Versions.</TableCaption>
					<TableHeader>
						<TableRow>
							<TableHead className="w-[100px]">
								Version Code
							</TableHead>
							<TableHead>Version Desc</TableHead>
							<TableHead>Year lauched</TableHead>
							<TableHead>Action</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{data.versions.map((item) => (
							<TableRow key={item.versioncode}>
								<TableCell className="font-medium">
									{item.versioncode}
								</TableCell>
								<TableCell>{item.versiondesc}</TableCell>
								<TableCell>{item.yearlauched}</TableCell>
								<TableCell>
									<OurLink
										className="font-bold"
										href={`/${currentLanguage}${routes.buy}/${item.versioncode}`}>
										{dictionary.versionsPage.buyIt}
									</OurLink>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			)}
		</div>
	);
}
