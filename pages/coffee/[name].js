import Markdown from "react-markdown";
import {join} from "path";
import {coffee} from "../../data/coffee";
import {config} from "../../data/config";
import {Alert, Col, Dropdown, DropdownButton, Image, Row} from "react-bootstrap";
import Head from "next/head";
import {CoffeeProperties} from "../../components/CoffeeProperties";

const POST_PATH = join(process.cwd(), '_articles', 'coffee');

const Coffee = ({page, content, properties}) => {
    const gfm = require("remark-gfm");
    const renderers = {};

    return (
        <>
            <Head>
                <title>{page.name} | Encyklopedie kávy</title>
            </Head>
            <header>
                <Row>
                    <Col>
                        <h1>{page.name}</h1>
                    </Col>
                    <Col>
                        <DropdownButton title="Upravit" size="sm" className="float-end">
                            <Dropdown.Item
                                href={`${config.baseRepositoryUrl}/_articles/coffee/${page.slug}.md`}
                                target="_blank">
                                Stránku
                            </Dropdown.Item>
                            <Dropdown.Item
                                href={`${config.baseRepositoryUrl}/data/coffee/${page.slug}.json`}
                                target="_blank">
                                Vlastnosti
                            </Dropdown.Item>
                        </DropdownButton>
                    </Col>
                </Row>

                <Row>
                    <Col><CoffeeProperties head={properties.head} data={properties.data}/></Col>
                    <Col><Image src={page.image} rounded fluid/></Col>
                </Row>
                {content === null ?
                    <Alert variant="warning">
                        <Alert.Heading>Chyba aplikace</Alert.Heading>
                        <p>
                            Omlouváme se, ale chybí stránka <code>_articles/coffee/{page.slug}.md</code>.
                        </p>
                    </Alert> :
                    <Markdown components={renderers} remarkPlugins={[gfm]} children={content} linkTarget="_blank"/>}
            </header>
        </>
    )
}


export async function getStaticPaths() {
    const paths = coffee.map((element) => ({
        params: {name: element.slug}
    }))

    return {paths, fallback: false}
}

export async function getStaticProps({params}) {
    const page = coffee.find(page => page.slug === params.name) || {notfound: true};

    const fs = require("fs");
    const path = join(POST_PATH, `${page.slug}.md`);

    const propertiesPath = join(process.cwd(), 'data', 'coffee', `${page.slug}.json`);
    let properties = {};
    if (fs.existsSync(propertiesPath)) {
        let buffer = fs.readFileSync(propertiesPath);
        properties = JSON.parse(buffer).properties;
    }

    let content = null;

    if (fs.existsSync(path)) {
        content = fs.readFileSync(path, {
            encoding: "utf-8"
        });
    }

    return {
        props: {
            page: page,
            content: content,
            properties: {
                head: config.coffeePropertiesTable,
                data: properties
            }
        }
    }
}

export default Coffee
