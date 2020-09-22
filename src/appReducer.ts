import { combineReducers } from "redux";
import { profile } from './profile/reducer';
import { layout } from "./layout/reducer";
import {conversations} from './conversation/reducer'

export const appReducer = combineReducers({
    profile,
    layout,
    conversations
});

export type IAppState = ReturnType<typeof appReducer>;