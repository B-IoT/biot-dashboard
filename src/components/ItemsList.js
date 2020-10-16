import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles((theme) => ({
  list: {
    maxHeight: 300,
    overflow: 'scroll',
    marginBottom: 4,
    marginTop: -4
  },
}));

function Item({ value, ...otherProps }) {
  const classes = useStyles();
  return (
    <ListItem className={classes.listItem} button key={value.type}>
      <ListItemText primary={value.type} secondary={'Niveau batterie: 70%'} />
    </ListItem>
  );
}

export default function ItemsList({ items }) {
  const classes = useStyles();
  // TODO: potentially use react-window to increase performance
  return (
    <List className={classes.list}>
      {items.map((item) => (
        <Item value={item} />
      ))}
    </List>
  );
}
