import { useEffect, useState } from "react"
import { useLocation, Link } from "react-router-dom"

import { Input } from "../../components";

import database from "../../../db/data.json";

export default function Register (){

    const location = useLocation();
    
    useEffect(() => {
        const layout = document.querySelector("div.layout")

        if(layout?.className)
            layout.removeAttribute("class");

        layout?.setAttribute("class", `layout ${location.pathname === "/" ? "/dashboard" : location.pathname}`)


    }, [])
    return (
        <>
            <div className="left">
                <h1>Register Account</h1>
                <h5 className="register-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. In id eros vel libero tempus efficitur vitae sed nisl. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.</h5>
                <div className="form-container">
                    <div className="register-form">
                        <div className="register-name">
                            <Input type="text" id="firstname" placeholder="John"   />
                            <Input type="text" id="lastname" placeholder="Doe"   />
                        </div>
                        <Input type="email" id="email" placeholder="Email"  />
                        <Input type="password" id="password" placeholder="Password"  />
                    </div>
                    <span className="redirect">
                        <Link to="/login">
                            Already a member?
                        </Link>
                    </span>
                    <button type="submit" className={`submit-register`} >
                        Subscribe
                    </button>
                </div>
            </div>
            <div className="right">
                <img src={"../../assets/datawise.png"} />
                <span>Nice to meet you</span>
                <label>Welcome to Datawise</label>
                <hr />
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In id eros vel libero tempus efficitur vitae sed nisl. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. </p>
            </div>
            
        </>
    )
}