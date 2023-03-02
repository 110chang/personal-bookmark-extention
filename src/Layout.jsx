import { useEffect } from 'react'
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom'
import { Button, Container, Nav, Navbar } from 'react-bootstrap'
import { logOut } from './lib/api'
import { getCurrentTab } from './lib/chromeTab'
import useAuthAtom from './lib/useAuthAtom'
import useTabAtom from './lib/useTabAtom'

function Layout() {
  const navigate = useNavigate()
  const location = useLocation()
  const { isLoggedIn, loggedOut } = useAuthAtom()
  const { updateTab } = useTabAtom()

  const logout = async () => {
    const res = await logOut()

    if (!res.ok) {
      console.error('logout failed')
    }

    loggedOut()
    navigate('/login');
  }

  useEffect(() => {
    ;(async function () {
      const tab = await getCurrentTab()
      updateTab(tab || { title: '', url: '' })
    }())
  }, [location])

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">Personal Bookmarks</Navbar.Brand>
          <Navbar.Collapse>
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/login">Login</Nav.Link>
            </Nav>
          </Navbar.Collapse>
          {isLoggedIn ? (
            <Button variant="primary" onClick={logout}>Logout</Button>
          ) : null}
        </Container>
      </Navbar>
      <Container className="py-3">
        <Outlet />
      </Container>
    </>
  );
}

export default Layout
