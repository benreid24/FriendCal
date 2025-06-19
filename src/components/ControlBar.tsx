import { useState } from 'react';
import { Button } from './Common/Button';
import { PeopleModal } from './PeopleModal';

export function ControlBar() {
  const [peopleModalOpen, setPeopleModalOpen] = useState<boolean>(false);

  return (
    <>
      <div className="control-bar-container">
        <Button onClick={() => setPeopleModalOpen(true)}>Manage People</Button>
      </div>
      {peopleModalOpen && <PeopleModal onRequestClose={() => setPeopleModalOpen(false)} />}
      <style jsx>{`
      .control-bar-container {
        display: flex;
        flex-direction: row;
        justify-content: flex-start:
        align-items: center;
        margin: 16px;
        width: calc(100% - 32px);
      }
    `}</style>
    </>
  );
}
