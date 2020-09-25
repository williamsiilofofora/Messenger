import React from 'react';
import ContactListItem from './ContactListItem';
import { List, ListItem, Button } from '@material-ui/core';
import history from '../../history';
import { Link } from 'react-router-dom';
import { IProfile } from '../../profile/types';
import { connect } from 'react-redux';
import { IAppState } from '../../appReducer';
import { makeEnsureConversation } from "../../conversation/actions/makeEnsureConversation";
// import { TextField, Button, Container, Box, Grid } from "@material-ui/core";



interface ContactListProps {
  users: IProfile[];
  connectedUser?: IProfile;
  makeEnsureConversation: (conversationId: string, target: string) => void;
}


class ContactList extends React.Component<ContactListProps> {
  createConversation = (target: string) => {
    const { connectedUser } = this.props;
    if (connectedUser) {
      const conversationId = this.generateConversationId(connectedUser._id, target);
      this.props.makeEnsureConversation(conversationId, target);
      return history.push(`/conversation/${conversationId}?target=${target}`);
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

const mapStateToProps = ({ profile }: IAppState) => ({
  users: profile.list,
  connectedUser: profile.connectedProfile,
});
const mapDispatchToProps = (dispatch: any) => ({
  makeEnsureConversation: (conversationId: string, target: string) =>
    dispatch(makeEnsureConversation(conversationId, target)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ContactList);