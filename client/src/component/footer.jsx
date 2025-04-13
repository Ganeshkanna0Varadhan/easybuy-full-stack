import React from "react";
import { FaFacebook, FaLinkedin } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
const Footer = () => {
    return (
         <footer className="border-t">
            <div className="container mx-auto p-4 text-center flex flex-col lg:flex-row lg:justify-between gap-4 ">
                <p>© All rights are Reserved 2025</p>
                <div className="items-center flex gap-4 justify-center text-2xl">
                    <a href="" className="hover:text-primary-100">
                        <FaFacebook/>
                    </a>
                    <a href="" className="hover:text-primary-100">
                        <FaInstagram/>
                    </a>
                    <a href="" className="hover:text-primary-100">
                        <FaLinkedin/>
                    </a>
                </div>
            </div>
         </footer>
    )
}

export default Footer;