import { Button, Container, Form, Nav, Navbar } from "react-bootstrap";
import './NavBar.scss';
import SearchButton from "../buttons/SearchButton";

interface IProps {

}

const NavBar: React.FC<IProps> =  ({

}) => {
    return (
        <Navbar expand="lg" data-bs-theme="#F0E68C" className="navbar-custom">
      <Container fluid>
        <Navbar.Brand href="#">Films API</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link className="navbar-item" href="/">Home</Nav.Link>
            <Nav.Link className="navbar-item" href="/favorite-films">My favorite films</Nav.Link>
            <Nav.Link className="navbar-item" href="/search">
              Search Film
            </Nav.Link>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <SearchButton onClick={() => null} />
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    )
}

export default NavBar;