
import FilterButton from '../../components/FilterButton/FilterButton';
import Card from '../../components/PetCard/Card';


const AllPets = () => {
    return (
        <>
            <FilterButton/>

            <div className='card-container'>
                <Card/>
                <Card/>
                <Card/>
            </div>
        </>
    )
}

export default AllPets;

