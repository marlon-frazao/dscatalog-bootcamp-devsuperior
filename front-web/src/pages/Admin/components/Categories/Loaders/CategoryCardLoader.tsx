import React from 'react';
import ContentLoader from 'react-content-loader';

const CardLoader = () => (
    <ContentLoader
        speed={1}
        width="100%"
        height={460}
        backgroundColor="#ecebeb"
        foregroundColor="#d6d2d2"
    >
        <rect x="0" y="0" rx="10" ry="10" width="100%" height="80" />
        <rect x="0" y="100" rx="10" ry="10" width="100%" height="80" />
        <rect x="0" y="200" rx="10" ry="10" width="100%" height="80" />
    </ContentLoader>
)

export default CardLoader;