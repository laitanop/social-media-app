import React, { useState } from 'react';
import HomePage from '../src/components/homePage/HomePage';
import FeedLayout from '../src/components/layout/FeedLayout';
import Layout from '../src/components/layout/Layout';

interface Props {
    window?: () => Window;
}

export default function Home(props: Props) {
    return (
        <Layout>
            <FeedLayout>
                <HomePage />
            </FeedLayout>
        </Layout>
    );
}
