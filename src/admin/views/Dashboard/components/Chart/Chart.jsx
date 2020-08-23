import React, {useState, useEffect} from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Button,
  Menu,
  MenuItem ,
  Checkbox,
  FormGroup,
  FormControlLabel
} from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

import { ChartBar, ChartDounut, ChartMix } from './components';

// import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {},
  chartContainer: {
    height: 300,
    position: 'relative'
  },
  actions: {
    justifyContent: 'flex-end'
  },
  checkBoxStyle : {
    marginRight: theme.spacing(1)
  }
}));

// Redux

const CHART_AGE = 'CHART_AGE'
// Action

export const chartAgeAction = data => ({
  type: CHART_AGE, 
  payload: data
})
// ActionCreator

export const chartReducer = (state = {}, action) => {
  switch(action.type){
    case 'CHART_AGE': return action.payload
    default: return state
  }
}

//

const Chart = props => {
  const { className, ...rest } = props;

  const classes = useStyles();
  //
  const [anchorEl, setAnchorEl] = useState(null);
  const [chartType, setChartType] = useState("도넛형")
  // CheckBox
  const [checked, setChecked] = useState({
    checkBox_Age: false,
    checkBox_Sex: false,
    checkBox_Location: false,
    checkBox_days: false,
    checkBox_E: false,
    checkBox_ChartData: ""
  })

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const [chartValue, setChartValue] = useState("")
  const handleChange = event => {
    setChecked({checked, [event.target.name]: event.target.checked })
    if(event.target.checked===true){
      switch(event.target.name){
        case "checkBox_Age": return setChartValue("Age")
        case "checkBox_Sex": return setChartValue("Sex")
        case "checkBox_Location": return setChartValue("Location")
        case "checkBox_days": return setChartValue("Days")
      }
    }
  }
  useEffect(()=>{
    setChecked({...checked, checkBox_Age:true})
  },[])
  
  //
  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader
        action={
          <div>
          <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} size="small" variant="text" >
          
          {chartType}
        
          <ArrowDropDownIcon />
          </Button>
          <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={()=> {setAnchorEl(null); setChartType("도넛형"); }}>도넛형</MenuItem>
          <MenuItem onClick={()=> {setAnchorEl(null); setChartType("바형")}}>바형</MenuItem>
          <MenuItem onClick={()=> {setAnchorEl(null); setChartType("종합형")}}>종합형</MenuItem>
        </Menu>
        </div>}
        
        title="이용자수 통계"
      />
      <CardActions>
      <FormGroup 
        row>
        <FormControlLabel
          control={
            <Checkbox 
              checked={checked.checkBox_Age} 
              onChange={handleChange} 
              name="checkBox_Age"
              />}
            label="연령"
        />
        <FormControlLabel
          control={
            <Checkbox 
              checked={checked.checkBox_Sex} 
              onChange={handleChange} 
              name="checkBox_Sex" />}
            label="성별"
        />
        <FormControlLabel
          control={
            <Checkbox 
              checked={checked.checkBox_Location} 
              onChange={handleChange} 
              name="checkBox_Location" />}
            label="지역"
        />
        <FormControlLabel
          control={
            <Checkbox 
              checked={checked.checkBox_days} 
              onChange={handleChange} 
              name="checkBox_days" />}
            label="기간"
        />
        </FormGroup>
      </CardActions>
      <Divider />
      <CardContent>
        {chartType === "도넛형" ? 
          <ChartDounut 
            chartValue = {chartValue}/>
          : chartType === "바형"
          ? <ChartBar 
            chartValue={chartValue}/>: 
          <ChartMix 
            chartValue={chartValue}/>}
      </CardContent>
    </Card>
  );
};

Chart.propTypes = {
  className: PropTypes.string
};

export default Chart;