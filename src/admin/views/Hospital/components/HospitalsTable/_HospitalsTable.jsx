import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import { Button, Modal } from 'react-bootstrap';
import {
  Card,
  CardActions,
  CardContent,
  Avatar,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  TablePagination,
  Button as MuiButton
} from '@material-ui/core';
import { getInitials } from '../../../../helpers';
import HospitalInfo from '../../HospitalInfo';


const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    minWidth: 1050
  },
  nameContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  avatar: {
    marginRight: theme.spacing(2)
  },
  actions: {
    justifyContent: 'flex-end'
  }
}));


const HospitalsTable = props => {
  const { className, hospitals, ...rest } = props;

  const classes = useStyles();

  
  const [selectedHospitals, setSelectedHospitals] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

//   //------------ CheckBox -------------------------- Start
//   const handleSelectAll = event => {
//     const { hospitals } = props;

//     let selectedHospitals;

//     if (event.target.checked) {
//       selectedHospitals = hospitals.map(hospital => hospital.id);
//     } else {
//       selectedHospitals = [];
//     }

//     setSelectedHospitals(selectedHospitals);
//   };

//   const handleSelectOne = (event, id) => {
//     const selectedIndex = selectedHospitals.indexOf(id);
//     let newSelectedHospitals = [];

//     if (selectedIndex === -1) {
//       newSelectedHospitals = newSelectedHospitals.concat(selectedHospitals, id);
//     } else if (selectedIndex === 0) {
//       newSelectedHospitals = newSelectedHospitals.concat(selectedHospitals.slice(1));
//     } else if (selectedIndex === selectedHospitals.length - 1) {
//       newSelectedHospitals = newSelectedHospitals.concat(selectedHospitals.slice(0, -1));
//     } else if (selectedIndex > 0) {
//       newSelectedHospitals = newSelectedHospitals.concat(
//         selectedHospitals.slice(0, selectedIndex),
//         selectedHospitals.slice(selectedIndex + 1)
//       );
//     }

//     setSelectedHospitals(newSelectedHospitals);
//   };
// //------------ CheckBox -------------------------- End

// // ----------- Paginagion ----------------------- Start
//   const handlePageChange = (event, page) => {
//     setPage(page);
//   };

//   const handleRowsPerPageChange = event => {
//     setRowsPerPage(event.target.value);
//   };
// // ----------- Paginagion ----------------------- End

// // ModalLine-------------------------------------------- START

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

// ModalLine-------------------------------------------- END
  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    {/* <Checkbox
                      checked={selectedHospitals.length === hospitals.length}
                      color="primary"
                      indeterminate={
                        selectedHospitals.length > 0 &&
                        selectedHospitals.length < hospitals.length
                      }
                      onChange={handleSelectAll}
                    /> */}
                  </TableCell>
                  <TableCell>이름</TableCell>
                  <TableCell>홈페이지</TableCell>
                  <TableCell>병원 주소</TableCell>
                  <TableCell>연락처</TableCell>
                  <TableCell>등록일</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {hospitals.slice(0, rowsPerPage).map(hospital => (
                  <TableRow
                    className={classes.tableRow}
                    hover
                    key={hospital.id}
                    selected={selectedHospitals.indexOf(hospital.id) !== -1}
                  >
                    <TableCell padding="checkbox">
                      {/* <Checkbox
                        checked={selectedHospitals.indexOf(hospital.id) !== -1}
                        color="primary"
                        onChange={event => handleSelectOne(event, hospital.id)}
                        value="true"
                      /> */}
                    </TableCell>
                    <TableCell>
                      <div className={classes.nameContainer}>
                        <Avatar
                          className={classes.avatar}
                          src={hospital.avatarUrl}
                        >
                          {getInitials(hospital.name)}
                        </Avatar>
                        <Typography variant="body1">
                        {/* -------------------- Modal Line ------------------ */}
                        
                        <MuiButton variant="primary" onClick={handleShow}>
                          {hospital.name}
                        </MuiButton>
                        <Modal 
                          {...props} 
                          show={show} 
                          onHide={handleClose}
                          size="lg"
                          aria-labelledby="contained-modal-title-vcenter"
                          centered
                          scrollable={Boolean(true)}
                          >
                        <Modal.Header closeButton>
                          <Modal.Title>등록 병원 정보</Modal.Title>
                        </Modal.Header>
                        <Modal.Body><HospitalInfo/></Modal.Body>
                        <Modal.Footer>
                          <Button variant="primary" onClick={handleClose}>
                            저장
                          </Button>
                          <Button variant="secondary" onClick={handleClose}>
                            취소
                          </Button>
                        </Modal.Footer>
                      </Modal>
                        {/* -------------------- Modal Line ------------------ */}
                        </Typography>

                      </div>
                    </TableCell>
                    <TableCell>{hospital.homepage}</TableCell>
                    <TableCell>
                      {hospital.address}
                    </TableCell>
                    <TableCell>{hospital.phone}</TableCell>
                    <TableCell>
                      {moment(hospital.createdAt).format('DD/MM/YYYY')}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>
      <CardActions className={classes.actions}>
        <TablePagination
          component="div"
          count={hospitals.length}
          // onChangePage={handlePageChange}
          // onChangeRowsPerPage={handleRowsPerPageChange}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </CardActions>
    </Card>
  );
};

HospitalsTable.propTypes = {
  className: PropTypes.string,
  hospitals: PropTypes.array.isRequired
};

export default HospitalsTable;