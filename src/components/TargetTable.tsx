import type { Target } from '../types/target';

export interface Props {
  targets: Target[];
}

export function TargetTable({ targets }: Props) {
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
            <tr key={target.id}>
              <th scope="row">{target.name}</th>
              <td>Never</td>
              <td>Soon</td>
              <td>0</td>
            </tr>
          ))}
        </tbody>
      </table>
      <style jsx>{`
        th {
          text-align: left;
        }
      `}</style>
    </>
  );
}
