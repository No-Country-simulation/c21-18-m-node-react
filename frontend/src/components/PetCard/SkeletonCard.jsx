import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import './SkeletonCard.css';
import 'react-loading-skeleton/dist/skeleton.css';

export const SkeletonCard = () => {
    return (
        <SkeletonTheme baseColor="#d6d9d5" highlightColor="#bdbdbc" duration={1}>
            <div className="skeleton-card">
                <article className="skeleton-article">
                    {/* Skeleton para la imagen */}
                    <Skeleton className="skeleton-image" 
                        height="200px"
                        width="250px"
                        style={{ borderRadius: '10px', margin: '30px 0' }} 
                    />
                    {/* Skeleton para el nombre */}
                    <Skeleton 
                        className="skeleton-name"
                        height="35px"
                        width="250px"
                        style={{ marginBottom: '15px', borderRadius: '4px' }} 
                    />
                </article>
            </div>
        </SkeletonTheme>
    );
};


