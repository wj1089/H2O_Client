import React, {useState} from 'react'
import {HospitalsMapBody} from './components'
import {HospitalsMapData} from './components/HospitalsMapData'



const HospitalsMap = () => {
    useState(HospitalsMapData)
    return <>
        <HospitalsMapBody HospitalsMapData={HospitalsMapData}/>
    </>
}

export default HospitalsMap