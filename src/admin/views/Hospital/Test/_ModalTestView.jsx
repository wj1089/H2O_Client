import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import axios from 'axios'

import {
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button as MuiButton,
  Typography
} from '@material-ui/core';
import { Button, Modal } from 'react-bootstrap'
import ModalTestBody from './ModalTestBody';

const ModalTestView2 = () => {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage]=useState(1)
    const [postsPerPage, setPostsPerPage] = useState(10)
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => {
      setShow(true)
    }
      ;

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
              {posts.slice(0, 10).map((hospital, i) => (
                <TableRow
                key={i}
                selected={posts.indexOf(hospital.id) !== -1}
                >
                  <TableCell align="center">{hospital.hospitalNo}</TableCell>
                  <TableCell align="center">
                    <Typography>
                      <MuiButton onClick={handleShow}>
                      {hospital.hospitalName}
                      </MuiButton>
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
                          {/* ------------------------------------------------------ */}
                          <ModalTestBody value={hospital.hospitalNo} posts={posts}/>
                          {/* ------------------------------------------------------ */}
                          </Modal.Body>
                        <Modal.Footer>
                          <Button variant="primary" onClick={()=>handleClose()}>
                            저장
                          </Button>
                          <Button variant="secondary" onClick={()=>handleClose()}>
                            취소
                          </Button>
                        </Modal.Footer>

                      </Modal>
                    </Typography>
                  </TableCell>
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
        </Card>

        </>
    )
}

export default ModalTestView2
