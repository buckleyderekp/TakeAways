import React, { useContext, useRef, useState, useEffect } from "react"
import "./Takeaway.css"
import { TakeawayContext } from "./TakeawayProvider"
import { EditTakeAwayForm } from "./EditTakeawayForm"
import { Button, Modal, ModalBody, ModalHeader } from "reactstrap"


export const Takeaway = ({ takeaway, source, type, categories }) => {

    const { deleteTakeaway, updateTakeaway } = useContext(TakeawayContext)
    const [modal, setModal] = useState(false)
    const toggle = () => setModal(!modal)

    return (
        <section className="takeaway">
            <div className="takeaway__source takeawayText">{source.source}</div>
            <div className="takeaway__sourceType takeawayText">Source Type: {type.type}</div>
            <div className="takeaway__categories takeawayText">Category: {categories.map((cat) => {
                return `${cat.category}`
            }).join(", ") || []
            }

            </div>
            <div className="takeaway__text takeawayText">Takeaway:  {takeaway.takeaway}</div>
            <div className="takeawayButtonContainer takeawayText">
                <button type="submit"
                    onClick={
                        evt => {
                            evt.preventDefault()
                            deleteTakeaway(takeaway.id)
                        }
                    }
                    className="button">
                    Delete
            </button>
                <button type="submit"
                    onClick={
                        evt => {
                            evt.preventDefault()
                            toggle()
                        }
                    }
                    className="button">
                    Edit
            </button>
            </div>
            <Modal className="formModal" isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>
                    Edit Takeaway
                </ModalHeader>
                <ModalBody>
                    <EditTakeAwayForm toggler={toggle} takeawayObject={takeaway}/>
                </ModalBody>
            </Modal>

        </section>
    )
}