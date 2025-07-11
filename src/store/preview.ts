import { atom } from 'jotai';

const isLoading = atom<boolean>(false);

export const previewAtom = { isLoading };
