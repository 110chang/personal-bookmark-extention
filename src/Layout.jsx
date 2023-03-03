import { Link, Outlet } from 'react-router-dom'
import { Button, Container, Nav, Navbar } from 'react-bootstrap'
import useLayout from './useLayout'

function Layout() {
  const {
    isLoggedIn,
    logOut,
  } = useLayout()

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
            <Button variant="primary" onClick={logOut}>Logout</Button>
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
