import React from 'react';

function Modal() {
    // const code = new URLSearchParams(window.location.search).get('code');
    // const AUTH_URL = 'https://accounts.spotify.com/authorize?client_id=dca3db4a5a914cae9632a6c5ebba47f0&response_type=code&redirect_uri=http://localhost:3000/&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state'

    // {console.log(window)}
    function deleteAllCookies(e) {
      let wp = "left=40, top=40, width=0, height=0, location=no, menubar=no, resizable=no, status=yes, toolbar=no";
      var wnd = window.open("https://www.spotify.com/logout", "winnote", wp);
      // wnd.close();
      setTimeout(function(){ wnd.close(); }, 130);
      location.reload(true)
      // e.preventDefault();
  };

  return (
    <>
        <div className="modal-container">
            <div className="account">
                <p>Account</p>
                <p onClick={()=>{deleteAllCookies();}}>Logout</p>
            </div>
      </div>
    </>
  )
}

export default Modal
