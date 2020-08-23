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
import axios from 'axios'


const schema = {
  userId: {
    presence: { allowEmpty: false, message: '은(는) 필수항목입니다.' },
    length: {
      maximum: 32
    }
  },
  password: {
    presence: { allowEmpty: false, message: '은(는) 필수항목입니다.' },
    length: {
    maximum: 32
    }
  },
  passwordConfirm: {
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
  phone: {
    presence: { allowEmpty: false, message: '은(는) 필수항목입니다.' },
    length: {
    maximum: 32
    }
  },
  addr: {
      length: {
      maximum: 64
      }
  },
  email: {
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

const UserAdd_2 = props => {
  const { history } = props;

  const classes = useStyles();

  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("")
  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  });

  const handleIdCheck = e => {
    e.preventDefault();
    axios.get(`http://localhost:8080/user/idCheck/${formState.values.userId}`)
        .then(response => {
          alert("이미 존재하는 아이디 입니다.");
          setUserId("");
        }).catch(error => {
      alert("사용한 가능한 아이디 입니다.");
    })
  }


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
                  사용자 등록
                </Typography>
                <Typography
                  color="primary"
                  gutterBottom
                ><br/>
                  *은 필수 입력사항입니다.
                </Typography>
                <Grid
                item xs={8}>
                <TextField
                  className={classes.textField}
                  error={hasError('userId')}
                  fullWidth
                  helperText={
                    hasError('userId') ? formState.errors.userId[0] : null
                  }
                  label="* 아이디"
                  name="userId"
                  onChange={e => setFormState(e.target.value)}
                  type="text"
                  value={formState.values.userId || ''}
                  variant="outlined"
                />
                </Grid>
                <Grid item xs={4}
                  container
                  direction="column"
                  justify="flex-end"
                  alignItems="flex-end"
                 >
                  <Button variant="outlined" color="secondary" onClick={handleIdCheck}>
                    아이디<br/>
                    중복 확인
                  </Button>
                </Grid>
                <TextField
                  className={classes.textField}
                  error={hasError('password')}
                  fullWidth
                  helperText={
                    hasError('password') ? formState.errors.password[0] : null
                  }
                  type="password"
                  label="* 패스워드"
                  name="password"
                  onChange={handleChange}
                  value={formState.values.password || ''}
                  variant="outlined"
                />
                <TextField
                  className={classes.textField}
                  error={hasError('passwordConfirm')}
                  fullWidth
                  helperText={
                    hasError('passwordConfirm') ? formState.errors.passwordConfirm[0] : null
                  }
                  label="* 패스워드 확인"
                  type="password" 
                  name="passwordConfirm"
                  onChange={handleChange}
                  value={formState.values.passwordConfirm || ''}
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
                  error={hasError('phone')}
                  fullWidth
                  helperText={
                    hasError('phone') ? formState.errors.phone[0] : null
                  }
                  label="* 연락처"
                  name="phone"
                  onChange={handleChange}
                  type="text"
                  value={formState.values.phone || ''}
                  variant="outlined"
                />
                <TextField
                  className={classes.textField}
                  fullWidth
                  label="주소"
                  name="addr"
                  onChange={handleChange}
                  type="text"
                  variant="outlined"
                />
                <TextField
                  className={classes.textField}
                  fullWidth
                  label="이메일"
                  name="email"
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

UserAdd_2.propTypes = {
  history: PropTypes.object
};

export default UserAdd_2;