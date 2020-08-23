import React, {useState, useCallback, useRef} from 'react'
import { GoogleMap, useLoadScript, Marker, InfoWindow} from "@react-google-maps/api";
import './map.css'
import "@reach/combobox/styles.css";
import {Card,CardHeader,Divider} from '@material-ui/core'

const MAP_KEY ="AIzaSyB7sfZLERFCcGjAjkfOrmMRjf_y_Oo3KhQ"

const libraries = ["places"]

const mapContainerStyle = {
  width: 'auto',
  height: '500px'
};


const center = {
  lat: 37.551052,
  lng: 126.990964
};

const HospitalsMapBody = props => {
  const {HospitalsMapData} = props
    const { isLoaded, loadError } = useLoadScript({
      googleMapsApiKey: MAP_KEY,
      libraries,
      region: 'kr'
    })

    const [selected, setSelected ] = useState({})

    const mapRef = useRef()
    const onMapLoad = useCallback((map)=>{
      mapRef.current = map
    }, [])

   if(loadError) return "Error"
   if(!isLoaded) return "Loading..."

    return (
      <Card>
        <CardHeader
          title="가맹 병원 지도"/>
        <Divider />
        <GoogleMap
          id="map"
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={12}
          onLoad={onMapLoad}
        >
          <>
          { HospitalsMapData.map((hospital, i) => (
            <Marker 
            key={i}
            position={hospital.location}
            onClick={()=>setSelected(hospital)}
            icon={
              {url:"https://cdn2.iconfinder.com/data/icons/funtime-objects-part-2/60/005_062_point_pointer_location_geo_checkin_mobile_map-512.png",
                scaledSize : new window.google.maps.Size(40,40)}
            }
          />
          )) 
          }
          {selected.location ? (
            <InfoWindow
              position={selected.location}
              clickable={true}
              onCloseClick={()=>setSelected({})}
              >
                <div className="infowindow">
                <p>{selected.name}</p>
                <p>{selected.street_address}</p>
                </div>
              </InfoWindow>
            )
            :null
          }
          </>
        </GoogleMap>
      </Card>
    )
}

export default HospitalsMapBody