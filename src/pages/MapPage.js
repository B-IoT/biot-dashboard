import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import * as mapwize from 'mapwize-ui';

const useStyles = makeStyles((theme) => ({
  map: {
    width: '400px',
    height: '400px',
  },
}));

export default function MapPage() {
  const classes = useStyles();

  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.innerHTML = `
    var API_KEY = "4f651477cbc907c5bd6e5b4a84a27a57";

    window.onload = function () {
      MapwizeUI.map(API_KEY);
    }
    `;
    
    document.body.appendChild(script);

    return () => document.body.removeChild(script);
  }, []);

  return <div className={classes.map} id="mapwize"></div>;
}
