import React from "react";
import logo from '../../assets/img/logo.png';
import './header.css'


function Header() {

    return (
        <div className="main__container-header">
            <div className="header__img">
                <img src={logo} alt='Logo Neoland' />
            </div>
            <div className="header__tittle" >
                <p>✉ Versión 1.0</p>
            </div>
        </div>

    )

}

export default Header;