import { useEffect, useRef, useState } from "react"
import { useLocation, Link } from "react-router-dom"

import { Input } from "../../components";

import database from "../../../db/data.json";

// import datawiseLogo from "../../assets/datawise.jpg"

// model template > https://www.freepik.com/free-vector/abstract-waves-log-landing-page_5481485.htm#query=login%20template&position=11&from_view=keyword&track=ais&uuid=0962221c-7755-4fa2-9355-43bcf7514770#position=11&query=login%20template

export default function Login() {

    const location = useLocation();
    
    const [ loginValues, setLoginValues ] = useState<{ email?: string, password?: string }>({
        email: "",
        password: ""
    });

    const [ errorMessages, setErrorMessages ] = useState<{ email?: string, password?: string, general?: string }>({
        email: "",
        password: "",
        general: ""
    })

    const [ success, setSuccess ] = useState<boolean>(false);

    


    useEffect(() => {
        const layout = document.querySelector("div.layout")

        if(layout?.className)
            layout.removeAttribute("class");

        layout?.setAttribute("class", `layout ${location.pathname === "/" ? "/dashboard" : location.pathname}`)

        if(success)
            setSuccess(false)

    }, [])

    const fieldValidation = (values: typeof loginValues) => {
        console.log(values)

        if(!values.email || values.email == "" || !values.password || values.password == "" ){
            setErrorMessages({
                email: "",
                password: "",
                general: "Fill out all fields"
            })

            return false
        }

        if(!values.email?.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)){
            setErrorMessages({
                email: "Write a valid email account",
                password: "",
                general: ""
            })

            return false
        }

        setErrorMessages({
            email: "",
            password: "",
            general: ""
        })

        return true
    }

    const handleLogin = (event: React.ChangeEvent<HTMLInputElement>) => {

        setLoginValues(old => {
            return {
                ...old,
                [event.target.id]: event.target.value
            }
        })
    }

    const handleLoginSubmition = () => {
        const { users } = database;

        if(!fieldValidation(loginValues))
            return 
        

        if(!users.find(x => x.email == loginValues.email) || !users.find(x => x.password == loginValues.password)){

            setErrorMessages({
                email: "",
                password: "",
                general: "Either email or password is wrong"
            })
            console.log(loginValues)
            return
        }
        

        setTimeout(() => {
            setErrorMessages({
                email: "",
                password: "",
                general: ""
            })

            setSuccess(true)
        }, 1000)
        
    }


    

    return (
        <>
                <div  className="left" >
                    <img src={"../../assets/datawise.png"} />
                    <span>Nice to see you again</span>
                    <label>Welcome back</label>
                    <hr />
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In id eros vel libero tempus efficitur vitae sed nisl. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. </p>
                </div>
                <div className="right">
                    <h1>Login Account</h1>
                    <h5 className="login-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. In id eros vel libero tempus efficitur vitae sed nisl. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.</h5>
                    <div className="form-container">
                        <div className="login-form">
                            <Input type="email" id="email" placeholder="Email ID" onChange={handleLogin} value={loginValues.email} errorMessage={errorMessages.email} />
                            <Input type="password" id="password" placeholder="Password" onChange={handleLogin} value={loginValues.password} errorMessage={errorMessages.password} />
                        </div>
                        { errorMessages.general != "" ? 
                            <span className="general-error">{errorMessages.general}</span>
                        : null}
                        <span className="redirect">
                            <Link to="/register">
                                Not a member yet?
                            </Link>
                        </span>
                        <button type="submit" className={`submit-login ${!success ? "" : "logged-in"}`} onClick={handleLoginSubmition}>
                            { !success ? "Enter" : "Glad your back! :)"}
                        </button>
                    </div>
                </div>
        </>
    )
}