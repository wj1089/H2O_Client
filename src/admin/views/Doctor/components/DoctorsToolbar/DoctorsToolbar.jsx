import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Button } from '@material-ui/core';
import { SearchInput } from '../../../../components';

const useStyles = makeStyles(theme => ({
  root: {},
  row: {
    height: '42px',
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(1)
  },
  spacer: {
    flexGrow: 1
  },
  headline: {
    marginLeft: theme.spacing(1)
  },
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  },
  searchInput: {
    marginRight: theme.spacing(1)
  }
}));

const DoctorsToolbar = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <div className={classes.row}>
        <h1 className={classes.headline}>병원 관리</h1>
        <span className={classes.spacer} />
        <Button 
          className={classes.importButton}
          >
            Import
        </Button>
        <Button 
        className={classes.exportButton}
          >Export
        </Button>
        <Link to="/admin/DoctorsAdd">
        <Button
          color="primary"
          variant="contained"
          >
          의사 등록
          </Button>
        </Link>
      </div>
      <div className={classes.row}>
        <SearchInput
          className={classes.searchInput}
          placeholder="의사 검색"
        />
      </div>
    </div>
  );
};

DoctorsToolbar.propTypes = {
  className: PropTypes.string
};

export default DoctorsToolbar;
