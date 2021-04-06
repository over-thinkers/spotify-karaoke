import React from 'react';
import ReactDOM from 'react-dom'
import { BsChevronDown } from "react-icons/bs";
import { FaRegUserCircle } from "react-icons/fa";

function NavLoggedIn() {
  return (
    <>
      <navbar>
        <ul class="nav-list2">
          <li class="nav-item2">
            <div class="logoName">
              <div class="logo">
                <a href="#"><img src="https://ez-drum-kit.s3-us-west-1.amazonaws.com/chat.png" width="42px"/></a>
              </div>
              <div class="name">
                <p>Spoti-oki</p>
              </div>
            </div>
          </li>
          <li class="nav-item2">
            <a href="#">Home</a>
          </li>
          <li class="nav-item2">
            <a href="#">About</a>
          </li>
          <li class="nav-item2">
            <a href="#">My Playlist</a>
          </li>
          <li class="nav-item2">
            <p class="line"></p>
          </li>
          <li class="nav-item2">
            <a href="#" onClick={()=>{alert('modal to logout')}}>
                <div class='loggedIn'>
                    <div class="userLogo">
                        <p><FaRegUserCircle size={30}/></p>
                    </div>
                    <div class='profile'>
                        <p>Profile</p>
                    </div>
                    <div class='arrow'>
                        <p><BsChevronDown size={18}/></p>
                    </div>
                </div>
            </a>
          </li>
        </ul>
      </navbar>
    </>
  )
}

export default NavLoggedIn