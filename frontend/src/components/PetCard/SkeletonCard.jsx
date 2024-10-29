import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import './SkeletonCard.css'

export const SkeletonCard = () => {
    return (
        <SkeletonTheme baseColor='#a8a3a3' highlightColor='#444' duration={1}>
            <div className='skeleton__group'>
                <div className='skeleton__content'>
                    <Skeleton className='skeleton__title' height={50} />
                    <Skeleton height={20} count={2} />
            </div>
        <Skeleton className='skeleton__img' />
        </div>
    </SkeletonTheme>
    )
}
