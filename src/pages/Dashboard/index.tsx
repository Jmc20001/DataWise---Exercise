import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Dashboard() {
    
    const location = useLocation();
    const navigate = useNavigate();


    useEffect(() => {
        if(!localStorage.getItem("User"))
            navigate("/login");

        const layout = document.querySelector("div.layout")

        if(layout?.className)
            layout.removeAttribute("class");

        layout?.setAttribute("class", `layout ${location.pathname === "/" ? "/dashboard" : location.pathname}`)

    }, [])

    return (
        <>
            <div className={`content ${location.pathname}`}>

                <div>
                    sidenav
                </div>
                <div>
                    content
                </div>
            </div>
        </>
    )
}