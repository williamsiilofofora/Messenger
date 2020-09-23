import { getConversations } from "../../api/methods";
import { IAppState } from "../../appReducer";
import { updateConversationList } from "./updateConversationsList";


export function makeFetchConversation() {
  return (dispatch: any, getState: () => IAppState) => {
    // fetch à l'API
    const connectedProfile = getState().profile.connectedProfile;
    if (connectedProfile) {
      getConversations(connectedProfile).then((conversations) => {
        dispatch(updateConversationList(conversations));
      });
    }
  };
}