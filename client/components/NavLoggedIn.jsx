import React, { useState } from 'react';
import { BsChevronDown } from 'react-icons/bs';
import { FaRegUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Modal from './Modal';

function NavLoggedIn({ setCode }) {
  const [modal, openModal] = useState(false);
  return (
    <>
      <nav>
        <ul className='nav-list2'>
          <li className='nav-item2'>
            <div className='logoName'>
              <div className='logo'>
                <Link to={{ pathname: '/' }}>
                  <img
                    className='logoIcon'
                    src='https://ez-drum-kit.s3-us-west-1.amazonaws.com/chat.png'
                    width='42px'
                  />
                </Link>
              </div>
              <div className='name'>
                <Link to={{ pathname: '/' }}>
                  <p>Spoti-offke</p>
                </Link>
              </div>
            </div>
          </li>
          <li className='nav-item2'>
            <Link to={{ pathname: '/' }}>Home</Link>
          </li>
          {/* <li className='nav-item2'>
            <a href='#'>About</a>
          </li> */}
          <li className='nav-item2'>
            <Link to={{ pathname: 'playlist' }}>My Playlist</Link>
          </li>
          <li className='nav-item2'>
            <p className='line'></p>
          </li>
          <li className='nav-item2'>
            <p onClick={() => setCode(null)}>Logout</p>
          </li>
          {/* <li className='nav-item2'>
            <a
              href='#'
              onClick={() => {
                openModal((p) => !p);
              }}
            >
              <div className='loggedIn'>
                <div className='userLogo'>
                  <p>
                    <FaRegUserCircle size={30} />
                  </p>
                </div>
                <div className='profile'>
                  <p>Profile</p>
                </div>
                <div className='arrow'>
                  <p>
                    <BsChevronDown size={18} />
                  </p>
                </div>
              </div>
            </a>
          </li> */}
        </ul>
      </nav>

      {modal ? <Modal /> : null}
    </>
  );
}

export default NavLoggedIn;
