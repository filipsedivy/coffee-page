import {Table} from "react-bootstrap";
import React from "react";


export default function CoffeeProperties(props) {
    return (
        <>
            <Table striped bordered>
                <tbody>
                {Object.keys(props.head).map((e, i) => {
                    return (
                        <tr>
                            <td>{props.head[e]}</td>
                            <td>{props.data.hasOwnProperty(e) ? props.data[e] :
                                <small className="text-muted">informace nedostupná</small>}</td>
                        </tr>
                    );
                })}
                </tbody>
            </Table>
        </>
    )
}

