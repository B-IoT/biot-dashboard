import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import RoomIcon from '@material-ui/icons/Room';
import BuildIcon from '@material-ui/icons/Build';

import { Link as RouterLink } from 'react-router-dom';

import { drawerWidth } from '../utils/constants';

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
}));

/**
 * @param {object} props
 * @param {string} props.name the name to display alongside the icon
 * @param {React.ComponentElement} props.icon the MaterialUI icon to display
 * @param {string} props.to the destination route when the item is clicked
 */
function DrawerItem({ name, icon, to }) {
  const renderLink = React.useMemo(
    () =>
      React.forwardRef((itemProps, ref) => (
        <RouterLink to={to} ref={ref} {...itemProps} />
      )),
    [to]
  );

  return (
    <ListItem button key={name} component={renderLink}>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={name} />
    </ListItem>
  );
}

DrawerItem.propTypes = {
  icon: PropTypes.element.isRequired,
  name: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

/**
 * @param {object} props
 * @param {boolean} props.isOpen true if the drawer is open, false otherwise
 * @param {function} props.handleDrawerClose function that is used to close the drawer
 */
export default function MenuDrawer({ isOpen, handleDrawerClose }) {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="left"
      open={isOpen}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.drawerHeader}>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === 'ltr' ? (
            <ChevronLeftIcon />
          ) : (
            <ChevronRightIcon />
          )}
        </IconButton>
      </div>
      <Divider />
      <List>
        <DrawerItem name="Accueil" to="/" icon={<HomeIcon />} />
        <DrawerItem name="Localisation" to="/items" icon={<RoomIcon />} />
        <DrawerItem name="Maintenance" to="/maintenance" icon={<BuildIcon />} />
      </List>
    </Drawer>
  );
}

MenuDrawer.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleDrawerClose: PropTypes.func.isRequired,
};
