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
                <Card className="mb-3">
                    <Card.Body>
                        V databázi se momentálně nachází <b className="text-primary">{coffeeList.length}</b> druhů kávy.
                    </Card.Body>
                </Card>

                <Row sm="1" md="2" lg="3">
                    {coffeeList.map(item => (
                        <Col key={item.slug} className="pb-3">
                            <Card className="h-100">
                                {item.hasOwnProperty('image') ?
                                    <Card.Img src={item.image} className="card-img-top"/> :
                                    <Card.Img
                                        src="https://www.betterwalls.com/pim/pr/WP/20000187/photo-wallpaper-coffe-break_big01.jpg"
                                        className="card-img-top"/>}
                                <Card.Body className="text-center">
                                    <Card.Title>{item.name}</Card.Title>
                                    {item.hasOwnProperty('tags') ? item.tags.map(tag => (
                                        <span className="badge bg-primary me-2">{tag}</span>)) : null}
                                </Card.Body>
                                <Card.Footer className="text-center">
                                    <Link href={"/coffee/" + item.slug}>
                                        <Button size="sm" variant="primary">Zobrazit podrobnosti</Button>
                                    </Link>
                                </Card.Footer>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </main>
        </div>
    )
}
