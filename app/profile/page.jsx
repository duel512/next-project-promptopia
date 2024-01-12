"use client"

import { useState, useEffect} from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

import Profile from '@components/Profile'

const MyProfile = () => {
    const router = useRouter();
    const { data: session } = useSession();

    const [myPosts, setMyPosts] = useState([]);

    const fetchPosts = async ()=> {
        const response = await fetch(`/api/users/${session?.user.id}/posts`)
        const data = await response.json();
    
        setMyPosts(data);
       }
    
      useEffect(()=>{
        if(session?.user.id)
            fetchPosts();
      }, [])

    const handleEdit = () => {

    }

    const handleDelete = () => {
        
    }

  return (
    <Profile
        name="My"
        desc="Welcome to your own MyProfile page!"
        data={myPosts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
    />
  )
}

export default MyProfile