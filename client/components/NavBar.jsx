import React from 'react';
import ReactDOM from 'react-dom'
import { MdLibraryMusic } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";

function NavBar() {
  return (
    <div>
      <navbar>
        <ul class="nav-list">
          <li class="nav-item">
            <a href="#"><MdLibraryMusic size={30}/></a>
          </li>
          <li class="nav-item">
            <a href="#">SPOTI-OKI</a>
          </li>
          <li class="nav-item">
            <a href="#">Home</a>
          </li>
          <li class="nav-item">
            <a href="#">Support</a>
          </li>
          <li class="nav-item">
            <a href="#">My Playlist</a>
          </li>
          <li class="nav-item">
            <a href="#"><FaRegUserCircle size={30}/></a>
          </li>
          <li class="nav-item">
            <a href="#">Profile</a>
          </li>
        </ul>
      </navbar>
    </div>
  )
}

export default NavBar