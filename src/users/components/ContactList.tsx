import React from 'react';
import ContactListItem from './ContactListItem';
import { User } from '../types';
import { getUsers } from '../../api/methods';
import { List, ListItem, Button } from '@material-ui/core';
// import { TextField, Button, Container, Box, Grid } from "@material-ui/core";



interface ContactListProps {
  users: User[];
}


class ContactList extends React.Component<ContactListProps> {
  render() {
    return (
      <div>
        <h1>Liste de contact</h1>
        <List>
          {this.props.users.map((user, index) => (
            <ListItem key={index}>
              <ContactListItem
                firstname={user.firstname}
                lastname={user.lastname}
              />
            </ListItem>
          ))}
        </List>
      </div>
    );
  }
}

export default ContactList;