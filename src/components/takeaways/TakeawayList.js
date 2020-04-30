import React, { useContext, useState } from "react"
import { TakeawayContext } from "./TakeawayProvider"
import { Button, Modal, ModalBody, ModalHeader} from "reactstrap"
import { Takeaway } from "./Takeaway"

export const TakeawayList = () => {
    const { takeaways } = useContext(TakeawayContext)
 


    return (
        <>
            <h2>Takeaways</h2>


            <ul className="takeaways">
                {
                    takeaways.map(takeaway => {

                        return <Takeaway key={takeaway.id} takeaway={takeaway}/>
                    })
                }
            </ul>
        </>
    )
}
