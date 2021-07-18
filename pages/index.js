import Head from "next/head";
import Link from "next/link";
import {Row, Col, Card, Button} from "react-bootstrap";
import {coffee} from "../data/coffee";


export const getStaticProps = async () => {
    return {
        props: {
            coffeeList: coffee
        },
    }
}

export default function Home({coffeeList}) {
    return (
        <div>
            <Head>
                <title>Amatérská encyklopedie kávy</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <main>
                <Row>
                    {coffeeList.map(item => (
                        <Col key={item.slug} className="pb-3" sm={1} md={1} lg={3}>
                            <Card className="h-100">
                                {item.hasOwnProperty('image') ?
                                    <Card.Img src={item.image} className="card-img-top"/> :
                                    <Card.Img
                                        src="https://www.betterwalls.com/pim/pr/WP/20000187/photo-wallpaper-coffe-break_big01.jpg"
                                        className="card-img-top"/>}
                                <Card.Body className="text-center">
                                    <Card.Title>{item.name}</Card.Title>
                                    <Link href={"/coffee/" + item.slug}>
                                        <Button size="sm" variant="primary">Zobrazit podrobnosti</Button>
                                    </Link>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </main>
        </div>
    )
}
