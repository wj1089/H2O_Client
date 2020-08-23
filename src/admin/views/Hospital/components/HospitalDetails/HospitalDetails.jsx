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

const HospitalDetails = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const [values, setValues] = useState({
    name: '연세 세브란스 병원',
    address: '서울 서대문구 연세로 50-1',
    homepage: 'https://sev.iseverance.com/index',
    phone: '304-428-3097'
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
          title="병원 정보 수정"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={5}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                // helperText="병원명을 입력하세요."
                label="병원명"
                margin="dense"
                name="name"
                onChange={handleChange}
                required
                value={values.name}
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
                label="병원 주소"
                margin="dense"
                name="lastName"
                onChange={handleChange}
                required
                value={values.address}
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
                label="병원 주소"
                margin="dense"
                name="homepage"
                onChange={handleChange}
                required
                value={values.homepage}
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
                label="병원 연락처"
                margin="dense"
                name="phone"
                onChange={handleChange}
                required
                value={values.phone}
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

HospitalDetails.propTypes = {
  className: PropTypes.string
};

export default HospitalDetails;
