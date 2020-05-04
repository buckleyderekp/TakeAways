import React from "react"

export const Takeaway = ({takeaway, source, type, categories}) => {
 
    return(
        <section className="takeaway">
            <div className="takeaway__text">Takeaway: {takeaway.takeaway}</div>
            <div className="takeaway__categories">Category:{categories.map((cat)=> {
               return `${cat.category}`
                }).join(", ") || []
            }
            
            </div>
            <div className="takeaway__source">Source: {source.source}</div>
            <div className="takeaway__sourceType">Source Type: {type.type}</div>
        </section>
    )
}