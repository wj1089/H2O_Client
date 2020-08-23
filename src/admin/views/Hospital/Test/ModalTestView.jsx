import React, {useState, useEffect} from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import axios from 'axios'
import {
  Card,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableFooter,
  Button as MuiButton,
  TablePagination,
  Paper,
  Checkbox
} from '@material-ui/core';
import { Button, Modal, PageItem, Dropdown, DropdownButton} from 'react-bootstrap'
import ModalTestBody from './ModalTestBody';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
const tableStyles = makeStyles({
  table: {
    minWidth: 500,
  },
  TablePagination:{
    alignItems: "center"
  },
  color: {
    backgroundColor: "#282C34"
  }
});
const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));
const TablePaginationActions = (props) => {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage, setTablePagination } = props;
  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };
  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };
  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };
  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };
return (
  <div className={classes.root}>
    <IconButton
      onClick={handleFirstPageButtonClick}
      disabled={page === 0}
      aria-label="first page"
    >
      {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
    </IconButton>
    <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
      {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
    </IconButton>
    <IconButton
      onClick={handleNextButtonClick}
      disabled={page >= Math.ceil(count / rowsPerPage) - 1}
      aria-label="next page"
    >
      {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
    </IconButton>
    <IconButton
      onClick={handleLastPageButtonClick}
      disabled={page >= Math.ceil(count / rowsPerPage) - 1}
      aria-label="last page"
    >
      {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
    </IconButton>
  </div>
);
}
TablePaginationActions.propTypes = {
count: PropTypes.number.isRequired,
onChangePage: PropTypes.func.isRequired,
page: PropTypes.number.isRequired,
rowsPerPage: PropTypes.number.isRequired,
};
const ModalTestView = () => {
  const tableClasses = tableStyles();
    const [hospitalData, setHospitalData] = useState([])
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(false)
    const [show, setShow] = useState(false);
    // --------------Pagination ------------------------
    const [newPageSave, setNewPageSave] = useState()
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, posts.length - page * rowsPerPage);
    useEffect(()=>{
      setLoading(true);
      axios
        .get(`http://localhost:8080/hospital/hospitalList`)
        .then(response => {
          setPosts(response.data)
        })
        .catch(error => {
          alert("서버와의 연결이 되지 않았습니다.");
        })
        setLoading(false);
    }, [])
    const handleClose = () => {
      setShow(false)
    }
    // ----------------- Pagination -----------------------------
    const handleChangePage = (e, newPage) => {
      setPage(newPage);
      setNewPageSave(newPage)
    };
    const handleChangeRowsPerPage = (e) => {
      setRowsPerPage(parseInt(e.target.value, 10));
      setPage(0);
    };
    return (
        <>
        <Card>
        <TableContainer component={Paper}>
          <Table className={tableClasses.table} aria-label="custom pagination table"
          >
            <TableRow>
              <TableCell componenent="th" align="center" scope="row">No.</TableCell>
              <TableCell align="center">이름</TableCell>
              <TableCell align="center">사업자 번호</TableCell>
              <TableCell align="center">주소</TableCell>
              <TableCell align="center">병원 형태</TableCell>
              <TableCell align="center">의료인 수</TableCell>
              <TableCell align="center">연락처</TableCell>
              <TableCell align="center">위도</TableCell>
              <TableCell align="center">경도</TableCell>
              <TableCell align="center">영업상태</TableCell>
            </TableRow>
              <TableBody>
                {/* -------------pagination----------------- */}
                  {(rowsPerPage > 0
                    ? posts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    : posts
                    ).map((hospital, i) => (
                  <TableRow
                    align="center"
                    key={i}
                    onClick={()=>setHospitalData(hospital)}
                  >
                    <TableCell align="center">{hospital.hospitalNo}</TableCell>
                    <TableCell align="center">
                      <MuiButton variant="light" onClick={()=>setShow(true)}
                      >{hospital.hospitalName}
                      </MuiButton>
                    </TableCell>
                    <TableCell align="center">{hospital.businessLicenseNumber}</TableCell>
                    <TableCell align="center">{hospital.addr}</TableCell>
                    <TableCell align="center">{hospital.hospitalType}</TableCell>
                    <TableCell align="center">{hospital.medicalPeople}</TableCell>
                    <TableCell align="center">{hospital.tel}</TableCell>
                    <TableCell align="center">{hospital.latitude}</TableCell>
                    <TableCell align="center">{hospital.longitude}</TableCell>
                    <TableCell align="center">{hospital.businessStatus}</TableCell>
                  </TableRow>
                    ))}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
          )}
              </TableBody>
              {/* ---------------------- Pagination ----------------------------------- */}
              <TableFooter>
              <TableRow>
                <TablePagination
                  classesName ={tableClasses.TablePagination}
                  rowsPerPageOptions={[10, 50, 100, { label: 'All', value: -1 }]}
                  colSpan={7}
                  count={posts.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: { 'aria-label': 'rows per page' },
                    native: true,
                  }}
                  onChangePage={handleChangePage}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
            {/* ---------------------- Pagination ----------------------------------- */}
              {hospitalData.hospitalName? (
                <Modal 
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
                <Modal.Body>
                  <ModalTestBody 
                    hospitalData={hospitalData} 
                    setClose={(close)=>{setShow(close)}}
                    />
                  </Modal.Body>
              </Modal>):null}
          </Table>
        </TableContainer>
        </Card>
        {/* -----------Pagination------------ */}
        </>
    )
}
export default ModalTestView