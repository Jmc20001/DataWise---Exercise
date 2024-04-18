import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Posts, Profile, SideNav } from "../../components";
import { strict } from "assert";

export default function Dashboard() {
    
    const location = useLocation();
    const navigate = useNavigate();

    const [ profileSize, setProfileSize ] = useState<"big" | "normal">("normal")
    const [ postsData, setPostsData ] = useState<{ id: string, title: string, date: string, message: string }[]>([])
    const [ profileData, setProfileData ] = useState<{ id: string, firstName: string, lastName: string, email: string }>()

    const [ callPosts, setCallPosts ] = useState<boolean>(false);

    const [ callProfile, setCallProfile ] = useState<boolean>(false);

    const [ loadProfile, setLoadProfile ] = useState<boolean>(false)
    const [ loadPosts, setLoadPosts ] = useState<boolean>(false)

    useEffect(() => {
        if(!localStorage.getItem("User"))
            navigate("/login");

        const layout = document.querySelector("div.layout")

        if(layout?.className)
            layout.removeAttribute("class");

        layout?.setAttribute("class", `layout ${location.pathname === "/" ? "/dashboard" : location.pathname}`)

        if(!callPosts)
            setCallPosts(true)

        if(!callProfile)
            setCallProfile(true)

    }, [])

    useEffect(() => {
        if(callPosts)
            _getPosts();
    }, [callPosts])

    useEffect(() => {
        if(callProfile)
            _getProfile();
    }, [callProfile])

    async function _getPosts(){
        try{
            await fetch("http://localhost:5000/posts").then(res => {
                if(!res.ok)
                    throw Error("Error fetching posts data")

                return res.json();
            }).then(data => {
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

            setLoadPosts(true)
        }catch(err){
            throw err
        }
    }

    async function _getProfile(){
        try {
            const user = JSON.parse(localStorage?.getItem("User") || "");

            await fetch(`http://localhost:5000/users/${user.id}`).then(res => {
                if(!res.ok)
                    throw Error("Error fetching posts data")

                return res.json();
            }).then(data => {
                if(data){
                    console.log(data)

                    setProfileData({
                        id: data.id || "0",
                        firstName: data.firstName || "NO NAME",
                        lastName: data.lastName || "NO SURNAME",
                        email: data.email || "NO EMAIL"
                    })
                }

                setLoadProfile(true)
            }).catch(err => {
                throw err;
            })

        } catch(err){
            throw err;
        }
    }

    const handleProfileNav = () => {
        if(profileSize == "normal")
            setProfileSize("big")
            
        if(profileSize == "big")
                setProfileSize("normal")
    }

    return (
        <>
            <SideNav />
            <div className={`content ${profileSize}`}>
                <div className="posts-content">
                    {
                        postsData?.map(post => {
                            return <Posts key={post.id} data={{ id: post.id, title: post.title, message: post.message, date: post.date }} /> 
                        }) 
                    }
                    {
                        postsData?.map(post => {
                            return <Posts key={post.id} data={{ id: post.id, title: post.title, message: post.message, date: post.date }} /> 
                        }) 
                    }
                </div>
                { loadProfile ? 
                    <Profile onClick={handleProfileNav} data={profileData} size={profileSize} />
                : null
                }
            </div>
        </>
    )
}