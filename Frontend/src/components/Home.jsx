import React, { useState } from 'react'
import UserList from './Users/UserList'
import { Link } from 'react-router-dom'

function Home() {

    const[search,setSearch] = useState('');

  return (
    <>

    <div className="container mx-auto ml-[50px]">
        <div className="actions w-[800px] mx-auto space-x-4  mt-[50px] ml-[100px]">
            
            <Link to={'/create'} className="btn btn-outline btn-primary">Create User</Link>
            <input  type="text" value={search}
              onChange={(e) => setSearch(e.target.value)}
                placeholder="Search..." className="input input-bordered input-primary w-full mt-[2px] max-w-xs" />
        </div>
        <UserList search = {search}/>
    </div>
    
    </>
  )
}

export default Home