import React from 'react';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

import { Formik, Field, Form, ErrorMessage } from 'formik';
import { TextField, Select, CheckboxWithLabel } from 'formik-material-ui';

import * as Yup from 'yup';
import { useMutation, useQueryCache } from 'react-query';

import { useSnackbar } from 'notistack';

import { createItem } from '../api/items';
import CustomCard from '../components/CustomCard';

const useStyles = makeStyles((theme) => ({
  card: {
    width: '50vw',
    height: '75vh',
    margin: theme.spacing(1),
    borderRadius: theme.borderRadius,
  },
  cardTitle: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  formItem: {
    margin: theme.spacing(1),
    minWidth: 300,
  },
  formButton: {
    height: theme.spacing(6),
    margin: theme.spacing(1),
    borderRadius: theme.borderRadius,
  },
}));

export default function AddItemPage() {
  const classes = useStyles();
  const queryCache = useQueryCache();
  const { enqueueSnackbar } = useSnackbar();

  const [mutateItems] = useMutation((item) => createItem(item), {
    onSuccess: () => {
      queryCache.invalidateQueries('items');
      queryCache.invalidateQueries('item');
    },
  });

  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      wrap={'nowrap'}
    >
      <CustomCard className={classes.card}>
        <Typography className={classes.cardTitle} variant="h6" gutterBottom>
          Ajouter un objet
        </Typography>
        <Formik
          initialValues={{
            type: 'Lit',
            service: 'Bloc 1',
            beaconId: '',
            geoTracking: false,
            maintenanceInterval: '',
          }}
          validationSchema={Yup.object({
            type: Yup.string()
              .oneOf(['Lit', 'Oxygene', 'EDC'])
              .required('Required'),
            service: Yup.string()
              .oneOf(['Bloc 1', 'Bloc 2', 'Bloc 3'])
              .required('Required'),
            beaconId: Yup.string()
              .max(10, 'Must be 10 characters or less')
              .required('Required'),
            geoTracking: Yup.boolean().required('Required'),
          })}
          onSubmit={async (values) => {
            await mutateItems({
              type: values.type,
              service: values.service,
              kontaktId: values.beaconId,
            });

            enqueueSnackbar("L'objet a été ajouté", {
              variant: 'success',
              autoHideDuration: 3000,
              anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'center',
              },
            });
          }}
        >
          {({ submitForm, isSubmitting }) => (
            <Form>
              <Grid
                container
                direction="column"
                justify="space-between"
                alignItems="center"
                wrap={'nowrap'}
              >
                <FormControl className={classes.formItem}>
                  <InputLabel htmlFor="type" variant="outlined">
                    Catégorie
                  </InputLabel>
                  <Field
                    label="Catégorie"
                    variant="outlined"
                    component={Select}
                    name="type"
                    inputProps={{
                      id: 'type',
                    }}
                  >
                    <MenuItem value={'Lit'}>Lit</MenuItem>
                    <MenuItem value={'Oxygene'}>Oxygene</MenuItem>
                    <MenuItem value={'EDC'}>EDC</MenuItem>
                  </Field>
                </FormControl>

                <FormControl className={classes.formItem}>
                  <InputLabel htmlFor="service" variant="outlined">
                    Service
                  </InputLabel>
                  <Field
                    label="Service"
                    variant="outlined"
                    component={Select}
                    name="service"
                    inputProps={{
                      id: 'service',
                    }}
                  >
                    <MenuItem value={'Bloc 1'}>Bloc 1</MenuItem>
                    <MenuItem value={'Bloc 2'}>Bloc 2</MenuItem>
                    <MenuItem value={'Bloc 3'}>Bloc 3</MenuItem>
                  </Field>
                </FormControl>

                <Field
                  className={classes.formItem}
                  component={TextField}
                  label="Id du beacon"
                  name="beaconId"
                  variant="outlined"
                />

                <Field
                  component={CheckboxWithLabel}
                  type="checkbox"
                  name="geoTracking"
                  Label={{ label: 'Géo-tracking' }}
                />
                {isSubmitting && <CircularProgress />}

                <Button
                  className={classes.formButton}
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                  onClick={submitForm}
                >
                  Ajouter
                </Button>
              </Grid>
            </Form>
          )}
        </Formik>
      </CustomCard>
    </Grid>
  );
}
