import React, {useState,useEffect} from 'react';
import './community.css'
import {Button, Table,Form,Col} from "react-bootstrap";
import axios from 'axios'
import {Link, useHistory} from "react-router-dom";
import {MDBIcon} from "mdbreact";

const CommunityTem = () => {
    const [postList, setPostList] = useState([])
    const [medCategory, setMedCategory] = useState('')
    const [sendList, setSendList] = useState([])
    const [creationDate, setCreationDate] = useState('')
    const [click, setClick] = useState(0);
    const [state, setState] = useState('')
    const history = useHistory()


    useEffect(() => {
        axios
          .get('http://localhost:8080/board/list/get/boardUser')
          .then(({data})=>{
              console.log(data);
              setPostList(data);
              setCreationDate(data);
              setClick(data);
          })
          .catch((err)=>{
              throw err;
          })
    }, [])


    const changeCategory = (e) => {
        setMedCategory(e.target.value)
        console.log("test")
        if (e.target.value==='전체보기'){
            setSendList(postList)
        }else{
            setSendList([])
            console.log(e.target.value)
            postList.forEach(post=>{
                if (post.medCategory===e.target.value) {
                    console.log(post)
                    setSendList((sendList)=>[...sendList, post])
                }
            })
        }
    }

    const handleClick=()=>{
        setState(state.value+1);
    }


    const getBoard = () =>{
        console.log(medCategory)
        axios
          .get(`http://localhost:8080/board/list`)
          .then((res)=>{
              //sessionStorage.setItem("board",JSON.stringify(res.data))
              //console.log(res.data)
              setPostList(res.data)
              // window.location.href="/board/Fix"
          })
          .catch((err)=>{
              throw err;
          })
    }
    const getPost = (e,value)=>{
        e.preventDefault()
        alert(value)
        //sessionStorage.setItem("title",value)
        window.location.href="/Review"
    }




    return (
      <>
          <div>
              <Table
                className="community-table"
                responsive hover style={{ textAlign: "center" }}>
                  <thead>
                  <tr>
                      <th className="form-num">번호</th>
                      <th className="form-user">사용자ID</th>
                      <th className="form-select">
                          <select
                            value={medCategory}
                            onChange={changeCategory}
                            className="table-menusize"
                          >
                              <option>*진료과구분</option>
                              <option>전체보기</option>
                              <option>정형외과</option>
                              <option>내과</option>
                              <option>성형외과</option>
                              <option>흉부외과</option>
                              <option>마취통증의학과</option>
                              <option>가정의학과</option>
                              <option>정신과</option>
                              <option>이비인후과</option>
                              <option>일반외과</option>
                              <option>재활의학과</option>
                              <option>신경과</option>
                              <option>소아과</option>
                              <option>피부과</option>
                              <option>여성의학과</option>
                          </select>
                      </th>
                      <th>
                          게시물 제목 검색:
                          <Form.Row>
                              <Col className="searching" >
                                  <Form.Control  type="text" placeholder="검색어 입력" />
                              </Col>
                          </Form.Row>
                      </th>
                      <th className="form-select">등록날짜</th>
                      <th className="form-select">조회수</th>
                  </tr>
                  </thead>
                  <tbody>
                  {sendList && sendList.reverse().map((info,i)=>(
                    <tr key={i}>
                        <td className="table-menusize">{i+1}</td>
                        <td className="table-menusize">empty</td>
                        {/*<td>{info.user.userId}</td>*/}
                        <td className="table-menusize">{info.medCategory}</td>
                        <td className="table-menusize"
                            id="title" onClick={()=>setClick(click+1)}>
                            <Link to={`/Community/Review/${info.boardNo}`}>{info.title}</Link>
                        </td>
                        {/*<td>{info.content}</td>*/}
                        <td className="table-menusize">{info.creationDate}</td>
                        <td className="table-menusize">{info.click}</td>
                    </tr>
                  ))}
                  </tbody>
              </Table>

              <div className="button-right">
                  <Button variant="outline-dark " onClick={()=>{history.push('/Edit')}}><MDBIcon far icon="edit" />글쓰기</Button>
              </div>

          </div>
      </>
    );
};

export default CommunityTem;