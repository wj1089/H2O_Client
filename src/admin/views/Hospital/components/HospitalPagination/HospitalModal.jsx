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
  Button as MuiButton,
  Modal
} from '@material-ui/core';
import {Button} from 'react-bootstrap'
import HospitalsInfo from '../../HospitalInfo';




const HospitalModal = props => {
    const [show, setShow] = useState(false);
    const [posts, setPosts] = useState()
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    setPosts(props)

    return (
        <>
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
        <Modal.Body><HospitalsInfo posts={posts}/></Modal.Body>
        <Modal.Footer>
            <Button variant="primary" onClick={handleClose}>
            저장
            </Button>
            <Button variant="secondary" onClick={handleClose}>
            취소
            </Button>
        </Modal.Footer>
        </Modal>
        </>
    )
}

export default HospitalModal