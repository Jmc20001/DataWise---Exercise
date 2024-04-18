type PopupProps = {
    children?: any,
    className?: string,
    open?: boolean,
    onClose?: () => void
}

export default function Popup({ children, className, open, onClose } : PopupProps){

    return (
        <>
            <div className={`popup ${className ? className : ""}`} data-open={open}>
                <div className="popup-overlay"></div>
                <div className="popup-container">
                    {children}
                </div>
            </div>
        </>
    )
}