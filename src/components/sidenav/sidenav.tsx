import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import Popup from '../popup/popup';
import { useState } from 'react';


export default function SideNav(){

    const navigate = useNavigate()

    const [ open, setOpen ] = useState<boolean>()

    const openPopup = () => {
        return <Popup />
    }

    return (
        <>
            <div className="sidenav">
                <img src="../../assets/datawise_short.png" />
                <div className='side-links'>
                    <div className="side-body">
                        <SettingsIcon sx={{ color: "rgb(211, 211, 211, .74)", fontSize: 30, cursor: "pointer", transform: "scale(1)", transition: "200ms", ":hover": { color: "rgb(211, 211, 211, 1)", transform: "scale(1.2)" } }} /*onClick={() => setOpen(!open)}*//>
                    </div>
                    <div className='side-footer'>
                        <LogoutIcon sx={{ color: "rgb(211, 211, 211, .74)", fontSize: 30, cursor: "pointer", transform: "scale(1)", transition: "200ms", ":hover": { color: "rgb(211, 211, 211, 1)", transform: "scale(1.2)" } }} onClick={() => navigate("/login")} />
                    </div>
                </div>
            </div>

            {open ? 
                <Popup open={open}>
                    adasd
                </Popup>
            : null}
        </>
    )
}