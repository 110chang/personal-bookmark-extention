import { Link, Outlet, useNavigate } from 'react-router-dom'
import { Button, Container, Nav, Navbar } from 'react-bootstrap'
import { logOut } from './lib/api'
import useAuth from './lib/useAuth'

function Layout() {
  const navigate = useNavigate()
  const { loggedOut } = useAuth()

  const logout = async () => {
    const res = await logOut()

    if (!res.ok) {
      console.error('logout failed')
    }

    loggedOut()
    navigate('/login');
  }

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
          <Button variant="primary" onClick={logout}>Logout</Button>
        </Container>
      </Navbar>
      <Container className="py-3">
        <Outlet />
      </Container>
    </>
  );
}

export default Layout
