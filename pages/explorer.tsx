import React, { useState } from 'react';
import ExplorerPage from '../src/components/explorerPage/ExplorerPage';
import FeedLayout from '../src/components/layout/FeedLayout';
import Layout from '../src/components/layout/Layout';

interface Props {
    window?: () => Window;
}

export default function Explorer(props: Props) {
    return (
        <Layout>
            <FeedLayout>
                <ExplorerPage />
            </FeedLayout>
        </Layout>
    );
}
