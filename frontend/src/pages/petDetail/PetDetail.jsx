import { getPet } from '../../services/apiPetService';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './petDetail.css';
import { Link } from 'react-router-dom';


function PetDetail() {
    const { id } = useParams();
    const [pet, setPet] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getPet(id)
            .then((data) => {
                setPet(data);  // Guardar la mascota recibida
                setLoading(false);  // Dejar de mostrar el estado de carga
            })
            .catch((error) => {
                console.error("Error al obtener la mascota:", error);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return <div>Cargando...</div>;
    }

    if (!pet) {
        return <div>No se encontró la mascota.</div>;
    }

    return (
        <>
            <div className="container">
                <h1>{pet.data.name}</h1>
                <div className='image'>
                    <img src={pet.data.picture} alt={pet.name} />
                </div>
                <section className='info'>
                    <div className='items'>
                        <p><b>Edad:</b> {pet.data.age}</p>
                        <p><b>Tamaño:</b> {pet.data.size}</p>
                        <p><b>Género:</b> {pet.data.gender}</p>
                    </div>
                    <div className='description'>
                        <p><b>Descripción:</b> </p>
                        <p>{pet.data.description}</p>
                    </div>
                </section>
                <Link to={'/adoptPet/:id'} className='a'>
                    <button>Adoptame</button>
                </Link>
            </div>
        </>
    );
}

export default PetDetail;