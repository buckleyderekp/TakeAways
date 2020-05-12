import React, { useContext } from "react"
import { UserContext } from "./UserProvider"
import { User } from "./User"




export const UserList = () => {

const  { users } = useContext(UserContext)

return (
    <>
 <h2 className="listHeader">Users</h2>

            <ul className="Users">
            {
                users.map(user => {

                    return <User
                        key={user.id}
                        user={user}
                    />
                })
            }
        </ul>
        </>
)
}