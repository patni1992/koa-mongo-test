import { AppBar, Toolbar, Typography, makeStyles, Button, IconButton, Drawer, Link, MenuItem } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import React, { useState, useEffect } from 'react'
import { Link as RouterLink } from 'react-router-dom'

const headersData = [
  {
    label: 'Controllers',
    href: '/'
  }
]

const useStyles = makeStyles(() => ({
  logo: {
    fontWeight: 700,
    textAlign: 'left'
  },
  menuButton: {
    fontWeight: 700,
    marginLeft: '30px'
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  drawerContainer: {
    width: '280px'
  }
}))

function Header() {
  const { logo, menuButton, toolbar, drawerContainer } = useStyles()

  const [state, setState] = useState({
    mobileView: false,
    drawerOpen: false
  })

  const { mobileView, drawerOpen } = state

  useEffect(() => {
    const setResponsiveness = () =>
      window.innerWidth < 900
        ? setState((prevState) => ({ ...prevState, mobileView: true }))
        : setState((prevState) => ({ ...prevState, mobileView: false }))

    setResponsiveness()

    window.addEventListener('resize', () => setResponsiveness())
  }, [])

  const getDrawerChoices = () =>
    headersData.map(({ label, href }) => (
      <Link component={RouterLink} to={href} color="inherit" style={{ textDecoration: 'none' }} key={label}>
        <MenuItem>{label}</MenuItem>
      </Link>
    ))

  const AppLogo = (
    <Typography variant="h6" component="h1" className={logo}>
      Koa Test React App
    </Typography>
  )

  const getMenuButtons = () =>
    headersData.map(({ label, href }) => (
      <Button key={label} color="inherit" to={href} component={RouterLink} className={menuButton}>
        {label}
      </Button>
    ))

  const DisplayDesktop = () => (
    <Toolbar className={toolbar}>
      {AppLogo}
      <div>{getMenuButtons()}</div>
    </Toolbar>
  )

  const DisplayMobile = () => {
    const handleDrawerOpen = () => setState((prevState) => ({ ...prevState, drawerOpen: true }))
    const handleDrawerClose = () => setState((prevState) => ({ ...prevState, drawerOpen: false }))

    return (
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu" aria-haspopup="true" onClick={handleDrawerOpen}>
          <MenuIcon />
        </IconButton>
        <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerClose}>
          <div className={drawerContainer}>{getDrawerChoices()}</div>
        </Drawer>
        <div>{AppLogo}</div>
      </Toolbar>
    )
  }

  return <AppBar>{mobileView ? <DisplayMobile /> : <DisplayDesktop />}</AppBar>
}
export default Header
