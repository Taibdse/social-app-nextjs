import LogoIcon from '@/assets/img/icons/logo.svg';
import classNames from 'classnames';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import NavDropdown from 'react-bootstrap/NavDropdown';
import styles from './styles.module.css';
import Image from 'next/image';

const OFF_CANVAS_WIDTH = '280px';

export default function AppNavbar() {
  const expand = 'md';

  return (
    <>
      <Navbar expand={expand} className={`${styles.navbar}`}>
        <Container>
          <NextLink href={'/'} passHref>
            <Navbar.Brand>
              <Image width={200} height={35.5} src={'/assets/img/icons/logo.svg'} alt="" />
            </Navbar.Brand>
          </NextLink>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-${expand}`}
            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
            placement="end"
            style={{ width: OFF_CANVAS_WIDTH }}
          >
            <Offcanvas.Header closeButton></Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1">
                <Nav.Link
                  as={NextLink}
                  href="#"
                  className={styles['nav-link']}
                >
                  Blog
                </Nav.Link>
                <Nav.Link
                  as={NextLink}
                  href="/social/create"
                  className={styles['nav-link']}
                >
                  Socials
                </Nav.Link>
                <Nav.Link
                  as={NextLink}
                  href="#"
                  className={styles['nav-link']}
                >
                  Past Socials
                </Nav.Link>
                <NavDropdown
                  title="Clubs"
                  id={`offcanvasNavbarDropdown-expand-${expand}`}
                  className={classNames(styles['nav-dropdown'], 'mr-5')}
                >
                  <NavDropdown.Item href="#">Club 1</NavDropdown.Item>
                  <NavDropdown.Item href="#">Club 2</NavDropdown.Item>
                </NavDropdown>
                <Nav.Link
                  as={NextLink}
                  href="#"
                  className={styles['nav-link']}
                >
                  Contact
                </Nav.Link>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  )
}
