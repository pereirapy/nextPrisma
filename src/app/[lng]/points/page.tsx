import { ParamsApp } from '../../../types/app';
import { getDictionary } from '@/app/i18n';
import HeaderWithFooter from '@/components/header-with_footer';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { routes } from '@/config/routes';
import { getPointsByCoach } from '@/lib/services/points';
import PointList from './point-list';

export default async function Points({ params: { lng } }: ParamsApp) {
	const session = await getServerSession(authOptions);

	if (!session?.user) {
		redirect(`/${lng}${routes.signIn}`);
	}

	console.log({session})

	const dictionary = await getDictionary(lng);
	const { points, error } = await getPointsByCoach(session.user.coachId);
	return (
		<HeaderWithFooter
			dictionary={dictionary}
			title={`${dictionary.pointsPage.title}, ${session.user.name}`}
			currentLanguage={lng}>
			<PointList
				dictionary={dictionary}
				currentLanguage={lng}
				data={points}
				error={error}
			/>
		</HeaderWithFooter>
	);
}
