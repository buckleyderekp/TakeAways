//This componenet is responsible for displaying the initial page prompting either the login of an existing account or registration of a new account

import React from "react"
import Login from "./Login"
import Register from "./Register"


export default ({ toggle }) => {
    return (
        <>
            <h1 className="welcome">Welcome to Takeaways</h1>
            <div className="authContainer">
                <Login toggle={toggle} />
                <Register toggle={toggle} />
            </div>
        </>
    )
}
