import { User } from "../users/types";
import axios from 'axios';
import { IProfile } from "../profile/types";
import { Component } from "react";
import { IConversation } from "../conversation/types";



// function liste des utilisateur
export function getUsers(): Promise<User[]> {
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
export function getConnectedProfile(): Promise<User> {
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
export function getConversations(): Promise<IConversation[]> {
  return Promise.resolve([
    {
      _id: "abcd",
      targets: ["5f5a76272c5d371cb4178469", "5f5a75802c5d371cb4178468"],
      updatedAt: new Date(),
      unseenMessages: 0,
      messages: [
        {
          _id: "1",
          conversationId: "abcd",
          createdAt: new Date(),
          emitter: "5f5a76272c5d371cb4178469",
          targets: ["5f5a75802c5d371cb4178468"],
          content: "Coucou",
        },
        {
          _id: "2",
          conversationId: "abcd",
          createdAt: new Date(),
          emitter: "5f5a75802c5d371cb4178468",
          targets: ["5f5a76272c5d371cb4178469"],
          content: "Hey Comment tu vas ?",
        },
        {
          _id: "3",
          conversationId: "abcde",
          createdAt: new Date(),
          emitter: "5f5a76272c5d371cb4178469",
          targets: ["5f5a75802c5d371cb4178468"],
          content: "ReCoucou",
        },
        {
          _id: "4",
          conversationId: "abcde",
          createdAt: new Date(),
          emitter: "5f5a75802c5d371cb4178468",
          targets: ["5f5a76272c5d371cb4178469"],
          content: "Hey Comment tu vas aujourd'hui ?",
        },
        {
          _id: "3",
          conversationId: "abcde",
          createdAt: new Date(),
          emitter: "5f5a76272c5d371cb4178469",
          targets: ["5f5a75802c5d371cb4178468"],
          content: "Mouais on a vu mieu",
        },
      ],
    },
  ]);
}