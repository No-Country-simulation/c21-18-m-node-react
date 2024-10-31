import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export const SkeletonCard = () => {
    return (
        <SkeletonTheme baseColor="#d6d9d5" highlightColor="#bdbdbc" duration={1}>
            <div className="skeleton-card">
                <article className="skeleton-article">
                    {/* Skeleton para la imagen */}
                    <Skeleton 
                        width="80%" 
                        height="200px" 
                        style={{ borderRadius: '10px', margin: '30px 0' }} 
                    />
                    {/* Skeleton para el nombre */}
                    <Skeleton 
                        width="60%"
                        height="35px"
                        style={{ marginBottom: '15px', borderRadius: '4px' }} 
                    />
                </article>
            </div>
        </SkeletonTheme>
    );
};


