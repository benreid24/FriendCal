import { useCallback, useEffect, useRef, useState } from 'react';
import { useDataLayer, useGroups } from '../hooks/useDataLayer';
import { Button } from './Common/Button';
import { Text } from './Common/Text';
import Modal from './Common/Modal';
import { TextInput } from './Common/TextInput';
import type { Group } from '../types/group';
import type { Person } from '../types/person';
import { PeopleDropdown } from './PeopleDropdown';

interface Props {
  onRequestClose: () => void;
}

function MemberButton({
  person,
  onRemove,
}: {
  person: Person;
  onRemove: (person: Person) => void;
}) {
  return (
    <>
      <div className="row member">
        <Text>{person.name}</Text>
        <Button
          variant="destructive"
          onClick={() => onRemove(person)}
          style={{ padding: '2px 8px' }}
        >
          X
        </Button>
      </div>
      <style jsx>{`
        .member {
          border-radius: 8px;
          padding: 2px 8px;
          background: var(--button-secondary);
          gap: 4px;
        }
      `}</style>
    </>
  );
}

function GroupMembers({
  initialMembers,
  onChange,
}: {
  initialMembers: Person[];
  onChange: (newMembers: Person[]) => void;
}) {
  const [members, setMembers] = useState<Person[]>(initialMembers);

  const removePerson = useCallback(
    (person: Person) => {
      setMembers(prev => {
        const newValue = prev.filter(p => p.id !== person.id);
        onChange(newValue);
        return newValue;
      });
    },
    [setMembers, onchange]
  );

  const addPerson = useCallback(
    (person: Person) => {
      setMembers(prev => {
        const newValue = [...prev, person];
        onChange(newValue);
        return newValue;
      });
    },
    [setMembers, onchange]
  );

  return (
    <>
      <div className="row members">
        {members.map(member => (
          <MemberButton key={member.id} person={member} onRemove={removePerson} />
        ))}
        <PeopleDropdown
          onSelect={addPerson}
          filter={p => !!members.find(m => m.id === p.id)}
          trigger={<Button>Add</Button>}
        />
      </div>
      <style jsx>{`
        .members {
          gap: 4px;
        }
      `}</style>
    </>
  );
}

function GroupRow({ group, onRemove }: { group: Group; onRemove: (group: Group) => void }) {
  const dataLayer = useDataLayer();
  const [isRenaming, setIsRenaming] = useState<boolean>(false);
  const [newName, setNewName] = useState<string>(group.name);
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
        setNewName(group.name);
        return false;
      }
    });
  }, [setIsRenaming, setNewName]);

  const doRename = useCallback(() => {
    setIsRenaming(false);
    void dataLayer.updateGroup({ ...group, name: newName });
  }, [setIsRenaming, dataLayer, group, newName]);

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

  const updateMembers = useCallback(
    (newMembers: Person[]) => {
      dataLayer.updateGroup({ ...group, members: newMembers });
    },
    [dataLayer, group]
  );

  return (
    <tr>
      <td onClick={startRenaming} style={{ width: '33%' }}>
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
          <Text>{group.name}</Text>
        )}
      </td>
      <td>
        <GroupMembers initialMembers={group.members} onChange={updateMembers} />
      </td>
      <td>
        <div className="row">
          <Button variant="secondary" onClick={toggleRename} style={{ width: '50%' }}>
            {isRenaming ? 'Cancel' : 'Rename'}
          </Button>
          <Button variant="destructive" onClick={() => onRemove(group)} style={{ width: '50%' }}>
            Remove
          </Button>
        </div>
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

function NewGroupRow({ onRequestRemove }: { onRequestRemove: () => void }) {
  const dataLayer = useDataLayer();
  const [newName, setNewName] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);
  const [newMembers, setNewMembers] = useState<Person[]>([]);

  const doCreate = useCallback(() => {
    if (newMembers.length > 0) {
      const name =
        newName.length > 0 ? newName : newMembers.map(m => m.name.split(' ')[0]).join(' & ');
      void dataLayer.createGroup({ name: name, members: newMembers });
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
      <td>
        <GroupMembers initialMembers={newMembers} onChange={setNewMembers} />
      </td>
      <td>
        <div className="row">
          <Button variant="secondary" onClick={doCreate} style={{ width: '50%' }}>
            Create
          </Button>
          <Button variant="destructive" onClick={onRequestRemove} style={{ width: '50%' }}>
            Cancel
          </Button>
        </div>
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

export function GroupModal({ onRequestClose }: Props) {
  const dataLayer = useDataLayer();
  const [creatingNew, setCreatingNew] = useState<boolean>(false);
  const [deletingGroup, setDeletingGroup] = useState<Group | undefined>(undefined);
  const { groups } = useGroups();

  const onConfirmRemove = useCallback(() => {
    if (deletingGroup) {
      void dataLayer.removeGroup(deletingGroup.id);
      setDeletingGroup(undefined);
    }
  }, [deletingGroup, setDeletingGroup]);

  return (
    <>
      <Modal open={true} onRequestClose={onRequestClose}>
        <Modal.Title>Manage Groups</Modal.Title>
        <Modal.Content>
          <table className="group-table">
            <thead className="fixed-table-header">
              <tr>
                <th scope="col" className="column-shrink fixed-table-cell">
                  Name
                </th>
                <th scope="col" className="column-grow fixed-table-cell">
                  Members
                </th>
                <th scope="col" className="column-shrink fixed-table-cell">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="table-body">
              {groups.map(group => (
                <GroupRow key={group.id} group={group} onRemove={setDeletingGroup} />
              ))}
              {creatingNew && <NewGroupRow onRequestRemove={() => setCreatingNew(false)} />}
            </tbody>
          </table>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={() => setCreatingNew(true)}>Add Group</Button>
          <Button variant="destructive" onClick={onRequestClose}>
            Close
          </Button>
        </Modal.Actions>
      </Modal>
      {deletingGroup && (
        <Modal open={true} onRequestClose={() => setDeletingGroup(undefined)}>
          <Modal.Title>Remove {deletingGroup.name}?</Modal.Title>
          <Modal.Content>
            <Text>This will delete all associated data for this group.</Text>
          </Modal.Content>
          <Modal.Actions>
            <Button variant="destructive" onClick={onConfirmRemove}>
              Remove
            </Button>
            <Button onClick={() => setDeletingGroup(undefined)}>Cancel</Button>
          </Modal.Actions>
        </Modal>
      )}
      <style jsx>{`
        .group-table {
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
