import { atom, useSetAtom, useAtomValue } from 'jotai';
import type { DataLayer } from '../data/data_layer';
import { DebugData } from '../data/debug_data';
import type { Person } from '../types/person';
import type { Group } from '../types/group';
import type { Target } from '../types/target';
import type { Hangout } from '../types/hangout';
import { useCallback, useEffect } from 'react';

const dataLayerAtom = atom<DataLayer>(new DebugData());
const peopleAtom = atom<Person[]>([]);
const groupAtom = atom<Group[]>([]);
const targetAtom = atom<Target[]>([]);
const hangoutAtom = atom<Hangout[]>([]);

export const useDataLayer = () => useAtomValue(dataLayerAtom);

export const useSetDataLayer = () => useSetAtom(dataLayerAtom);

export const useDataSync = () => {
  const dataLayer = useDataLayer();
  const setPeople = useSetAtom(peopleAtom);
  const setGroups = useSetAtom(groupAtom);
  const setTargets = useSetAtom(targetAtom);
  const setHangouts = useSetAtom(hangoutAtom);

  const syncPeople = useCallback(async () => {
    setPeople(await dataLayer.getPeople());
  }, [setPeople, dataLayer]);

  const syncGroups = useCallback(async () => {
    setGroups(await dataLayer.getGroups());
  }, [setGroups, dataLayer]);

  const syncTargets = useCallback(async () => {
    setTargets(await dataLayer.getTargets());
  }, [setTargets, dataLayer]);

  const syncHangouts = useCallback(async () => {
    setHangouts(await dataLayer.getHangouts());
  }, [setHangouts, dataLayer]);

  // initial data load + subscribe
  useEffect(() => {
    syncPeople();
    syncGroups();
    syncTargets();
    syncHangouts();

    dataLayer.addEventListener('people', syncPeople);
    dataLayer.addEventListener('groups', syncGroups);
    dataLayer.addEventListener('targets', syncTargets);
    dataLayer.addEventListener('hangouts', syncHangouts);

    return () => {
      dataLayer.removeEventListener('people', syncPeople);
      dataLayer.removeEventListener('groups', syncGroups);
      dataLayer.removeEventListener('targets', syncTargets);
      dataLayer.removeEventListener('hangouts', syncHangouts);
    };
  }, [syncPeople, syncGroups, syncTargets, syncHangouts, dataLayer]);
};

export const usePeople = () => {
  const people = useAtomValue(peopleAtom);

  return { people };
};

export const useGroups = () => {
  const groups = useAtomValue(groupAtom);

  return { groups };
};

export const useTargets = () => {
  const targets = useAtomValue(targetAtom);

  return { targets };
};

export const useHangouts = () => {
  const hangouts = useAtomValue(hangoutAtom);

  const getHangoutsForTarget = useCallback(
    (id: string) => {
      return hangouts.filter(h => h.target.id === id);
    },
    [hangouts]
  );

  const getPriorHangoutsForTarget = useCallback(
    (id: string) => {
      const now = Date.now();
      return hangouts.filter(h => h.target.id === id && h.time.getTime() < now);
    },
    [hangouts]
  );

  const getNextHangoutForTarget = useCallback(
    (id: string) => {
      const now = Date.now();
      return hangouts.reduce((val: Hangout | undefined, h: Hangout) => {
        if (h.target.id === id && h.time.getTime() > now) {
          if (!val || val.time.getTime() > h.time.getTime()) {
            return h;
          }
        }
        return val;
      }, undefined);
    },
    [hangouts]
  );

  const getLastHangoutForTarget = useCallback(
    (id: string) => {
      const now = Date.now();
      return hangouts.reduce((val: Hangout | undefined, h: Hangout) => {
        if (h.target.id === id && h.time.getTime() < now) {
          if (!val || val.time.getTime() < h.time.getTime()) {
            return h;
          }
        }
        return val;
      }, undefined);
    },
    [hangouts]
  );

  return {
    hangouts,
    getHangoutsForTarget,
    getPriorHangoutsForTarget,
    getNextHangoutForTarget,
    getLastHangoutForTarget,
  };
};
