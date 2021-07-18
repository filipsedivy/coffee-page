import React from "react";
import Head from "next/head";
import {Layout} from "../components/Layout";

import "bootstrap/dist/css/bootstrap.css";
import "../styles/styles.sass";

function MyApp({Component, pageProps}) {
    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
            </Head>

            <Layout>
                <Component {...pageProps} />
            </Layout>
        </>
    );
}

export default MyApp
