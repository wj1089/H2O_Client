import React from "react";
import {Container,Form, Button,Table,} from "react-bootstrap";
import 'react-quill/dist/quill.snow.css';
import './styles.css'
import './community.css'
import {Link} from "react-router-dom";

const QAReview = () => {
    // const [value, setValue] = useState('')
    // const [show, setShow] = useState(false);
    // const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);

    // const modules = {
    //     toolbar: [
    //         ['bold', 'italic', 'underline', 'strike', 'link', 'image']
    //     ]
    // }
    //
    // const formats = [
    //     'bold',
    //     'italic',
    //     'underline',
    //     'strike',
    //     'link',
    //     'image'
    // ]
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
                                효과적으로 사용 할 수 있는 방법이 있을까요?
                            </textPath>
                        </td>
                        <td>2020.07.31</td>
                    </tr>
                    </tbody>
                </Table>
                <textPath>
                    <Button className="fix-btn" variant="secondary">
                        <Link to='/QAFix'>수정하기</Link></Button>
                </textPath>
                <Form.Group className="comment">
                    <textPath >댓글 :</textPath>
                    <Form.Control type="text" placeholder="Normal text" className="comment-box"/>
                    <Button className="fix-btn" variant="secondary" >
                        <Link to='/QAReview'>댓글달기</Link>
                    </Button>
                </Form.Group>

            </div>
        </Container>
    );
};

export default QAReview;

