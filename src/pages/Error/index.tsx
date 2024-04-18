import { useEffect, useState } from "react";
import { Popup } from "../../components";
import { useNavigate } from "react-router-dom";
import ErrorIcon from '@mui/icons-material/Error';

export default function Error(){

    const [ open, setOpen ] = useState<boolean>(false)

    const navigation = useNavigate();

    useEffect(() => {
        const layout = document.querySelector("div.layout")

        if(layout?.className)
            layout.removeAttribute("class");

        layout?.setAttribute("class", `layout ${location.pathname === "/" ? "/dashboard" : "/error"}`)

        if(!open)
            setOpen(true)
    }, [])


    return (
        <>
            <Popup open={open} className="error-card">
                <ErrorIcon sx={{ color: "#14172e", fontSize: "120px"}} />
                <label className="error-message">Sorry, but the page your are looking for doesn't exist.</label>

                <span onClick={() => navigation("/")} className="error-link">Click here to go back</span>
            </Popup>
        </>
    )
}