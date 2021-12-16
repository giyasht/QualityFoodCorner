import React from 'react';
import './Footer.css';
import {NavLink} from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="row">
                <div className="footer-col">
                    <h4>About Us</h4>
                    <ul>
                        <li>
                            <NavLink to="/#">Thanks for being here <br/>and being the part of <br/>this
                            prestigious family <br/>hope you all like this<br/> keep
                            supporting!!</NavLink>
                        </li>
                        <li><NavLink to="/aboutus">More about us</NavLink></li>
                    </ul>
                </div>
                <div className="footer-col">
                    <h4>Help</h4>
                    <ul>
                        <li><NavLink to="/#">FAQ</NavLink></li>
                        <li><NavLink to="/#">Watch</NavLink></li>
                    </ul>
                </div>
                <div className="footer-col">
                    <h4>Developers</h4>
                    <ul>
                        <li><NavLink to="/developers">Meet Developers</NavLink></li>
                        <li><NavLink to="/suggestions">Suggestions</NavLink></li>
                    </ul>
                </div>
                <div className="footer-col">
                    <h4>follow us</h4>
                    <div className="social-links">
                        <NavLink to="/#"><i className="fab fa-facebook-f" target="_blank"></i></NavLink>
                        <NavLink to="/#"><i className="fab fa-twitter" target="_blank"></i></NavLink>
                        <NavLink to="/#"><i className="fab fa-instagram" target="_blank"></i></NavLink>
                        <NavLink to="/#"><i className="fab fa-linkedin-in" target="_blank"></i></NavLink>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;
