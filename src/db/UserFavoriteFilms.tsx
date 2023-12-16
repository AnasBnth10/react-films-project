import { atom } from 'recoil';

export const favoritesState = atom<string[]>({
  key: 'favoritesFilmsState',
  default: [], // La valeur par défaut est une liste vide
});