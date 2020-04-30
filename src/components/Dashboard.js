import React from "react"
import { TakeawayProvider } from "./takeaways/TakeawayProvider"
import { TakeawayList } from "./takeaways/TakeawayList"
import { CategoryProvider } from "./categories/CategoryProvider"
import { SourceProvider } from "./sources/SourceProvider"
import { TypeProvider } from "./type/TypeProvider"


export const Dashboard = () => {
    return (
        <TakeawayProvider>
            <CategoryProvider>
                <SourceProvider>
                    <TypeProvider>
                        <TakeawayList />
                    </TypeProvider>
                </SourceProvider>
            </CategoryProvider>
        </TakeawayProvider>
    )
}