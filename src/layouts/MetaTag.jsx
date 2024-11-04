import { Helmet } from 'react-helmet';

const MetaTag = ({ title, description }) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="robots" content="index, follow" />
        </Helmet>
    );
};

export default MetaTag;
