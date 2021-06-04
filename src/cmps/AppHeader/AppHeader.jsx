import React from 'react';
import logo from '../../logo.svg';
import { NavLink, withRouter } from 'react-router-dom';
import './AppHeader.scss';

class _AppHeader extends React.Component {
    render() {
        return (
            <>
                <header className="app-header">
                    <div className="app-header-inner container">
                        {/* <img src={logo} className="App-logo" alt="logo" /> */}
                        <NavLink exact activeClassName="active" className="app-header-inner-logo" to="/"><h1>Weather App</h1></NavLink>
                        <nav>
                          <NavLink to="/favorites" >favorites</NavLink>
                        </nav>
                    </div>
                </header>
            </>
        );
    }
}

export const AppHeader = withRouter(_AppHeader)
