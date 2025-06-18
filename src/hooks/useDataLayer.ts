import { atom, useSetAtom, useAtomValue } from 'jotai';
import type { DataLayer } from '../data/data_layer';
import { DebugData } from '../data/debug_data';

const dataLayerAtom = atom<DataLayer>(new DebugData());

export const useDataLayer = () => useAtomValue(dataLayerAtom);

export const useSetDataLayer = () => useSetAtom(dataLayerAtom);
