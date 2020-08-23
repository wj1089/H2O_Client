import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';

import { HospitalsToolbar, HospitalsTable } from './components';
import ModalTestView from './Test/ModalTestView';


const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const HospitalList = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <HospitalsToolbar />
      <div className={classes.content}>
        {/* <HospitalsTable hospitals={hospitals} /> */}
        {/* <HospitalPagination/> */}
        {/* <HospitalPagination2/> */}
        <ModalTestView/>
      </div>
    </div>
  );
};

export default HospitalList;
