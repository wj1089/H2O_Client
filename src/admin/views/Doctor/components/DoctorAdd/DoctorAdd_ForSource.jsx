import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import validate from 'validate.js';
import { makeStyles } from '@material-ui/styles';
import {
  Grid,
  Button,
  IconButton,
  TextField,
  Typography
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const schema = {
    hospitalName: {
        presence: { allowEmpty: false, message: '은(는) 필수항목입니다.' },
        length: {
          maximum: 32
        }
      },
    name: {
        presence: { allowEmpty: false, message: '은(는) 필수항목입니다.' },
        length: {
      maximum: 32
    }
    },
    birthday: {
        presence: { allowEmpty: false, message: '은(는) 필수항목입니다.' },
        length: {
        maximum: 32
        }
    },
    position: {
        length: {
        maximum: 64
        }
    },
    detailData: {
        length: {
        maximum: 128
        }
    },
    specialized: {
        length: {
        maximum: 32
        }
    },
    medicalSubject: {
        presence: { allowEmpty: false, message: '은(는) 필수항목입니다.' },
        length: {
        maximum: 128
        }
    }
    };

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    height: '100%'
  },
  grid: {
    height: '100%'
  },
  quoteContainer: {
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  },
  quote: {
    backgroundColor: theme.palette.neutral,
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: 'url(/images/auth.jpg)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
  },
  quoteInner: {
    textAlign: 'center',
    flexBasis: '600px'
  },
  quoteText: {
    color: theme.palette.white,
    fontWeight: 300
  },
  name: {
    marginTop: theme.spacing(3),
    color: theme.palette.white
  },
  bio: {
    color: theme.palette.white
  },
  contentContainer: {},
  content: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  contentHeader: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: theme.spacing(5),
    paddingBototm: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  },
  logoImage: {
    marginLeft: theme.spacing(4)
  },
  contentBody: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      justifyContent: 'center'
    }
  },
  form: {
    paddingLeft: 100,
    paddingRight: 100,
    paddingBottom: 125,
    flexBasis: 700,
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    }
  },
  title: {
    marginTop: theme.spacing(3)
  },
  textField: {
    marginTop: theme.spacing(2)
  },
  policy: {
    marginTop: theme.spacing(1),
    display: 'flex',
    alignItems: 'center'
  },
  DoctorsAddButton: {
    margin: theme.spacing(2, 0)
  }
}));

const DoctorAdd_2 = props => {
  const { history } = props;

  const classes = useStyles();

  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  });
  useEffect(() => {
    const errors = validate(formState.values, schema);

    setFormState(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {}
    }));
  }, [formState.values]);

  const handleChange = event => {
    event.persist();

    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]: event.target.value
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true
      }
    }));
  };

  const handleBack = () => {
    history.goBack();
  };

  const handleDoctorsAdd = event => {
    event.preventDefault();
    history.push('/admin');
  };

  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;

  return (
    <div className={classes.root}>
      <Grid
        className={classes.grid}
        container
      >
        <Grid
          className={classes.content}
          item
          lg={7}
          xs={12}
        >
          <div className={classes.content}>
            <div className={classes.contentHeader}>
              <IconButton onClick={handleBack}>
                <ArrowBackIcon />
              </IconButton>
            </div>
            <div className={classes.contentBody}>
              <form
                className={classes.form}
                onSubmit={handleDoctorsAdd}
              >
                <Typography
                  className={classes.title}
                  variant="h2"
                >
                  의사 등록
                </Typography>
                <Typography
                  color="primary"
                  gutterBottom
                ><br/>
                  *은 필수 입력사항입니다.
                </Typography>
                <TextField
                  className={classes.textField}
                  error={hasError('hospitalName')}
                  fullWidth
                  helperText={
                    hasError('hospitalName') ? formState.errors.hospitalName[0] : null
                  }
                  label="* 소속병원"
                  name="hospitalName"
                  onChange={handleChange}
                  type="text"
                  value={formState.values.hospitalName || ''}
                  variant="outlined"
                />
                <TextField
                  className={classes.textField}
                  error={hasError('name')}
                  fullWidth
                  helperText={
                    hasError('name') ? formState.errors.name[0] : null
                  }
                  label="* 이름"
                  name="name"
                  onChange={handleChange}
                  type="text"
                  value={formState.values.name || ''}
                  variant="outlined"
                />
                <TextField
                  className={classes.textField}
                  error={hasError('birthday')}
                  fullWidth
                  helperText={
                    hasError('birthday') ? formState.errors.birthday[0] : null
                  }
                  label="* 생년월일"
                  name="birthday"
                  onChange={handleChange}
                  type="text"
                  value={formState.values.birthday || ''}
                  variant="outlined"
                />
                <TextField
                  className={classes.textField}
                  error={hasError('medicalSubject')}
                  fullWidth
                  helperText={
                    hasError('medicalSubject') ? formState.errors.medicalSubject[0] : null
                  }
                  label="* 진료과"
                  name="medicalSubject"
                  onChange={handleChange}
                  type="text"
                  value={formState.values.medicalSubject || ''}
                  variant="outlined"
                />
                <TextField
                  className={classes.textField}
                  fullWidth
                  label="직책"
                  name="position"
                  onChange={handleChange}
                  type="text"
                  variant="outlined"
                />
                <TextField
                  className={classes.textField}
                  fullWidth
                  label="전문분야"
                  name="specialized"
                  onChange={handleChange}
                  type="text"
                  variant="outlined"
                />
                <TextField
                  className={classes.textField}
                  fullWidth
                  label="상세정보"
                  name="detailData"
                  onChange={handleChange}
                  type="text"
                  variant="outlined"
                />
                
                <Button
                  className={classes.DoctorsAddButton}
                  color="primary"
                  disabled={!formState.isValid}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                >
                  등록 완료
                </Button>
              </form>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

DoctorAdd_2.propTypes = {
  history: PropTypes.object
};

export default DoctorAdd_2;