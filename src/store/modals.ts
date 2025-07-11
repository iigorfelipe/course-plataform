import { atom } from 'jotai';

const isOpenDeleteCourseModal = atom<boolean>(false);

const openDeleteCourseModal = atom(null, (_get, set) => {
  set(isOpenDeleteCourseModal, true);
});

const closeDeleteCourseModal = atom(null, (_get, set) => {
  set(isOpenDeleteCourseModal, false);
});

export const modalAtom = {
  isOpenDeleteCourseModal,
  openDeleteCourseModal,
  closeDeleteCourseModal,
};
