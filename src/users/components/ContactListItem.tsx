import React from 'react';
import { ListItemText, Avatar, ListItemAvatar, Box} from '@material-ui/core';
// import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";





interface ContactListItemProps {
  firstname: string;
  lastname: string;
}
// const useStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     root: {
//       width: "100%",
//       maxWidth: 360,
//       backgroundColor: theme.palette.background.paper,
//     },
//   })
// );
class ContactListItem extends React.Component<ContactListItemProps>{
  
  render() {
    // const classes = useStyles();
    return (
      <div>
       <Box display="flex" >
          <ListItemAvatar>
            <Avatar className="orange">W</Avatar>
          </ListItemAvatar>
          <ListItemText className='pad'>
            Name: {this.props.firstname} {this.props.lastname}
          </ListItemText>
      </Box>
      </div>
    );
  }
}

export default ContactListItem;