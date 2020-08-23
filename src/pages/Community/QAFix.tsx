import React, {useState} from "react";
import {Container, Button,Modal,Table,} from "react-bootstrap";
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';
import './styles.css'
import './community.css'
import {Link} from "react-router-dom";

const CSFix = () => {
    const [value, setValue] = useState('')
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
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

            <div className="Rev-tab">
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
                                Donald J. Trump @realDonaldTrump
                            </textPath>
                        </td>
                        <td>
                            <textPath>
                                <ReactQuill
                                    theme="snow"
                                    value={value}
                                    onChange={setValue}
                                    modules={modules}
                                    formats={formats}
                                ><textPath>
                                    효과적으로 사용 할 수 있는 방법이 있을까요?
                                </textPath>
                                </ReactQuill>
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
                                <Link to="/QAReview">Cancel</Link>
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
                            <Button  onClick={handleClose}>
                                Submit
                            </Button>
                        </Modal.Footer>
                    </Modal>

                </div>

            </div>
        </Container>
    );
};

export default CSFix;

