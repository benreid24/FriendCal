import { Button } from './Common/Button';
import Modal from './Common/Modal';

interface Props {
  onRequestClose: () => void;
}

export function PeopleModal({ onRequestClose }: Props) {
  return (
    <>
      <Modal open={true} onRequestClose={onRequestClose}>
        <Modal.Title>Manage People</Modal.Title>
        <Modal.Content>TODO - content here</Modal.Content>
        <Modal.Actions>
          <div className="actions-left">
            <Button>Add Person</Button>
          </div>
          <div className="actions-right">
            <Button variant="destructive" onClick={onRequestClose}>
              Close
            </Button>
          </div>
        </Modal.Actions>
      </Modal>
    </>
  );
}
