import React from 'react';
import { NavLink } from 'react-router-dom';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';

const Header = () => {
  return (
    <>
    <header>

    <nav className="navbar navbar-expand-lg bg-secondary text-uppercase fixed-top" id="mainNav">
            <div className="container">
                <LibraryBooksIcon className="text-light"/>
                <a className="navbar-brand text-light" href="#page-top">XYZ Book</a>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav ms-auto">

                        <li className="nav-item mx-0 mx-lg-1">
                            <NavLink to="/" className="nav-link py-3 px-0 px-lg-3 rounded" >
                            Books 
                            </NavLink>
      

                        </li>
                        <li className="nav-item mx-0 mx-lg-1">
                            <NavLink to="/authors" className="nav-link py-3 px-0 px-lg-3 rounded" >
                                Authors
                            </NavLink>
        

                        
                        </li>
                        <li className="nav-item mx-0 mx-lg-1">
                        <NavLink to="/publishers" className="nav-link py-3 px-0 px-lg-3 rounded" >
                                Publishers
                            </NavLink>
        

                        </li>
                        <li className="nav-item mx-0 mx-lg-1">
                        <NavLink to="/bookmgt" className="nav-link py-3 px-0 px-lg-3 rounded" >
                                Book Management
                            </NavLink>
        

                        </li>
                    </ul>
                </div>
            </div>
        </nav>
      
          
      
    </header>
    
    </>
        
     
  );
};

export default Header;