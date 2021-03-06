import { Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

export function AppNavBar() {
  return (
    <Navbar bg="dark" expand="lg" variant="dark">
      <Navbar.Brand as={Link} to="/">
        Online Corona consultancy
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link as={Link} to="/create-patient">
            Patient Registration
          </Nav.Link>
          <Nav.Link as={Link} to="/list-patient">
            Patient List
          </Nav.Link>
          <Nav.Link as={Link} to="/create-services">
            Create Services
          </Nav.Link>
          <Nav.Link as={Link} to="/list-services">
            Services List
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
