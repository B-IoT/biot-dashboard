import React from 'react';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

import { Formik, Field, Form, ErrorMessage } from 'formik';
import { TextField, Select, CheckboxWithLabel } from 'formik-material-ui';

import * as Yup from 'yup';

export default function AddItemPage() {
  return (
    <Formik
      initialValues={{
        type: '',
        service: '',
        nbBeacons: '',
        geoTracking: false,
        maintenanceInterval: '',
      }}
      validationSchema={Yup.object({
        type: Yup.string()
          .max(15, 'Must be 15 characters or less')
          .required('Required'),
        service: Yup.string()
          .max(20, 'Must be 20 characters or less')
          .required('Required'),
        email: Yup.string().email('Invalid email address').required('Required'),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      {({ submitForm, isSubmitting }) => (
        <Form>
          <FormControl>
            <InputLabel htmlFor="type">Catégorie</InputLabel>
            <Field
              component={Select}
              name="type"
              inputProps={{
                id: 'type',
              }}
            >
              <MenuItem value={''}></MenuItem>
              <MenuItem value={'Lit'}>Lit</MenuItem>
              <MenuItem value={'Oxygene'}>Oxygene</MenuItem>
              <MenuItem value={'EDC'}>EDC</MenuItem>
            </Field>
          </FormControl>
          <br />
          <FormControl>
            <InputLabel htmlFor="service">Service</InputLabel>
            <Field
              component={Select}
              name="service"
              inputProps={{
                id: 'service',
              }}
            >
              <MenuItem value={''}></MenuItem>
              <MenuItem value={'Bloc 1'}>Bloc 1</MenuItem>
              <MenuItem value={'Bloc 2'}>Bloc2</MenuItem>
              <MenuItem value={'Bloc 3'}>Bloc3</MenuItem>
            </Field>
          </FormControl>
          <br />
          <br />
          <Field
            component={TextField}
            label="Numéro de beacons"
            type="number"
            name="nbBeacons"
            variant="outlined"
          />
          <br />
          <br />
          <Field
            component={CheckboxWithLabel}
            type="checkbox"
            name="geoTracking"
            Label={{ label: 'Géo-tracking' }}
          />
          {isSubmitting && <CircularProgress />}
          <br />
          <Button
            variant="contained"
            color="primary"
            disabled={isSubmitting}
            onClick={submitForm}
          >
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
}
