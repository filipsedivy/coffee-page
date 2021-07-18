import React from "react";
import Link from "next/link";
import {Container, Navbar} from "react-bootstrap";


const NavBar = () => {
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Link passHref href="/">
                    <Navbar.Brand>Amatérská encyklopedie kávy</Navbar.Brand>
                </Link>
            </Container>
        </Navbar>
    );
};

export default NavBar;