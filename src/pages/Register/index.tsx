import { useEffect, useState } from "react"
import { useLocation, Link, useNavigate } from "react-router-dom"

import { Input, Shimmer, Loading } from "../../components";
import uuid from "react-uuid";

export default function Register (){

    const location = useLocation();
    const navigate = useNavigate();

    // boolean for registration outcome
    const [ success, setSuccess ] = useState<boolean>(false)

    // vars for registration form
    const [ registerValues, setRegisterValues ] = useState<{ firstName?: string, lastName?:string, email?: string, password?: string }>({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    });
    
    // vars for registration error messages
    const [ errorMessages, setErrorMessages ] = useState<{ email?: string, password?: string, general?: string }>({
        email: "",
        password: "",
        general: ""
    })
    
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
        }, 2000)
    }, [])

    
    /**
     * Handles fields onChange
     * @params React.ChangeEvent<HTMLInputElement>
     * @returns 
     */
    const handleRegister = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRegisterValues(old => {
            return {
                ...old,
                [event.target.id]: event.target.value
            }
        })
    }

    
    /**
     * Handles fields validations
     * @params registerValues
     * @returns boolean
     */
    const fieldValidation = (values: typeof registerValues) => {

        // checks if values are either empty or null.
        // if so, we set a general error message and return false
        if(!values.email || values.email == "" || !values.password || values.password == "" || !values.firstName || values.firstName == "" || !values.lastName || values.lastName == ""){
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

        // check if password values meets regex requirements
        // if not, we set a specific error message - password error message - and return false
        if(!values.password?.match(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/g)){
            setErrorMessages({
                email: "",
                password: "Password must be, at least, 8 characters long, a minimum of 1 number and special character",
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
     * Handles registration
     * @params 
     * @returns 
     */
    async function handleRegisterSubmition() {

        // firstly, we call field validation function
        // if the return output is false then we abort 
        if(!fieldValidation(registerValues))
            return 
                
        
        try {
            // use uuid for user id
            // it's stored in a var so we can than send it to the localstorage for future manipulation/usage
            const userId = uuid();
            
            // we create a post method where we send all necessary values
            await fetch("http://localhost:5000/users", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'id': userId,
                    "email": registerValues.email?.toString(),
                    "password": registerValues.password?.toString(),
                    "firstName": registerValues.firstName?.toString(),
                    "lastName": registerValues.lastName?.toString()
                })
            }).then(res => {
                // check if response is ok and send either error or response in a json format
                if(!res.ok)
                    throw Error('Error fetching users data');

                return res.json();
            }).then(() => {
                // we set a timeout - 5s
                setTimeout(() => {
                    setErrorMessages({ email: "", password: "", general: "" }) // clear error msgs
                    // send to localstorage both the id and new user flag as true
                    localStorage.setItem('User', JSON.stringify({
                        id: userId,
                        newUser: true
                    }))

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
                    <div className="left">
                        <h1>Register Account</h1>
                        <h5 className="register-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. In id eros vel libero tempus efficitur vitae sed nisl. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.</h5>
                        <div className="form-container">
                            <div className="register-form">
                                <div className="register-name">
                                    <Input type="text" id="firstName" placeholder="John" onChange={handleRegister} readonly={false} />
                                    <Input type="text" id="lastName" placeholder="Doe" onChange={handleRegister} readonly={false} />
                                </div>
                                <Input type="email" id="email" placeholder="Email" onChange={handleRegister} errorMessage={errorMessages.email} readonly={false} />
                                <Input type="password" id="password" placeholder="Password" onChange={handleRegister} errorMessage={errorMessages.password} readonly={false} />
                            </div>
                            { errorMessages.general != "" ? 
                                <span className="general-error">{errorMessages.general}</span>
                            : null}
                            <span className="redirect">
                                <Link to="/login">
                                    Already a member?
                                </Link>
                            </span>
                            <button type="submit" className={`submit-register ${!success ? "" : "logged-in"}`} onClick={handleRegisterSubmition} >
                                { loader ? <Loading /> : success && !loader ? "Enjoy Datawise" : "Subscribe"}
                            {/* { !success ? "Subscribe" : "Enjoy Datawise"} */}
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
            }
            
        </>
    )
}