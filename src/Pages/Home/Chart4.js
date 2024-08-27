import React from 'react'
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PersonOffIcon from '@mui/icons-material/PersonOff';

export default function Chart4() {
  return (
    <div>
        <div className='container'>
            <div className='row' >
                <div className='col-md-12 d-flex'
                style={{fontSize: "21px" ,color: "#1ba4e1",paddingTop: "5px",
                backgroundColor: "rgba(221, 241, 251, .73)",marginBottom:"15px"
                }}>
                    <div className='d-flex' style={{flexGrow:"1", }}>
                    <AirplanemodeActiveIcon/>
                    <h5>المغادرات اليوميه</h5>
                    </div>
                    <h5>0ايام</h5>
                </div>
                <div className='col-md-12 d-flex'
                style={{fontSize: "21px" ,color: "#1ba4e1",paddingTop: "5px",
                backgroundColor: "rgba(221, 241, 251, .73)",marginBottom:"15px"
                }}>
                    <div  className='d-flex' style={{flexGrow:"1"}}>
                    <AccessTimeIcon/>
                    <h5>المغادرات الساعيه</h5>
                    </div>
                    <h5>0ايام</h5>
                </div>
               
                <div className='col-md-12 d-flex'
                style={{fontSize: "21px" ,color: "#1ba4e1",paddingTop: "5px",
                backgroundColor: "rgba(221, 241, 251, .73)",marginBottom:"15px"
                }}>
                    <div  className='d-flex' style={{flexGrow:"1"}}>
                    <PersonOffIcon/>
                    <h5> الغياب</h5>
                    </div>
                    <h5>7ايام</h5>
                </div>
            </div>
        </div>
    </div>
  )
}
