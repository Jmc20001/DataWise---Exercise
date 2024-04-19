import { useEffect, useState } from "react"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import Input from "../inputs/input";
import Posts from "../posts/posts";

type ProfileProps = {
    data?: {
        id?: string,
        firstName?: string,
        lastName?: string,
        email?: string
    } | null,

    size?: string,
    onClick?: () => void
}

export default function Profile({ data, size, onClick } : ProfileProps){

    const [ profile, setProfile ] = useState<{ id?: string, firstName?: string, lastName?: string, email?: string } | null>()
    const [ postsData, setPostsData ] = useState<{ id: string, title: string, date: string, message: string }[]>([])

    const [ load, setLoad ] = useState<boolean>(false)

    const [ userLoad, setUserLoad ] = useState<boolean>(false)
    const [ userPostsLoad, setUserPostsLoad ] = useState<boolean>(false)
    const [ call, setCall ] = useState<boolean>(false)



    useEffect(() => {

        if(!load)
            setLoad(true)
    }, [])

    useEffect(() => {
        if(load)        
            setProfile(data)

        if(!userPostsLoad)
            setUserPostsLoad(true)
    }, [load])

    useEffect(() => {
        if(userPostsLoad)
            _getUsersPosts()
    }, [userPostsLoad])

    
    async function _getUsersPosts(){
        try{
            await fetch("http://localhost:5000/posts?userId=" + 1).then(res => {
                if(!res.ok)
                    throw Error("Error fetching posts data")

                return res.json();
            }).then(data => {
                console.log(data)
                setPostsData(data.length >= 1 ? data.map((d: any) => {
                    return {
                        id: d.id,
                        title: d?.title || "NO TITLE",
                        message: d?.text || "NO TEXT",
                        date: d?.date || "0000-00-00"
                    }
                }) : [])

            }).catch(err => {
                throw err;
            })

            setUserPostsLoad(true)
        }catch(err){
            throw err
        }
    }


    useEffect(() => {
        if(!userLoad)
            setUserLoad(true)
    }, [profile])

    useEffect(() => {
        console.log(postsData)
    }, [postsData])

    return (
        <>
            <div className={`profile ${size ? size : ""}`}>
                <MenuOpenIcon sx={{ fontSize: "35px", position: "absolute", left: "25px", top: "25px", cursor: "pointer" }} onClick={() => onClick?.()} />
                <AccountCircleIcon sx={{ fontSize: "120px", width: "auto", height: "auto" }} />
                <div className="user-info">
                    { userLoad ? 
                        <>                   
                            <Input readonly={true} type="text" value={profile?.email}  />
                            <Input readonly={true} type="text" value={profile?.firstName}  />
                            <Input readonly={true} type="text" value={profile?.lastName}  />
                        </>
                    : <Input readonly={true} type="text"  /> }
                </div>  
                {
                    userPostsLoad ? 
                        <div className="user-posts">
                            <span className="user-posts-span">{ postsData.length > 0 ? "Your posts" : "You have no posts" }</span>
                            {
                                postsData?.map(post => {
                                    return <Posts key={post.id} data={{ id: post.id, title: post.title, message: post.message.substring(0, 25) + "...", date: post.date }} size="x1" profile={size} /> 
                                }) 
                            }
                        </div>
                    : null
                }
            </div>
        </>
    )
}