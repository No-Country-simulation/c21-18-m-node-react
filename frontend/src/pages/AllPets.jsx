import FilterButton from '../components/FilterButton/FilterButton'
import Footer from '../components/Footer/Footer';
import Card from '../components/PetCard/Card'


const AllPets = () => {

    const pets = []
    

    return (
        <>
            <FilterButton/>

            <div className='card-container'>
                <Card/>
                <Card/>
                <Card/>
            </div>
            <Footer/>
        </>
    )
}

export default AllPets;