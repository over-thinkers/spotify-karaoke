import React from 'react';

const AUTH_URL = "https://accounts.spotify.com/authorize?client_id=fe60e323d09f45e7bf069353680f5a1a&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state%20playlist-modify-public";

export default function Login() {
  return (
      <a href={AUTH_URL}>LOGIN WITH SPOTIFY</a>
  )
}
