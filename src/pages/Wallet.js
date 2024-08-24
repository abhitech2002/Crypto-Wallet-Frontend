import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import { FaWallet, FaSpinner } from 'react-icons/fa';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const Wallet = () => {
  const [address, setAddress] = useState('');
  const [balance, setBalance] = useState('');
  const [loading, setLoading] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    const storedAddress = localStorage.getItem('walletAddress');
    if (storedAddress) {
      setAddress(storedAddress);
    }
  }, []);

  const connectWallet = async () => {
    if (address) {
      setModalIsOpen(true);
      return;
    }

    if (window.ethereum) {
      try {
        setLoading(true);
        const web3 = new Web3(window.ethereum);
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const accounts = await web3.eth.getAccounts();
        if (accounts.length > 0) {
          const account = accounts[0];
          setAddress(account);
          const balance = await web3.eth.getBalance(account);
          setBalance(web3.utils.fromWei(balance, 'ether'));
          localStorage.setItem('walletAddress', account);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    } else {
      alert('Please install MetaMask to use this feature!');
    }
  };

  const clearWalletData = () => {
    setAddress('');
    setBalance('');
    localStorage.removeItem('walletAddress');
  };
  

  return (
<div>
  <h1><FaWallet /> Connect Your Wallet</h1>
  <button onClick={connectWallet} disabled={loading}>
    {loading ? <FaSpinner className="spinner" /> : address ? "Wallet Connected" : "Connect Wallet"}
  </button>
  {address && (
    <div>
      <p><strong>Address:</strong> {address}</p>
      <p><strong>Balance:</strong> {balance} ETH</p>
      <button onClick={clearWalletData}>Clear Wallet Data</button>
    </div>
  )}
  {modalIsOpen && (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={() => setModalIsOpen(false)}
      contentLabel="Wallet Info Modal"
    >
      <h2>Wallet Already Connected</h2>
      <p>Your wallet is already connected with the address: {address}</p>
      <button onClick={() => setModalIsOpen(false)}>Close</button>
    </Modal>
  )}
</div>
    
  );
};

export default Wallet;
