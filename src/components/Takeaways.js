import React, { useState } from "react"
import { Dashboard } from "./Dashboard"
import Auth from "./auth/Auth"

export const Takeaways = () => {
    const [check, update] = useState(false)
    const toggle = () => update(!check)

    return (
        localStorage.getItem("takeaways_user") ? <Dashboard /> : <Auth toggle={toggle} />
    )
}