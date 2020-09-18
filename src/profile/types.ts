export interface IProfile {
    _id: string;
    email: string;
    firstname: string;
    lastname: string;
    conversationsSeen?: {
        [conversationId: string] :string
    }
}
// definition des types de l'action
export const UPDATE_CONNECTED_PROFILE = "UPDATE_CONNECTED_PROFILE";

export interface UpdateConnectedProfileAction {
  type: typeof UPDATE_CONNECTED_PROFILE;
  profile: IProfile;
}
export interface IProfileState {
    connectedProfile?: IProfile
}

export type IProfileAction = UpdateConnectedProfileAction;