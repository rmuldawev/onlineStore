import {atom, useAtom} from 'jotai';

export const currentUserAtom = atom<any | null>(null);
