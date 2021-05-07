import React from 'react';

function Modal() {
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
var number = 10
