import React, { useState } from "react"
import { TakeawayProvider } from "./takeaways/TakeawayProvider"
import { TakeawayList } from "./takeaways/TakeawayList"
import { CategoryProvider } from "./categories/CategoryProvider"
import { SourceProvider } from "./sources/SourceProvider"
import { TypeProvider } from "./type/TypeProvider"
import { TakeawaysCategoryProvider } from "./categories/TakeawaysCategoriesProvider"
import { CategorySearchBar } from "./search/CategorySearBar"
import { SourceSearchBar } from "./search/SourceSearchBar"
import { SourceSearchResults } from "./search/SourceSearchResults"
import { CategorySearchResults } from "./search/CategorySearchResults"
import "./Dashboard.css"




export const Dashboard = () => {
    const [sourceSearchTerms, setSourceSearchTerms] = useState("")
    const [categorySearchTerms, setCategorySearchTerms] = useState("")
    return (

        <div className="mainContainer">
            <header className="header">
                <div className="logo"></div>
            </header>
            <div className="searchContainer">
                <TakeawayProvider>

                <div className="searchContainer__sources" >
                    <SourceProvider>
                        <SourceSearchBar setSourceSearchTerms={setSourceSearchTerms} />

                    </SourceProvider>
                </div>
                <div className="searchContainer__categories" >
                    <CategoryProvider>
                        <CategorySearchBar setCategorySearchTerms={setCategorySearchTerms} />

                    </CategoryProvider>
                </div>
                </TakeawayProvider>

            </div>
            <div className="listContainer">
                <TakeawayProvider>
                    <CategoryProvider>
                        <SourceProvider>
                            <TypeProvider>
                                <TakeawaysCategoryProvider>
                                    <TakeawayList sourceSearchTerms={sourceSearchTerms} categorySearchTerms={categorySearchTerms}/>
                                </TakeawaysCategoryProvider>
                            </TypeProvider>
                        </SourceProvider>
                    </CategoryProvider>
                </TakeawayProvider>
            </div>
        </div>
    )
}