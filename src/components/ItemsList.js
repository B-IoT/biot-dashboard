import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Link as RouterLink } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  list: {
    maxHeight: 300,
    overflow: 'scroll',
    marginBottom: 8,
    marginTop: -4,
  },
}));

/**
 * @param {object} props
 * @param {object} props.value the object representing the item
 */
function Item({ value }) {
  const destination = `/item/${value.id}`;
  const renderLink = React.useMemo(
    () =>
      React.forwardRef((itemProps, ref) => (
        <RouterLink
          to={{
            pathname: destination,
            item: value,
          }}
          ref={ref}
          {...itemProps}
        />
      )),
    [destination, value]
  );

  return (
    <ListItem button key={value.type} component={renderLink}>
      <ListItemText primary={value.type} secondary={'Niveau batterie: 70%'} />
    </ListItem>
  );
}

/**
 * @param {object} props
 * @param {object[]} props.items the items in the list
 */
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
