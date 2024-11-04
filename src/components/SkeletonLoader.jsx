import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SkeletonLoader = ({ type, count = 1, width = '100%', height = 20, circle = false }) => {
    const renderSkeleton = () => {
        if (type === 'text') {
            return <Skeleton count={count} height={height} width={width} />;
        }
        if (type === 'circle') {
            return <Skeleton circle={circle} height={height} width={height} />;
        }
        // Add more types as needed
        return null;
    };

    return (
        <div className="skeleton-loader">
            {renderSkeleton()}
        </div>
    );
};

export default SkeletonLoader;
