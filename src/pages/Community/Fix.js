import React, {useEffect, useState} from "react";
import {Container,Form, Button,Modal,Table,Col} from "react-bootstrap";
import {Link, useHistory} from "react-router-dom";
import './styles.css'
import './community.css'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';
import axios from "axios"


const Fix = ({match}) => {
    const [show, setShow] = useState(false);
    const history = useHistory();
    const [value, setValue] = useState('')
    const [title, setTitle] = useState('')
    const [postList, setPostList] = useState('')

    const handleClose = (e) => {
        e.preventDefault();
        history.push("/Review")
        setShow(false);
    }


    const getContent = e =>{
        e.preventDefault();
        console.log(`title ${setPostList}`)
        axios
            .get(`http://localhost:8080/board/list/medCategory/${match.params.boardNo}`)
            .then((res)=>{
                sessionStorage.setItem("board",JSON.stringify(res.data))
                setPostList(res.data)
                setTitle(res.data)
            })
            .catch((err)=>{
                throw err;
            })
    }

    useEffect(() => {
        // const title =sessionStorage.getItem("title")
        // setTitle(title)
        // setBoardNo(match.params.boardNo)
        axios
            .get(`http://localhost:8080/board/list/medCategory/${match.params.boardNo}`)
            .then((res)=>{
                // console.log(data);
                // setPostList(data)
                setTitle(res.data.title)
                setValue(res.data.value)
            })
            .catch((err)=>{
                throw err;
            })
    }, [])

    const newContant = e =>{
        e.preventDefault()
        const board ={
            title : title,
            content : value,
        }
        if(title ==="" || value ==="" ){
            alert('입력창을 다채워주세요')
        }else{
            axios
                .patch(`http://localhost:8080/board/update/${match.params.boardNo}`, board)
                .then((res)=>{
                    console.log(res.data)
                    window.location.href="/Community"
                })
                .catch((err)=>{
                    throw err;
                })
        }
    }


    const handleShow = () => setShow(true);

    const modules = {
        toolbar: [
            ['bold', 'italic', 'underline', 'strike', 'link', 'image']
        ]
    }

    const formats = [
        'bold',
        'italic',
        'underline',
        'strike',
        'link',
        'image'
    ]
    return (
        <Container>
            <div>
                <textPath><Link to="/https://twitter.com/realdonaldtrump">Donald J. Trump @realDonaldTrump 님 게시글</Link></textPath>
                <Table striped bordered hover size="sm">
                    <thead>
                    <tr>
                        <th style={{width:"180px"}}>사용자</th>
                        <th>내용</th>
                        <th style={{width:"150px"}}>게시날짜</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr className="Rev">
                        <td>
                            <textPath
                                className="use-pic">
                                <img src="https://search.pstatic.net/common?type=a&size=120x150&quality=95&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2F7%2F201804241120041041.jpg"/>
                                Donald J. Trump @realDonaldTrump
                                <Form.Group>
                                    <Form.File className="fixfile" />
                                </Form.Group>
                            </textPath>

                        </td>
                        <td>
                            <textPath
                                value={value}
                                onChange={getContent}
                            >
                                <Form.Label column sm={1} style={{textAlign : 'center'}}>
                                    제목
                                </Form.Label>
                                <Col>
                                    <Form.Control onChange={e=>setTitle(e.target.value)} value={title} as="input"/>
                                </Col>
                                <ReactQuill
                                    theme="snow"
                                    value={value}
                                    onChange={setValue}
                                    modules={modules}
                                    formats={formats}
                                />
                                    {postList.title}
                            </textPath>
                        </td>
                        <td>2020.07.31</td>
                    </tr>
                    </tbody>
                </Table>
                <div className="fix-btn">
                    <tr>
                        <td>
                            <Button className="fix-sub" variant="primary" onClick={handleShow}
                            >Submit
                            </Button>
                        </td>
                        <td>
                            <Button className="fix-can" variant="danger">
                                <Link to="/Review">Cancel</Link>
                            </Button>
                        </td>
                    </tr>
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>전송 확인</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>입력하신 데이터를 업로드하시겠습니까?</Modal.Body>
                        <Modal.Footer>
                            <Button onClick={handleClose}>
                                Close
                            </Button>
                            <Button  onClick={newContant}>
                                Submit
                            </Button>
                        </Modal.Footer>
                    </Modal>

                </div>
            </div>
        </Container>
    );
};

export default Fix;

