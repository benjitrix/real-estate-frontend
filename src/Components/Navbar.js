import React, { useState, useRef } from 'react'
import { FaBars } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useGlobalContext } from '../Context/context'
import { FaShoppingCart } from 'react-icons/fa'
import '../css/Navbar.css'

const Navbar = () => {
  const { user, logout, rotate, setRotate } = useGlobalContext()
  const [height, setHeight] = useState(0)

  const navigate = useNavigate()
  const linksRef = useRef()

  const logoutUser = () => {
    logout()
    setTimeout(() => {
      navigate("/", { replace: true })
    }, 1500)
  }

  const openMenu = (e) => {
    let menuHeight = linksRef.current.scrollHeight
    setRotate(true)
    setHeight(menuHeight)
  }

  function closeMenu(e) {
    setRotate(false)
    setHeight(0)
  }

  return (
    <nav className='navbar'>
      <div className='navbar-container'>
        <div className='logo-cart-bars'>
          <h2><Link to='/' className='logo'>Real Estate</Link></h2>
          <div className='cart-bars'>
            <Link to='/cart' className='cart-link desktop-no-show'><FaShoppingCart /></Link>
            { 
              user.role === 'admin' ?
                <Link to='/admin' className='link desktop-no-show'>{user.name}</Link> :
                <Link to='/query-user-estates' className='user-link desktop-no-show'>{user.name}</Link>
            }
            <FaBars className={`${rotate ? 'bars rotate' : 'bars'}`} onMouseEnter={() => openMenu()} onMouseLeave={() => closeMenu()}/>
          </div>
        </div>
        {
          rotate && <hr className={`${rotate ? 'hr-black hr-brown' : 'hr-brown'}`}/>
        }
        {
          !user.name && (
            <div className={`links`} ref={linksRef} style={{height: height}} onMouseEnter={() => openMenu()} onMouseLeave={() => closeMenu()}>
              <div className='mobile-no-show'>
                <Link to='/cart' className='cart-link'><FaShoppingCart /></Link>
                { 
                  user.role === 'admin' ?
                    <Link to='/admin' className='link'>{user.name}</Link> :
                    <Link to='/query-user-estates' className='user-link'>{user.name}</Link>
                }
              </div>
              <Link to='/' className='link'>Home</Link>
              <Link to='/register' className='link'>Register</Link>
              <Link to='/login' className='link'>Login</Link>
              <Link to='/about' className='link'>About</Link>
            </div>
          )
        }
        {
          user.name && (
            <div 
              className={`${rotate ? 'links links-show' : 'links'}`} ref={linksRef} 
              style={{height: height}} 
              onMouseEnter={() => openMenu()} 
              onMouseLeave={() => closeMenu()}>
                <div className='mobile-no-show'>
                  <Link to='/cart' className='cart-link'><FaShoppingCart /></Link>
                  { 
                    user.role === 'admin' ?
                      <Link to='/admin' className='link'>{user.name}</Link> :
                      <Link to='/query-user-estates' className='user-link'>{user.name}</Link>
                  }
                </div>
                <Link to='/' className='link'>Home</Link>
                <Link to='/register-estate' className='link'>Register Estate</Link>
                <Link to='/query-user-estates' className='user-estates-link link'>Your Estates</Link>
                <Link to='/about' className='link'>About</Link>
                { 
                  user.name === 'admin' && 
                    <Link to='/admin' className='link'>{user.name}</Link> 
                }
                <p className='logout-btn-container link'>
                  <button onClick={() => logoutUser()} className='logout-btn link'>Logout</button>
                </p>
            </div>
          )
        }
      </div>
    </nav>
  )
}

export default Navbar
