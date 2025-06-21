import { useCallback, useEffect, useRef, useState } from 'react';
import { useDataLayer, usePeople } from '../hooks/useDataLayer';
import type { Person } from '../types/person';
import { Button } from './Common/Button';
import { Text } from './Common/Text';
import Modal from './Common/Modal';
import { TextInput } from './Common/TextInput';

interface Props {
  onRequestClose: () => void;
}

function PersonRow({ person, onRemove }: { person: Person; onRemove: (person: Person) => void }) {
  const dataLayer = useDataLayer();
  const [isRenaming, setIsRenaming] = useState<boolean>(false);
  const [newName, setNewName] = useState<string>(person.name);
  const inputRef = useRef<HTMLInputElement>(null);

  const toggleRename = useCallback(() => {
    setIsRenaming(wasRenaming => {
      if (!wasRenaming) {
        setTimeout(() => {
          if (inputRef.current) {
            inputRef.current.focus();
          }
        });
        return true;
      } else {
        setNewName(person.name);
        return false;
      }
    });
  }, [setIsRenaming, setNewName]);

  const doRename = useCallback(() => {
    setIsRenaming(false);
    void dataLayer.updatePerson({ ...person, name: newName });
  }, [setIsRenaming, dataLayer, person, newName]);

  const startRenaming = useCallback(() => {
    if (!isRenaming) {
      setIsRenaming(true);
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      });
    }
  }, [setIsRenaming, isRenaming, inputRef]);

  return (
    <tr>
      <td className="column-grow" onClick={startRenaming}>
        {isRenaming ? (
          <div className="rename-container row">
            <div className="rename-text-box">
              <TextInput ref={inputRef} value={newName} onChange={setNewName} onSubmit={doRename} />
            </div>
            <Button variant="primary" onClick={doRename}>
              Rename
            </Button>
          </div>
        ) : (
          <Text>{person.name}</Text>
        )}
      </td>
      <td className="row">
        <Button variant="secondary" onClick={toggleRename} style={{ width: '50%' }}>
          {isRenaming ? 'Cancel' : 'Rename'}
        </Button>
        <Button variant="destructive" onClick={() => onRemove(person)} style={{ width: '50%' }}>
          Remove
        </Button>
      </td>
      <style jsx>{`
        .rename-container {
          width: 100%;
          height: 100%;
        }
        .rename-text-box {
          flex-grow: 1;
        }
      `}</style>
    </tr>
  );
}

function NewPersonRow({ onRequestRemove }: { onRequestRemove: () => void }) {
  const dataLayer = useDataLayer();
  const [newName, setNewName] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);

  const doCreate = useCallback(() => {
    if (newName.length > 0) {
      void dataLayer.createPerson({ name: newName });
      onRequestRemove();
    }
  }, [dataLayer, newName, onRequestRemove]);

  useEffect(() => {
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 100);
  }, [inputRef]);

  return (
    <tr>
      <td className="column-grow">
        <div className="rename-container row">
          <div className="rename-text-box">
            <TextInput ref={inputRef} value={newName} onChange={setNewName} onSubmit={doCreate} />
          </div>
        </div>
      </td>
      <td className="row">
        <Button variant="secondary" onClick={doCreate} style={{ width: '50%' }}>
          Create
        </Button>
        <Button variant="destructive" onClick={onRequestRemove} style={{ width: '50%' }}>
          Cancel
        </Button>
      </td>
      <style jsx>{`
        .rename-container {
          width: 100%;
          height: 100%;
        }
        .rename-text-box {
          flex-grow: 1;
        }
      `}</style>
    </tr>
  );
}

export function PeopleModal({ onRequestClose }: Props) {
  const dataLayer = useDataLayer();
  const [creatingNew, setCreatingNew] = useState<boolean>(false);
  const [deletingPerson, setDeletingPerson] = useState<Person | undefined>(undefined);
  const { people } = usePeople();

  const onConfirmRemove = useCallback(() => {
    if (deletingPerson) {
      void dataLayer.removePerson(deletingPerson.id);
      setDeletingPerson(undefined);
    }
  }, [deletingPerson, setDeletingPerson]);

  return (
    <>
      <Modal open={true} onRequestClose={onRequestClose}>
        <Modal.Title>Manage People</Modal.Title>
        <Modal.Content>
          <table className="person-table">
            <thead className="fixed-table-header">
              <tr>
                <th scope="col" className="column-grow fixed-table-cell">
                  Person
                </th>
                <th scope="col" className="column-shrink fixed-table-cell">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="table-body">
              {people.map(person => (
                <PersonRow key={person.id} person={person} onRemove={setDeletingPerson} />
              ))}
              {creatingNew && <NewPersonRow onRequestRemove={() => setCreatingNew(false)} />}
            </tbody>
          </table>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={() => setCreatingNew(true)}>Add Person</Button>
          <Button variant="destructive" onClick={onRequestClose}>
            Close
          </Button>
        </Modal.Actions>
      </Modal>
      {deletingPerson && (
        <Modal open={true} onRequestClose={() => setDeletingPerson(undefined)}>
          <Modal.Title>Remove {deletingPerson.name}?</Modal.Title>
          <Modal.Content>
            <Text>
              This will delete all associated data and remove them from all groups and schedules.
            </Text>
          </Modal.Content>
          <Modal.Actions>
            <Button variant="destructive" onClick={onConfirmRemove}>
              Remove
            </Button>
            <Button onClick={() => setDeletingPerson(undefined)}>Cancel</Button>
          </Modal.Actions>
        </Modal>
      )}
      <style jsx>{`
        .person-table {
          width: 100%;
          table-layout: auto;
        }
        .scroll-area {
          max-height: 200px;
          overflow-y: auto;
        }
      `}</style>
    </>
  );
}
