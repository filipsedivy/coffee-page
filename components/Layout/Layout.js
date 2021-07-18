import React from "react";
import {NavBar} from "../NavBar";
import {Container} from "react-bootstrap";

export default function Layout({children}) {
 return (
     <>
        <NavBar />
        <Container className="mt-4">
            {children}
        </Container>
     </>
 )
}