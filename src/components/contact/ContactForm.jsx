import React from 'react'

const ContactForm = () => {
    return (
        <form className="contact-form">
            <h2>Contact Us</h2>

            <div>
                <label className="form-label">First Name</label>
                <input type="text" className="form-control" placeholder="Enter your first name..."/>
            </div>

            <div>
                <label className="form-label">Last Name</label>
                <input type="text" className="form-control" placeholder="Enter your last name..."/>
            </div>

            <div>
                <label className="form-label">Email</label>
                <input type="email" className="form-control" placeholder="Enter your email..."/>
            </div>

            <div>
                <label className="form-label">Message</label>
                <textarea className="form-control" placeholder="Enter your message..."></textarea>
            </div>

            <button>Send</button>
        </form>
    )
}

export default ContactForm
