import { useState } from 'react';
import { Button } from './Common/Button';
import { PeopleModal } from './PeopleModal';
import { GroupModal } from './GroupModal';

export function ControlBar() {
  const [peopleModalOpen, setPeopleModalOpen] = useState<boolean>(false);
  const [groupModalOpen, setGroupModalOpen] = useState<boolean>(false);

  return (
    <>
      <div className="control-bar-container">
        <Button onClick={() => setPeopleModalOpen(true)}>Manage People</Button>
        <Button onClick={() => setGroupModalOpen(true)}>Manage Groups</Button>
      </div>
      {peopleModalOpen && <PeopleModal onRequestClose={() => setPeopleModalOpen(false)} />}
      {groupModalOpen && <GroupModal onRequestClose={() => setGroupModalOpen(false)} />}
      <style jsx>{`
      .control-bar-container {
        display: flex;
        flex-direction: row;
        justify-content: flex-start:
        align-items: center;
        margin: 16px;
        width: calc(100% - 32px);
        gap: 8px;
      }
    `}</style>
    </>
  );
}
