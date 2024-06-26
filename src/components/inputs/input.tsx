import { useState } from "react"

type InputProps = {
    id?: string,
    name?: string,
    className?: string,
    type?: "text" | "number" | "password" | "email" | "submit",
    value?: string | number,
    label?: string,
    placeholder?: string,
    errorMessage?: string,
    onChange?: any,
    readonly: boolean,
    onClick?: () => void
}

export default function Input({ id, name, className, type, value, label, placeholder, errorMessage, onChange, readonly, onClick } : InputProps) {

    // const [ val, setVal ] = useState<any>();


    return (
        <>
            {
                type == "number" ?
                    <>
                        { label ?
                            <div>
                                
                                <label htmlFor={name ? name : ""}>{label}</label>          
                                <input type="number" className={`standard-input ${className ? className : ""}`} id={ id ? id : ""} name={name ? name : ""} placeholder={placeholder ? placeholder : ""} value={value} onChange={(e) => onChange?.(e) || null} readOnly={readonly}/>
                            </div>
                        : 
                            <input type="number" className={`standard-input ${className ? className : ""}`} id={ id ? id : ""} name={name ? name : ""} placeholder={placeholder ? placeholder : ""} value={value} onChange={(e) => onChange?.(e) || null} readOnly={readonly}/>
                        }
                    </>
                : type == "submit" ? 
                    <>
                        { label ?
                            <div>
                                
                                <label htmlFor={name ? name : ""}>{label}</label>       
                                <input type="submit" className={`standard-input ${className ? className : ""}`} id={ id ? id : ""} name={name ? name : ""} placeholder={placeholder ? placeholder : ""} value={value ? value : "Submit"} onClick={() => onClick?.() || null} readOnly={readonly}/>
                                { errorMessage || errorMessage != "" ?
                                    <span>{errorMessage}</span>
                                : null}
                            </div>
                        : 
                            <>
                                <input type="submit" className={`standard-input ${className ? className : ""}`} id={ id ? id : ""} name={name ? name : ""} placeholder={placeholder ? placeholder : ""} value={value ? value : "Submit"} onClick={() => onClick?.() || null} readOnly={readonly}/>
                            </>
                        }
                    </>
                : type == "password" ?
                    <>
                        { label ?
                            <div>
                                
                                <label htmlFor={name ? name : ""}>{label}</label>          
                                <input type="password" className={`standard-input ${className ? className : ""}`} id={ id ? id : ""} name={name ? name : ""} placeholder={placeholder ? placeholder : ""} value={value} onChange={(e) => onChange?.(e) || null} readOnly={readonly}/>
                            </div>
                        : 
                            <>
                                <input type="password" className={`standard-input ${className ? className : ""}`} id={ id ? id : ""} name={name ? name : ""} placeholder={placeholder ? placeholder : ""} value={value} onChange={(e) => onChange?.(e) || null} readOnly={readonly}/>
                                { errorMessage || errorMessage != "" ?
                                    <span>{errorMessage}</span>
                                : null}
                            </>
                        }
                    </>
                : type == "email" ?
                    <>
                       { label ?
                            <div>
                                
                                <label htmlFor={name ? name : ""}>{label}</label>          
                                <input type="email" className={`standard-input ${className ? className : ""}`} id={ id ? id : ""} name={name ? name : ""} placeholder={placeholder ? placeholder : ""} value={value} onChange={(e) => onChange?.(e) || null} readOnly={readonly}/>
                            </div>
                        : 
                            <>
                                <input type="email" className={`standard-input ${className ? className : ""}`} id={ id ? id : ""} name={name ? name : ""} placeholder={placeholder ? placeholder : ""} value={value} onChange={(e) => onChange?.(e) || null} readOnly={readonly}/>
                                { errorMessage || errorMessage != "" ?
                                    <span>{errorMessage}</span>
                                : null}
                            </>
                        } 
                    </>
                :
                    <>
                        { label ?
                            <div>
                                
                                <label htmlFor={name ? name : ""}>{label}</label>          
                                <input type="text" className={`standard-input ${className ? className : ""}`} id={ id ? id : ""} name={name ? name : ""} placeholder={placeholder ? placeholder : ""} value={value} onChange={(e) => onChange(e)} readOnly={readonly}/>
                            </div>
                        : 
                            <input type="text" className={`standard-input ${className ? className : ""}`} id={ id ? id : ""} name={name ? name : ""} placeholder={placeholder ? placeholder : ""} value={value} onChange={(e) => onChange(e)} readOnly={readonly}/>
                        }
                    </>
            }
        </>
    )
    
}