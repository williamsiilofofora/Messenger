import { combineReducers } from "redux";
import { profile } from './profile/reducer';
import { layout } from "./layout/reducer";
import {conversation} from './conversation/reducer'

export const appReducer = combineReducers({
    profile,
    layout,
    conversation
});

export type IAppState = ReturnType<typeof appReducer>;