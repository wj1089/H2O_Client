import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button,
  TextField
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {}
}));

const DoctorDetails = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const [values, setValues] = useState({
    doctorNo : '1',
    doctorName: '이국종',
    age : '51',
    position: '센터장',
    detailData : {
      data1: '외과', 
      data2: '외상외과', 
      data3: '응급구조학과'},
    specialized : '대통령 표창장 수상',
    medicalSubject: {
      subject1: '외과', 
      subject2: '외상외과'},
    hospitalNo : '1'
  });

  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  // const states = [
  //   {
  //     value: 'alabama',
  //     label: 'Alabama'
  //   },
  //   {
  //     value: 'new-york',
  //     label: 'New York'
  //   },
  //   {
  //     value: 'san-francisco',
  //     label: 'San Francisco'
  //   }
  // ];

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <form
        autoComplete="off"
        noValidate
      >
        <CardHeader
          subheader="하단의 정보를 변경시 수정됩니다."
          title="의사 정보 수정"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={1}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="의사이름"
                margin="dense"
                name="name"
                onChange={handleChange}
                required
                value={values.doctorName}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="의사 나이"
                margin="dense"
                name="lastName"
                onChange={handleChange}
                required
                value={values.age}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="직책"
                margin="dense"
                name="homepage"
                onChange={handleChange}
                required
                value={values.position}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="진료 과목"
                margin="dense"
                name="phone"
                onChange={handleChange}
                required
                value={values.detailData}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="상세 내역"
                margin="dense"
                name="phone"
                onChange={handleChange}
                required
                value={values.specialized}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="전문분야"
                margin="dense"
                name="phone"
                onChange={handleChange}
                required
                value={values.medicalSubject}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions>
          <Button
            color="primary"
            variant="contained"
          >
            변경된 정보 저장
          </Button>
        </CardActions>
      </form>
    </Card>
  );
};

DoctorDetails.propTypes = {
  className: PropTypes.string
};

export default DoctorDetails;
