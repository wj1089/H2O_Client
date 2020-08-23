import React from 'react';
import {Route} from "react-router-dom";
import CommunityTem from "./CommunityTem";
import CustomerServiceCenter from "./CustomerServiceCenter";
import QueAn from "./QueAn";
import Review from "./Review";


const TablePage = () => {

    return (
        <div>
            <Route path="/Community" exact>
                {/*<div className="main-board">*/}
                    <CommunityTem/>
                {/*</div>*/}
            </Route>

           {/* <div className="main-board">*/}
                <Route path={`/Community/Review/:boardNo`}
                       render = {(props) => <Review {...props}/>}>
                </Route>
            {/*</div>*/}

            {/* <div className="main-board">*/}
            <Route path={`/Community/CustomerServiceCenter/:boardNo`}
                   render = {(props) => <Review {...props}/>}>
            </Route>
            {/*</div>*/}


            <Route path="/Community/CustomerServiceCenter">
                {/*<div className="main-board">*/}
                    <CustomerServiceCenter/>
                {/*</div>*/}
            </Route>


            {/*/!* <div className="main-board">*!/*/}
            {/*<Route path={`/Community/QueAn/:boardNo`}*/}
            {/*       render = {(props) => <QueAn {...props}/>}>*/}
            {/*</Route>*/}
            {/*/!*</div>*!/*/}


            <Route path="/Community/QueAn">
                {/*<div className="main-board">*/}
                    <QueAn/>
                {/*</div>*/}
            </Route>


            {/*<Route path="/Community/CSFix">*/}
            {/*    <div className="main-board">*/}
            {/*        <Edit/>*/}
            {/*    </div>*/}
            {/*</Route>*/}
            {/*<Route path="/Community/QAFix">*/}
            {/*    <div className="main-board">*/}
            {/*        <Edit/>*/}
            {/*    </div>*/}
            {/*</Route>*/}
        </div>
    );
};

export default TablePage;