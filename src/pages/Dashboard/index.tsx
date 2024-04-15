import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function Dashboard() {
    
    const location = useLocation();

    useEffect(() => {
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