import { useMemo } from 'react';
import { useDataLayer } from '../hooks/useDataLayer';
import { getRecentDate } from '../lib/time';
import type { Target } from '../types/target';

export interface Props {}

function TargetRow({ target }: { target: Target }) {
  const dataLayer = useDataLayer();

  const lastHang = useMemo(() => dataLayer.getLastHangout(target.id), [dataLayer, target]);
  const nextHang = useMemo(() => dataLayer.getNextHangout(target.id), [dataLayer, target]);
  const recentThresh = getRecentDate().getTime();
  const recent = useMemo(
    () =>
      dataLayer.getPriorHangoutsForTarget(target.id).filter(h => h.time.getTime() > recentThresh)
        .length,
    [dataLayer, target]
  );

  return (
    <tr key={target.id}>
      <th scope="row">{target.target.name}</th>
      <td>{lastHang ? lastHang.time.toDateString() : 'Never'}</td>
      <td>{nextHang ? nextHang.time.toDateString() : 'None'}</td>
      <td>{recent}</td>
    </tr>
  );
}

export function TargetTable({}: Props) {
  const dataLayer = useDataLayer();
  const targets = useMemo(() => dataLayer.getTargets(), [dataLayer]);

  return (
    <>
      <table>
        <thead>
          <tr>
            <th scope="col">People</th>
            <th scope="col">Last seen</th>
            <th scope="col">Next plans</th>
            <th scope="col">Recent hangouts</th>
          </tr>
        </thead>
        <tbody>
          {targets.map(target => (
            <TargetRow key={target.id} target={target} />
          ))}
        </tbody>
      </table>
      <style jsx>{`
        
      `}</style>
    </>
  );
}
