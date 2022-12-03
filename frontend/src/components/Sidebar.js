// React components
import React from 'react';
import { IconContext } from 'react-icons';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';

//Custom Components
import { SidebarData } from './SidebarData';

//CSS
import '../App.css';
import '../css/Sidebar.css';
import LogoutButton from './LogoutButton';

function Sidebar() {
  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <nav className="nav-menu">
          <ul className="nav-menu-items">
            {SidebarData.map((item, index) => {
              return (
                <>
                  <li
                    key={index}
                    className={item.cName}
                  >
                    <Link to={item.path}>
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  </li>
                </>
              );
            })}
            <li
              className="text-center position-absolute bottom-0 ml-5 mb-5"
              style={{ listStyle: 'none', margin: '65px' }}
            >
              <AiIcons.AiOutlineClose />
              <LogoutButton />
            </li>
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Sidebar;
