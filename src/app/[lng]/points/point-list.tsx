import { tcoachgpt03 } from '@prisma/client';

import { Dictionary } from '@/types/app';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { H3 } from '@/components/ui/typographies';

type PointListProps = {
  dictionary: Dictionary;
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
export default function PointList({ dictionary, data, error }: PointListProps) {
  return (
    <div>
      {error ? (
        <div>{String(error)}</div>
      ) : (
        <Table>
          <TableCaption>{dictionary.pointsPage.tableCaption}</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>{dictionary.pointsPage.points}</TableHead>
              <TableHead>{dictionary.pointsPage.teamName}</TableHead>
              <TableHead>{dictionary.common.date}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {!data || data.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={3}
                  className="text-center">
                  <H3>{dictionary.common.noData}</H3>
                </TableCell>
              </TableRow>
            ) : (
              data.map((item) => (
                <TableRow key={String(item.timestamp)}>
                  <TableCell>{item.points}</TableCell>
                  <TableCell>{item.teamName}</TableCell>
                  <TableCell>{new Date(item.timestamp).toString()}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
