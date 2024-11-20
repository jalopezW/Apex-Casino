import { useState, useEffect } from 'react'
import { useAuthentication } from '../Services/authService'
import './App.css'

export default function App() {
  const [count, setCount] = useState(0)

  return <h1>Casino Yay!!!</h1>
};

