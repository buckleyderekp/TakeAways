import React, { useContext } from "react"
import { SourceContext } from "../sources/SourceProvider"
import { CategoryContext } from "../categories/CategoryProvider"


export const UserModal = ({user}) => {
    
    const {sources} = useContext(SourceContext)
    const sourcesForThisUser = sources.filter(sor=> sor.userId === user.id)
    const {categories} = useContext(CategoryContext)
    const categoriesForThisUser = categories.filter(cat=> cat.userId === user.id)

return (
<>
    <div className= "user__name">{user.name}</div>
<div className= "user__sources">Sources: {sourcesForThisUser.map(sftu=>{
    return `${sftu.source}`
}).join(", ")
}
</div>
<div className= "user__categories">Categories: {categoriesForThisUser.map(cftu=>{
    return `${cftu.category}`
}).join(", ")
}
</div>
    
</>
)

}