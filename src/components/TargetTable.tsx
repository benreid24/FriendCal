import { useCallback, useMemo, useState } from 'react';
import { useHangouts, useTargets } from '../hooks/useDataLayer';
import { getRecentDate, trimTimeFromDate } from '../lib/time';
import type { Target } from '../types/target';
import { UpArrow } from './icons/UpArrow';
import { DownArrow } from './icons/DownArrow';
import { ButtonGhost } from './Common/ButtonGhost';
import { Text } from './Common/Text';

export interface Props {}

interface RowData {
  id: string;
  name: string;
  prevDate: Date | undefined;
  nextDate: Date | undefined;
  recentHangs: number;
}

type ColumnKey = keyof Omit<RowData, 'id'>;

interface SortedColumn {
  key: ColumnKey;
  ascending: boolean;
}

function makeData(
  target: Target,
  getLastHangoutForTarget: ReturnType<typeof useHangouts>['getLastHangoutForTarget'],
  getNextHangoutForTarget: ReturnType<typeof useHangouts>['getNextHangoutForTarget'],
  getPriorHangoutsForTarget: ReturnType<typeof useHangouts>['getPriorHangoutsForTarget']
): RowData {
  const lastHang = getLastHangoutForTarget(target.id);
  const nextHang = getNextHangoutForTarget(target.id);
  const recentThresh = getRecentDate().getTime();
  const recent = getPriorHangoutsForTarget(target.id).filter(
    h => h.time.getTime() > recentThresh
  ).length;

  return {
    id: target.id,
    name: target.target.name,
    prevDate: lastHang ? trimTimeFromDate(lastHang.time) : undefined,
    nextDate: nextHang ? trimTimeFromDate(nextHang.time) : undefined,
    recentHangs: recent,
  };
}

function TargetRow({ data }: { data: RowData }) {
  return (
    <tr>
      <th scope="row">{data.name}</th>
      <td>{data.prevDate ? data.prevDate.toDateString() : 'Never'}</td>
      <td>{data.nextDate ? data.nextDate.toDateString() : 'None'}</td>
      <td>{data.recentHangs}</td>
    </tr>
  );
}

function ColumnHeader({
  title,
  column,
  primary,
  secondary,
  onToggleOrder,
  onPromote,
}: {
  title: string;
  column: ColumnKey;
  primary: SortedColumn;
  secondary: SortedColumn;
  onToggleOrder: (col: ColumnKey) => void;
  onPromote: (col: ColumnKey) => void;
}) {
  const isPrimary = column === primary.key;
  const isSecondary = column === secondary.key;
  const isAscending = isPrimary ? primary.ascending : isSecondary ? secondary.ascending : false;
  const isArrowVisible = isPrimary || isSecondary;
  const color = isPrimary ? 'var(--button-primary)' : 'var(--button-secondary)';
  const Arrow = isAscending ? UpArrow : DownArrow;

  return (
    <>
      <div className="header-container">
        <ButtonGhost className="header-title" onClick={() => onPromote(column)}>
          <Text weight="semibold" color="secondary">
            {title}
          </Text>
        </ButtonGhost>
        <ButtonGhost
          className="arrow-container"
          onClick={() => onToggleOrder(column)}
          style={{ opacity: isArrowVisible ? 1 : 0 }}
        >
          <Arrow size={16} color={color} />
        </ButtonGhost>
      </div>
      <style jsx>{`
        .header-container {
          display: flex;
          justify-content: flex-start;
          align-items: center;
        }
        .header-title {
          margin-right: 4px;
        }
      `}</style>
    </>
  );
}

export function TargetTable({}: Props) {
  const { targets } = useTargets();
  const { getLastHangoutForTarget, getNextHangoutForTarget, getPriorHangoutsForTarget } =
    useHangouts();
  const rows = useMemo(
    () =>
      targets.map(t =>
        makeData(t, getLastHangoutForTarget, getNextHangoutForTarget, getPriorHangoutsForTarget)
      ),
    [targets, getLastHangoutForTarget, getNextHangoutForTarget, getPriorHangoutsForTarget]
  );

  const [primarySort, setPrimarySort] = useState<SortedColumn>({
    key: 'prevDate',
    ascending: true,
  });
  const [secondarySort, setSecondarySort] = useState<SortedColumn>({
    key: 'nextDate',
    ascending: false,
  });

  const toggleSortOrder = useCallback(
    (column: ColumnKey) => {
      if (column === primarySort.key) {
        setPrimarySort({ ...primarySort, ascending: !primarySort.ascending });
      } else if (column === secondarySort.key) {
        setSecondarySort({ ...secondarySort, ascending: !secondarySort.ascending });
      }
    },
    [primarySort, setPrimarySort, secondarySort, setSecondarySort]
  );

  const promoteSortColumn = useCallback(
    (column: ColumnKey) => {
      if (column !== primarySort.key) {
        setPrimarySort({ key: column, ascending: true });
        setSecondarySort(primarySort);
      } else {
        toggleSortOrder(column);
      }
    },
    [primarySort, setPrimarySort, setSecondarySort, toggleSortOrder]
  );

  const sortedRows = useMemo(() => {
    function compareKeys<T extends RowData[ColumnKey]>(a: T, b: T, ascending: boolean): number {
      if (a === b || (a === undefined && b === undefined)) {
        return 0;
      }

      // undefined always first
      if (a === undefined) {
        return -1;
      }
      if (b === undefined) {
        return 1;
      }

      // special case strings
      if (typeof a === 'string' && typeof b === 'string') {
        const r = a.localeCompare(b);
        return ascending ? r : -r;
      }

      // otherwise sort as normal
      if (a < b) {
        return ascending ? -1 : 1;
      } else if (a > b) {
        return ascending ? 1 : -1;
      }
      return 0;
    }
    return rows.sort((a: RowData, b: RowData) => {
      const p = compareKeys(a[primarySort.key], b[primarySort.key], primarySort.ascending);
      if (p !== 0) {
        return p;
      }
      return compareKeys(a[secondarySort.key], b[secondarySort.key], secondarySort.ascending);
    });
  }, [rows, primarySort, secondarySort]);

  return (
    <>
      <table>
        <thead>
          <tr>
            <th scope="col">
              <ColumnHeader
                title="People"
                column="name"
                primary={primarySort}
                secondary={secondarySort}
                onToggleOrder={toggleSortOrder}
                onPromote={promoteSortColumn}
              />
            </th>
            <th scope="col">
              <ColumnHeader
                title="Last seen"
                column="prevDate"
                primary={primarySort}
                secondary={secondarySort}
                onToggleOrder={toggleSortOrder}
                onPromote={promoteSortColumn}
              />
            </th>
            <th scope="col">
              <ColumnHeader
                title="Next hangout"
                column="nextDate"
                primary={primarySort}
                secondary={secondarySort}
                onToggleOrder={toggleSortOrder}
                onPromote={promoteSortColumn}
              />
            </th>
            <th scope="col">
              <ColumnHeader
                title="Recent hangouts"
                column="recentHangs"
                primary={primarySort}
                secondary={secondarySort}
                onToggleOrder={toggleSortOrder}
                onPromote={promoteSortColumn}
              />
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedRows.map(row => (
            <TargetRow key={row.id} data={row} />
          ))}
        </tbody>
      </table>
      <style jsx>{``}</style>
    </>
  );
}
