import Markdown from "react-markdown";
import {join} from "path";
import {coffee} from "../../data/coffee";
import {Alert} from "react-bootstrap";
import Head from "next/head";

const POST_PATH = join(process.cwd(), '_articles', 'coffee');

const Coffee = ({page, content}) => {
    const gfm = require("remark-gfm");
    const renderers = {
        table: (props) => {
            return <table className="table table-bordered">{props.children}</table>
        }
    };

    return (
        <>
            <Head>
                <title>{page.name} | Encyklopedie kávy</title>
            </Head>
            <header>
                <h1>{page.name}</h1>
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
    const path = join(POST_PATH, `${page.slug}.md`)
    let content = null;

    if (fs.existsSync(path)) {
        content = fs.readFileSync(path, {
            encoding: "utf-8"
        });
    }

    return {
        props: {
            page: page,
            content: content
        }
    }
}

export default Coffee
