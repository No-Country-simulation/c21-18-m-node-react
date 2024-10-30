import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'


export const SkeletonCard = () => {
    return (
        <SkeletonTheme baseColor='#d6d9d5' highlightColor='#bdbdbc' duration={1}>
            <div className='skeleton__group'>
                <div className='skeleton__content'>
                    <Skeleton className='skeleton__title'/>
            </div>
        </div>
    </SkeletonTheme>
    )
}
