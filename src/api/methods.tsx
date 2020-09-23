import { User } from "../users/types";
import axios from 'axios';
import { IProfile } from "../profile/types";
import { IConversation, IConversationMessage } from "../conversation/types";



// function liste des utilisateur
export function getUsers(): Promise<IProfile[]> {
  return axios
    .get(
      `${process.env.REACT_APP_BACKEND}/profile`,
      {
      withCredentials: true
      }
    )
    .then(resp => {
      return resp.data
    })
}
// function de recuperation de profile User
export function getConnectedProfile(): Promise<IProfile> {
  return axios
    .get(
      `${process.env.REACT_APP_BACKEND}/profile/me`,
      {
      withCredentials: true,
      }
    )
    .then((resp) => resp.data);
}



// function de log utilisateur
export function login(
  email: string,
  password: string
): Promise<IProfile> {
  return axios
    .post(
      `${process.env.REACT_APP_BACKEND}/login`,
      {
        username: email,
        password: password,
      },
      {
        withCredentials: true,
      }
    )
    .then((resp) => resp.data);
}

// function enregistrement d'un nouvel utilisateur
export function register(
  email: string,
  password: string,
  firstname: string,
  lastname: string
): Promise<IProfile> {
  return axios
    .post(`${process.env.REACT_APP_BACKEND}/profile`,
    {
      email: email,
      password: password,
      firstname: firstname,
      lastname: lastname
    }
  
  );
}
// export default class Logout extends Component {
//   logout = () => {
//     window.localStorage.clear();
//     window.location.href = "http://localhost:3001/";
//   };
// }
export async function sendMessage(conversationId: string, targets: string[], content: string): Promise<IConversationMessage> {
  const resp = await axios.post(
    `${process.env.REACT_APP_BACKEND}/messages`,
    {
      conversationId: conversationId,
      targets: targets,
      content: content
    },
    { withCredentials: true }
  );
  return resp.data;
}

export async function getConversation(conversationId: string): Promise<IConversation[]> {
  const resp = await axios.get(`${process.env.REACT_APP_BACKEND}/messages/${conversationId}`, { withCredentials: true })
  return resp.data;
}

export async function getConversations(
  connectedUser: User
): Promise<IConversation[]> {
  
  const messages: IConversationMessage[]= await axios
    .get(
      `${process.env.REACT_APP_BACKEND}/messages`,
      {
        withCredentials: true
      }
    )
    .then(resp => {
      // console.log(resp.data);
      return resp.data;
      
    })
  if (messages.length === 0) return []

  const msgReducer = messages.reduce<{ [conversationId: string]: IConversationMessage[] }>(
    (res, message) => ({
      ...res,
      [message.conversationId]: [...(res[message.conversationId] || []), message],
    }),
    {},
  );
  const conversations: IConversation[] = [];
  for (const conversationId in msgReducer) {
    const messages = msgReducer[conversationId];
    const attendees = [...new Set(messages.flatMap(({ emitter, targets }) => [emitter, ...targets]))];
    const targets = attendees.filter((id) => id !== connectedUser._id);
    conversations.push({
      _id: conversationId,
      targets: targets,
      messages: messages,
      updatedAt: getLastMsgDate(messages),
      unseenMessages: 0
    })
  }
  return conversations;
}	

export async function patchConversationSeen(
  conversationId: string
): Promise<IProfile> {
  const resp = await axios.patch(
    `${process.env.REACT_APP_BACKEND}/profile/conversation-seen/${conversationId}`,
    {},
    { withCredentials: true }
  );
  return resp.data;
}
 
function getLastMsgDate(messages: IConversationMessage[]) {
  return messages[messages.length - 1].createdAt;
}