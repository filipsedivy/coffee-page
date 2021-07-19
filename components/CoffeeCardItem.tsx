import React from "react";
import {Button, Card} from "react-bootstrap";
import Link from "next/link";

type CoffeeCardItemProps = {
    title: string,
    slug: string,
    image?: string,
    tags?: string[]
}

export class CoffeeCardItem extends React.Component<CoffeeCardItemProps> {
    render() {
        return (
            <Card className="h-100">
                {this.props.image ?
                    <Card.Img src={this.props.image} className="card-img-top"/> :
                    <Card.Img src="https://www.betterwalls.com/pim/pr/WP/20000187/photo-wallpaper-coffe-break_big01.jpg"
                              className="card-img-top"/>}

                <Card.Body className="text-center">
                    <Card.Title>{this.props.title}</Card.Title>

                    {this.props.tags ? this.props.tags.map(tag => (
                        <span className="badge bg-primary me-2">{tag}</span>
                    )) : null}
                </Card.Body>

                <Card.Footer className="text-center">
                    <Link href={`coffee/${this.props.slug}`}>
                        <Button size="sm" variant="primary">Zobrazit podrobnosti</Button>
                    </Link>
                </Card.Footer>
            </Card>
        )
    }
}