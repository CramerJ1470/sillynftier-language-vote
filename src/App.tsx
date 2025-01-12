import { useEffect, useState } from 'react'
import './App.css'
import ConnectButton from './common/components/ConnectButton'
import { AppDispatch } from './state/store';
import { useDispatch } from 'react-redux';
import { attachWallet } from './state/services/wallet.service'



function App() {
  const dispatch: AppDispatch=useDispatch();
  useEffect(()=> {
    dispatch(attachWallet());
  },[])

  return (
    <>
      
       <ConnectButton/>
    </>
  )
}

export default App
