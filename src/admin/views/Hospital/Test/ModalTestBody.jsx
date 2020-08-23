import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';

import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button,
  TextField,
  Checkbox, 
  FormControlLabel, 
  FormGroup, 
  Box
} from '@material-ui/core';
import Axios from 'axios';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  }
}));

const ModalTestBody = (props) => {
    const classes = useStyles();
    const {hospitalData, setClose, className} = props
    // const {hospitalData} = props    
    const [hospitalNo, setHospitalNo] = useState(hospitalData.hospitalNo)
    const [hospitalName, setHospitalName] = useState(hospitalData.hospitalName)
    const [businessLicenseNumber, setBusinessLicenseNumber] = useState(hospitalData.businessLicenseNumber)
    const [businessStatus, setBusinessStatus] = useState(hospitalData.businessStatus);
    const [tel, setTel] = useState(hospitalData.tel)
    const [addr, setAddr] = useState(hospitalData.addr)
    const [hospitalType, setHospitalType] = useState(hospitalData.hospitalType)
    const [medicalPeople,setMedicalPeople] = useState(hospitalData.medicalPeople)
    const [hospitalRoom,setHospitalRoom] = useState(hospitalData.hospitalRoom)
    const [hospitalBed,setHospitalBed] = useState(hospitalData.hospitalBed)
    const [hospitalArea,setHospitalArea] = useState(hospitalData.hospitalArea)
    const [typeDetail,setTypeDetail] = useState(hospitalData.typeDetail)
    const [latitude, setLatitude] = useState(hospitalData.latitude)
    const [longitude, setLongitude] = useState(hospitalData.longitude)
    // const [close, setClose]= useState()
    const [values, setValues] = useState([]);
    
    const [checked, setChecked] = useState({
      checkBox1 : false,
      checkBox2 : false,
    })

    const history = useHistory();

    useEffect(()=>{
      switch(hospitalData.businessStatus){
        case `영업중`: return setChecked({...checked, checkBox1:true})
        case `폐업`: return setChecked({...checked, checkBox2:true})
      }
    }, [])


    const handleClose = () => {
      setClose(false);
    }
    
    // const handleChange = event => {
    //   setValues({
    //     ...values,
    //     [event.target.name]: event.target.value
    //   });
    // };
    const handleCheckBox = event => {
      setChecked({checked, [event.target.name]: event.target.checked })
      if(event.target.checked===true){
        switch(event.target.name){
          case "checkBox1": return setBusinessStatus("영업중")
          case "checkBox2": return setBusinessStatus("폐업")
          default : return setBusinessStatus(); 
        }
        
      }
    }
   
    const handelModify = e => {
      const hospitalJson = {
        hospitalNo : hospitalNo,
        hospitalName: hospitalName,
        businessLicenseNumber: businessLicenseNumber,
        businessStatus: businessStatus,
        tel : tel,
        addr : addr,
        hospitalType : hospitalType,
        medicalPeople : medicalPeople,
        hospitalRoom : hospitalRoom,
        hospitalBed : hospitalBed,
        hospitalArea : hospitalArea,
        typeDetail : typeDetail,
        latitude : latitude,
        longitude : longitude,
      }
      Axios
        .patch(`http://localhost:8080/hospital/modify/${businessLicenseNumber}`, hospitalJson)
        .then(response => {
          alert("병원 데이터 변경 성공")
          setClose(false);
          
          history.push("/admin")
          history.push("/admin/hospital")

        })
        .catch(
          error => {
            alert("병원 데이터 변경 실패")
            throw(error)
          }  
        )
    }
    return (
      
      <Card
        className={clsx(classes.root, className)}
      >
        <form
          autoComplete="off"
          noValidate
        >
          <CardHeader
            title={<h3>{hospitalData.hospitalName}</h3>}
            space={3}
             />
          <Divider />
          <CardContent>
            <Grid
              container
              spacing={2}
            >
              
              <Grid
                item
                md={12}
                xs={12}
              >
                <TextField
                  fullWidth
                  defaultValue={hospitalData.businessLicenseNumber}
                  disabled 
                  label="사업자 등록 번호"
                  margin="dense"
                  name="businessLicenseNumber"
                  onChange={e => setBusinessLicenseNumber(e.target.value)}
                  required
                  value={values.businessLicenseNumber}
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                md={12}
                xs={12}
              >
                <TextField
                  fullWidth
                  defaultValue={hospitalData.addr}
                  label="병원 주소"
                  margin="dense"
                  name="addr"
                  onChange={e => setAddr(e.target.value)}
                  required
                  value={values.addr}
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                md={12}
                xs={12}
              >
                  <FormGroup row>
                    <Box 
                      marginRight="Auto"
                      width="100px"
                      name="businessStatus"
                      className={classes.boxCss}
                      margin-right="10px">{"영업상태"}</Box>
                    <FormControlLabel
                      control={ 
                        <Checkbox
                          checked={checked.checkBox1}
                          onChange={handleCheckBox}
                          name="checkBox1"
                          />}
                          label="영업"
                      />
                    <FormControlLabel
                    control={ 
                      <Checkbox
                        defaultChecked
                        checked={checked.checkBox2}
                        onChange={handleCheckBox}
                        name="checkBox2"
                        />}
                        label="폐업"
                      />
                    </FormGroup>
                </Grid>
              <Grid
                item
                md={12}
                xs={12}
              >
                <TextField
                  fullWidth
                  defaultValue={hospitalData.hospitalType}
                  label="병원 형태"
                  margin="dense"
                  name="hospitalType"
                  onChange={e => setHospitalType(e.target.value)}
                  required
                  value={values.hospitalType}
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                md={12}
                xs={12}
              >
                <TextField
                  fullWidth
                  defaultValue={hospitalData.medicalPeople}
                  label="의료인수"
                  margin="dense"
                  name="medicalPeople"
                  onChange={e => setMedicalPeople(e.target.value)}
                  required
                  value={values.medicalPeople}
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                md={12}
                xs={12}
              >
                <TextField
                  fullWidth
                  defaultValue={hospitalData.tel}
                  label="연락처"
                  margin="dense"
                  name="tel"
                  onChange={e => setTel(e.target.value)}
                  required
                  value={values.tel}
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                md={12}
                xs={12}
              >
                <TextField
                  fullWidth
                  defaultValue={hospitalData.latitude}
                  label="위도"
                  margin="dense"
                  name="latitude"
                  onChange={e => setLatitude(e.target.value)}
                  required
                  value={values.latitude}
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                md={12}
                xs={12}
              >
                <TextField
                  fullWidth
                  defaultValue={hospitalData.longitude}
                  label="경도"
                  margin="dense"
                  name="longitude"
                  onChange={e => setLongitude(e.target.value)}
                  required
                  value={values.longitude}
                  variant="outlined"
                />
              </Grid>
            </Grid>
          </CardContent>
          <Divider />
          <CardActions>
          <Button onClick={e => {handelModify()}}
              color="primary"
              variant="contained"
            >
              변경된 정보 저장
            </Button>
            <Button onClick={e => {handleClose()}}
              variant="contained" 
              color="secondary"
            >
              취소
            </Button>
          </CardActions>
        </form>
      </Card>
    );
  };
  
  ModalTestBody.propTypes = {
    className: PropTypes.string
  };
  
  export default ModalTestBody;