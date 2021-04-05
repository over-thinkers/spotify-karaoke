import React from 'react';
import ReactDOM from 'react-dom'
import { MdLibraryMusic } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";

function NavLoggedIn() {
  return (
    <div>
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
            <a href="#">
                <div class='loggedIn'>
                    <div class="userLogo">
                        <p><FaRegUserCircle size={30}/></p>
                    </div>
                    <div class='profile'>
                        <p>Profile</p>
                    </div>
                </div>
            </a>
          </li>
        </ul>
      </navbar>
    </div>
  )
}

export default NavLoggedIn