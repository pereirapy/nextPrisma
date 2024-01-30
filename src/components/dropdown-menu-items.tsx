'use client';

import { Button } from './ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from './ui/dropdown-menu';

type DropdownMenuItemProps = {
	label: string;
	onClick: Function;
};

export type DropdownMenuItemsProps = {
	icon: JSX.Element;
	label: string;
	items: DropdownMenuItemProps[];
};

export function DropdownMenuItems({
	label,
	items,
	icon,
}: DropdownMenuItemsProps) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="ghost"
					className="w-5 m-2">
					{icon}
					<span className="sr-only">{label}</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				{items.map((item) => (
					<DropdownMenuItem key={item.label}>
						<Button
							variant="ghost"
							className="text-right"
							onClick={() => item.onClick()}>
							{item.label}
						</Button>
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
