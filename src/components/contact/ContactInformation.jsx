import React from 'react'

const ContactInformation = () => {
    return (
        <div className="contact-information">
            <div className="contact-information-box">
                <h3>Contact Information</h3>

                <ul className="info">
                    <li>
                        <i className="fas fa-map-marker-alt"></i> 12, Lorem ipsum dolor sit amet
                    </li>
                    <li>
                        <i className="fas fa-envelope"></i> support.test@gmail.com
                    </li>
                    <li>
                        <i className="fas fa-phone-volume"></i> +1 650-555-1234
                    </li>
                    <li>
                        <i className="fab fa-skype"></i> skype.testuser
                    </li>
                </ul>

                <ul className="media">
                    <li>
                        <i className="fab fa-facebook"></i>
                    </li>

                    <li>
                        <i className="fab fa-instagram"></i>
                    </li>

                    <li>
                        <i className="fab fa-twitter"></i>
                    </li>
                </ul>
            </div>

            <img src="/assets/illustrations/contact-illustration.svg" alt="Contact Page"/>
        </div>
    )
}

export default ContactInformation
