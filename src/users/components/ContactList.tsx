import React from 'react';
import ContactListItem from './ContactListItem';
import { User } from '../types';
import { getUsers } from '../../api/methods';
import { List, ListItem, Button } from '@material-ui/core';
import history from '../../history';
import { Link } from 'react-router-dom';
// import { TextField, Button, Container, Box, Grid } from "@material-ui/core";



interface ContactListProps {
  users: User[];
  connectedUser?: User;
}


class ContactList extends React.Component<ContactListProps> {
  createConversation(target: string) {
    const { connectedUser } = this.props;
    if (connectedUser) {
      const conversationId = this.generateConversationId(connectedUser._id, target);
      return history.push(`/conversation/${conversationId}`);
    }
  }
  render() {
    return <div>
        <h1>Liste de contact</h1>
        <List>
        {this.props.users.map((user, index) => <ListItem button onClick={(_event) => { this.createConversation(user._id) }} key={index}>
          <ContactListItem firstname={user.firstname} lastname={user.lastname} />
        </ListItem>)}
      </List>

      <Button color="primary"><Link to="/login">Se Connecter</Link></Button>
    </div>
  }

  generateConversationId = (userId: string, target: string): string => {
    return Buffer.from([userId, target, new Date().toISOString()].join('_')).toString('base64');
  }
}

export default ContactList;