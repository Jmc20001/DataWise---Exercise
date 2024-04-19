import { useEffect, useState } from "react"

type CardProps = {
    data: {
        id: string,
        title: string,
        date: string,
        message: string
    },
    className?: string,
    size?: "x1" | "x2",
    profile?: string,
    onClick?: () => void, 
    ref?: any
}

export default function Posts({ data, className, size, profile, onClick, ref } : CardProps){

    const [ post, setPost ] = useState<{ id: string, title: string, date: string, message: string }>({
        id: "",
        title: "",
        date: "",
        message: "",
    })

    const [ load, setLoad ] = useState<boolean>(false)

    useEffect(() => {
        setTimeout(() => {
            if(!load)
                setLoad(true)
        }, 3000)
    }, [])

    useEffect(() => {
        setPost(data)
    }, [load])





    return (
        <>
            {
                load ?
                    <div className={`post ${className ? className : ""} ${size ? size : ""} ${profile ? profile : ""}`} key={post?.id}>
                        <div className="post-header">
                            <label className="post-title">{post?.title}</label>
                            <span className="post-date">{post?.date}</span>
                        </div>
                        <p className="post-message">{post.message.length >= 100 ? post?.message.substring(0, 100) + "..." : post?.message}</p>
                        { post?.message.length >= 100 ?
                            <span className="post-full">See more</span>
                        : null}
                    </div>
                : null
            }
        </>
    )
}