import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { DoctorsTable, DoctorsToolbar}  from './components';
import mockData from './data';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const DoctorsList = () => {
  const classes = useStyles();

  const [doctors] = useState(mockData);

  return (
    <div className={classes.root}>
      <DoctorsToolbar />
      <div className={classes.content}>
        <DoctorsTable doctors={doctors} />
      </div>
    </div>
  );
};

export default DoctorsList;
