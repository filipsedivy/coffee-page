import Head from "next/head";
import {Row, Col, Card, Button} from "react-bootstrap";
import {coffee} from "../data/coffee";
import {CoffeeCardItem} from "../components/CoffeeCardItem";

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
                            <CoffeeCardItem
                                key={item.slug}
                                title={item.name}
                                slug={item.slug}
                                image={item.hasOwnProperty('image') ? item.image : null}
                                tags={item.hasOwnProperty('tags') ? item.tags : null}/>
                        </Col>
                    ))}
                </Row>
            </main>
        </div>
    )
}
