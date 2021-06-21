import { createMuiTheme } from '@material-ui/core/styles';

const glassStyle = {
  WebkitBackdropFilter: 'blur(25px) brightness(110%)',
  backdropFilter: 'blur(25px) brightness(110%)',
  borderRadius: '15px',
  boxShadow: '0 0 20px var(--box-shadow)',
};

export const dialogTheme = createMuiTheme({
  typography: {
    button: {
      textTransform: 'none',
    },
  },
  overrides: {
    MuiPaper: {
      rounded: {
        borderRadius: '10px',
      },
      elevation1: {
        boxShadow: 'none',
      },
      elevation2: glassStyle,
      elevation4: {
        boxShadow: 'none',
      },
      elevation8: glassStyle,
    },
  },
});

export const theme = createMuiTheme({
  overrides: {
    MUIDataTableBodyCell: {
      root: {
        backgroundColor: 'none',
      },
    },
    MuiPaper: {
      root: {
        backgroundColor: 'none',
      },
      elevation1: {
        boxShadow: 'none',
      },
      elevation2: glassStyle,
      elevation4: {
        boxShadow: 'none',
      },
      elevation8: glassStyle,
    },
    MuiTableCell: {
      root: {
        borderBottom: 'none',
        fontFamily: '\'Axiforma-Regular\', Helvetica, Arial, serif',
      },
    },
    MUIDataTableHeadCell: {
      fixedHeader: {
        backgroundColor: 'none',
      },
    },
    MUIDataTableSelectCell: {
      headerCell: {
        backgroundColor: 'none',
      },
    },
    MuiButton: {
      root: {
        fontFamily: '\'Axiforma-Bold\', Helvetica, Arial, serif',
        color: 'var(--blue)',
      },
    },
    MUIDataTableFilter: {
      root: {
        backgroundColor: 'none',
      },
    },
    MUIDataTableToolbarSelect: {
      root: glassStyle,
    },
  },
});