import React from "react"

export const Takeaway = ({takeaway, category, source, type}) => {
 
    return(
        <section className="takeaway">
            <div className="takeaway__text">Takeaway: {takeaway.takeaway}</div>
            <div className="takeaway__category">Category: {category.category}</div>
            <div className="takeaway__source">Source: {source.source}</div>
            <div className="takeaway__sourceType">Source Type: {type.type}</div>
        </section>
    )
}