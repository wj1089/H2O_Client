import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import axios from 'axios'

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
import Posts from './Pagination';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const HospitalPagination3 = () => {7

  const classes = useStyles();

  const [selectedHospitals, setSelectedHospitals] = useState([]);

  // --pagination -------- Start
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage]=useState(1)
  const [postsPerPage, setPostsPerPage] = useState(10)

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => currentPage+1;
  const prevPage = () => currentPage-1;

  // -- pagiatnion ---



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
  
  return (
    <>
      <Card>
        <CardContent>
          <Table
          >
            <TableHead>
              <TableCell>No.</TableCell>
              <TableCell>이름</TableCell>
              <TableCell>사업자 번호</TableCell>
              <TableCell>로고</TableCell>
              <TableCell>주소</TableCell>
              <TableCell>병원 형태</TableCell>
              <TableCell>의료인 수</TableCell>
              <TableCell>연락처</TableCell>
              <TableCell>위도</TableCell>
              <TableCell>경도</TableCell>
            </TableHead>
            <TableBody
            >
              {posts.slice(0, 10).map(hospital => (
                <TableRow
                key={hospital.hospitalNo}
                selected={posts.indexOf(hospital.id) !== -1}
                >
                  <TableCell align="center">{hospital.hospitalNo}</TableCell>
                  <TableCell align="center">{hospital.hospitalName}</TableCell>
                  <TableCell align="center">{hospital.businessLicenseNumber}</TableCell>
                  <TableCell align="center">{hospital.logo}</TableCell>
                  <TableCell align="center">{hospital.addr}</TableCell>
                  <TableCell align="center">{hospital.hospitalType}</TableCell>
                  <TableCell align="center">{hospital.medicalPerson}</TableCell>
                  <TableCell align="center">{hospital.tel}</TableCell>
                  <TableCell align="center">{hospital.latitude}</TableCell>
                  <TableCell align="center">{hospital.longitude}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardActions>
        <div className="container">
          <Posts posts={currentPosts} loading={loading} />
          <Pagination postsPerPage={postsPerPage} totalPosts={posts.length} paginate={paginate} />
        </div>
        </CardActions>
      </Card>
    </>
  )
}
export default HospitalPagination3
