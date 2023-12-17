import { atom } from 'recoil';
import { User } from '../components/app/models/user-model';
import { UserService } from '../services/user.service';

export const userState = atom<User>({
  key: 'userState',
  default: UserService.getCurrentUserData(), // La valeur par défaut est une liste vide
});