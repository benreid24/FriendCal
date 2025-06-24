import React, { useCallback, useMemo } from 'react';
import { usePeople } from '../hooks/useDataLayer';
import type { Person } from '../types/person';
import { Dropdown } from './Common/Dropdown';

interface Props {
  onSelect: (person: Person) => void;
  filter?: (person: Person) => boolean;
  trigger: React.ReactNode;
}

export function PeopleDropdown({ onSelect, filter, trigger }: Props) {
  const { people } = usePeople();
  const sortedPeople = useMemo(() => {
    return people.sort((a, b) => a.name.localeCompare(b.name));
  }, [people]);

  const onPick = useCallback(
    (key: string) => {
      const p = people.find(person => person.id === key);
      if (p) {
        onSelect(p);
      }
    },
    [onSelect, people]
  );

  return (
    <>
      <Dropdown
        items={sortedPeople.map(p => ({
          key: p.id,
          disabled: filter?.(p) ?? false,
          element: p.name,
        }))}
        trigger={trigger}
        onSelect={onPick}
        dropdownStyle={{
          maxHeight: '200px',
          width: 'max-content',
          overflowX: 'hidden',
          scrollbarGutter: 'stable',
        }}
      />
    </>
  );
}
