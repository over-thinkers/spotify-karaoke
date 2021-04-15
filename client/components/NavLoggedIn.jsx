import React from 'react';
import { BsChevronDown } from "react-icons/bs";
import { FaRegUserCircle } from "react-icons/fa";
import { Link } from 'react-router-dom';

function NavLoggedIn() {
  return (
    <>
      <nav>
        <ul className="nav-list2">
          <li className="nav-item2">
            <div className="logoName">
              <div className="logo">
                <a href="#"><img className="logoIcon" src="https://ez-drum-kit.s3-us-west-1.amazonaws.com/chat.png" width="42px"/></a>
              </div>
              <div className="name">
                <p>Spoti-oki</p>
              </div>
            </div>
          </li>
          <li className="nav-item2">
          <Link to={{ pathname: '/'}}>
            <a href="#">Home</a>
          </Link>
          </li>
          <li className="nav-item2">
            <a href="#">About</a>
          </li>
          <li className="nav-item2">
            <a href="#">My Playlist</a>
          </li>
          <li className="nav-item2">
            <p className="line"></p>
          </li>
          <li className="nav-item2">
            <a href="#" onClick={()=>{alert('modal to logout')}}>
                <div className='loggedIn'>
                    <div className="userLogo">
                        <p><FaRegUserCircle size={30}/></p>
                    </div>
                    <div className='profile'>
                        <p>Profile</p>
                    </div>
                    <div className='arrow'>
                        <p><BsChevronDown size={18}/></p>
                    </div>
                </div>
            </a>
          </li>
        </ul>
      </nav>
    </>
  )
}

export default NavLoggedIn