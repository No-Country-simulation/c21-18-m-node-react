import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import * as API from '../../services/apiPetService';

function PetDetail() {
    const [pets, setPet] = useState([]);
    useEffect(() => {
        API.getPet(id)
            .then(setPet)
    }, []);
    return (
        <>
            <Navbar/>
            <div className="container">
                
            </div>
            <Footer />
        </>
    );
}

export default PetDetail;