import React from "react"
import { TakeawayProvider } from "./takeaways/TakeawayProvider"
import { TakeawayList } from "./takeaways/TakeawayList"


export const Dashboard = () => {
    return (
<TakeawayProvider> 
    <TakeawayList />
</TakeawayProvider>
    )
}