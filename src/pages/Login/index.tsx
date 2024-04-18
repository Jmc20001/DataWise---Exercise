import { useEffect, useRef, useState } from "react"
import { useLocation, Link, useNavigation, useNavigate } from "react-router-dom"

import { Input, Loading, Shimmer } from "../../components";


// model template > https://www.freepik.com/free-vector/abstract-waves-log-landing-page_5481485.htm#query=login%20template&position=11&from_view=keyword&track=ais&uuid=0962221c-7755-4fa2-9355-43bcf7514770#position=11&query=login%20template

export default function Login() {

    const location = useLocation();
    const navigate = useNavigate();
    
    
    // vars for login form
    const [ loginValues, setLoginValues ] = useState<{ email?: string, password?: string }>({
        email: "",
        password: ""
    });

    // vars for login error messages
    const [ errorMessages, setErrorMessages ] = useState<{ email?: string, password?: string, general?: string }>({
        email: "",
        password: "",
        general: ""
    })

    // boolean for registration outcome
    const [ success, setSuccess ] = useState<boolean>(false);

    const [ load, setLoad ] = useState<boolean>(false)

    const [ loader, setLoader ] = useState<boolean>(false)


    useEffect(() => {
        // set div layout classname to include the location pathname. this will help with styling
        const layout = document.querySelector("div.layout")

        if(layout?.className)
            layout.removeAttribute("class");

        layout?.setAttribute("class", `layout ${location.pathname === "/" ? "/dashboard" : location.pathname}`)

        // clear localstorage
        localStorage.clear();

        // in case success is true we set it to false
        if(success)
            setSuccess(false)

        if(load)
            setLoad(false)

        if(loader)
            setLoader(false)

        setTimeout(() => {
            if(!load)
                setLoad(true)
        }, 2500)

    }, [])


    /**
     * Handles fields validations
     * @params loginValues
     * @returns boolean
     */
    const fieldValidation = (values: typeof loginValues) => {
        
        // checks if values are either empty or null.        
        // if so, we set a general error message and return false
        if(!values.email || values.email == "" || !values.password || values.password == "" ){
            setErrorMessages({
                email: "",
                password: "",
                general: "Fill out all fields"
            })

            return false
        }

        // check if email values meets regex requirements
        // if not, we set a specific error message - email error message - and return false
        if(!values.email?.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)){
            setErrorMessages({
                email: "Write a valid email account",
                password: "",
                general: ""
            })

            return false
        }

        // if everything checks out, we "clean" all error messages and return true
        setErrorMessages({
            email: "",
            password: "",
            general: ""
        })

        return true
    }

    /**
     * Handles fields onChange
     * @params React.ChangeEvent<HTMLInputElement>
     * @returns 
     */
    const handleLogin = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLoginValues(old => {
            return {
                ...old,
                [event.target.id]: event.target.value
            }
        })
    }

    /**
     * Handles login
     * @params 
     * @returns 
     */
    async function handleLoginSubmition() {
       
        // firstly, we call field validation function
        // if the return output is false then we abort 
        if(!fieldValidation(loginValues))
            return 
                
        try {

            // we create a get method
            await fetch("http://localhost:5000/users").then(res => {                
                // check if response is ok and send either error or response in a json format
                if(!res.ok)
                    throw Error('Error fetching users data');

                return res.json();
            }).then(data => {
                // we check if the submited values are equal with one of the users, if not we send an error message
                if(!data.find((x: { email: string | undefined; password: string | undefined; }) => x.email == loginValues.email && x.password == loginValues.password)){
                    setErrorMessages({
                        email: "",
                        password: "",
                        general: "Either email or password is wrong"
                    })
                    
                    return
                }
                
                
                setLoader(true)
                // we set a timeout - 5s
                setTimeout(() => {
                    setErrorMessages({ email: "", password: "", general: "" }) // clear error msgs

                    // send to localstorage both the id and new user flag as false
                    localStorage.setItem('User', JSON.stringify({
                        id: data.find((x: { email: string | undefined; password: string | undefined; }) => x.email == loginValues.email && x.password == loginValues.password).id,
                        newUser: false
                    }))
                    setLoader(false)
                    setSuccess(true) // set success to true
                    setTimeout(() => { navigate("/"); }, 2000) // after 2s we redirect user to dashboard
                }, 5000)
            }).catch(err => {
                // in case there's an error, we throw it
                throw err
            });
        } catch(err) {
            // in case there's an error, we throw it
            throw err
        }
    }


    

    return (
        <>  
            { !load ? 
                <>
                    <Shimmer />
                </>
            : 
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
                                <Input type="email" id="email" placeholder="Email ID" onChange={handleLogin} value={loginValues.email} errorMessage={errorMessages.email} readonly={false} />
                                <Input type="password" id="password" placeholder="Password" onChange={handleLogin} value={loginValues.password} errorMessage={errorMessages.password} readonly={false} />
                            </div>
                            { errorMessages.general != "" ? 
                                <span className="general-error">{errorMessages.general}</span>
                            : null}
                            <span className="redirect">
                                <Link to="/register">
                                    Not a member yet?
                                </Link>
                            </span>
                            <button type="submit" className={`submit-login ${!success ? "" : "logged-in"}`} onClick={handleLoginSubmition} >
                                { loader ? <Loading /> : success && !loader ? "Glad your back! :)" : "Enter"}
                                {/* { !success && !loader ? "Enter" : "Glad your back! :)"} */}
                            </button>
                        </div>
                    </div>
                </>
            }
        </>
    )
}