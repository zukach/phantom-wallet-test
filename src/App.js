// import React from "react";
// import styled from "styled-components";


// const getAccount = async () => {
//   const accounts = await window.solana.connect();
//   console.log(accounts);
// };

// const logOut = async () => {
//   const resp = await window.solana.disconnect({
//     method: "disconnect",
//   });
//   console.log(resp);
// };



// function App() {
//   return (
//     <div className="App">
//       <ConnectButton onClick={getAccount}>Establish Connection</ConnectButton>
//       <LogoutButton onClick={logOut}> Log Out </LogoutButton>
//     </div>
//   );
// }

// export default App;

// const ConnectButton = styled.button`
//   width: 150px;
//   height: 50px;
// `;

// const LogoutButton = styled.button`
//   width: 150px;
//   height: 50px;
// `;

import React, { useEffect, useState } from 'react';

function WalletIntegration() {
  const [phantomConnected, setPhantomConnected] = useState(false);
  const [phantomPublicKey, setPhantomPublicKey] = useState('');

  const connectToPhantom = async () => {
    if (typeof window.solana !== 'undefined') {
      try {
        await window.solana.connect();
        const publicKey = await window.solana.publicKey.toString();
        setPhantomConnected(true);
        setPhantomPublicKey(publicKey);
      } catch (error) {
        console.error('Error connecting to Phantom:', error);
      }
    } else {
      console.error('Phantom wallet extension not found');
    }
  };

  useEffect(() => {
    // Check if Phantom wallet is already connected
    if (typeof window.solana !== 'undefined' && window.solana.isPhantom) {
      connectToPhantom();
    }
  }, []);

  return (
    <div>
      {phantomConnected ? (
        <div>
          <p>Connected with Phantom wallet!</p>
          <p>Public Key: {phantomPublicKey}</p>
          {/* Continue with further actions */}
        </div>
      ) : (
        <button onClick={connectToPhantom}>Connect with Phantom</button>
      )}
    </div>
  );
}

export default WalletIntegration;
