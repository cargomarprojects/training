import { AppState } from '../app.store';
import { userState } from './user/list/user-list.store';

export interface MasterState extends AppState
{
    "user" : userState
}