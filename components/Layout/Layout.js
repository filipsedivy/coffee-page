import React from "react";
import {NavBar} from "../NavBar";
import {Footer} from "../Footer";
import {Container} from "react-bootstrap";

export default function Layout({children}) {
    return (
        <>
            <NavBar/>
            <Container className="mt-4">
                {children}
            </Container>
            <Footer/>
        </>
    )
}