import React from 'react'
import ContactForm from './ContactForm'
import ContactInformation from './ContactInformation'
import './style.css'

const Contact = () => {
    return (
        <div className="layout">
            <div className="container contact-container">
                <ContactInformation/>

                <ContactForm/>
            </div>
        </div>
    )
}

export default Contact
