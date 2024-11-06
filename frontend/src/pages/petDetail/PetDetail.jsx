import { getPet } from "../../services/apiPetService";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./petDetail.css";
import Cookies from "js-cookie";
import { SkeletonCard } from "../../components/PetCard/SkeletonCard";

function PetDetail() {
  const { id } = useParams();
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const userCredentials = JSON.parse(Cookies.get("user") || "{}");

  useEffect(() => {
    getPet(id)
      .then((data) => {
        setPet(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al obtener la mascota:", error);
        setLoading(false);
      });
  }, [id]);

  const handleAdoptClick = () => {
    if (!userCredentials || Object.keys(userCredentials).length === 0) {
      alert("Debes estar logueado para adoptar una mascota.");
    } else {
      window.location.href = `/ApplyForm/${id}`;
    }
  };

  if (loading) {
    return (
      <div className="skeleton-container">
        <SkeletonCard />
      </div>
    );
  }

  if (!pet) {
    return <div>No se encontró la mascota.</div>;
  }

  return (
    <div className="container-title">
      <h1>{pet.data.name}</h1>
      <div className="container">
        <div className="image">
          <img src={pet.data.picture} alt={pet.name} />
        </div>
        <section className="info">
          <div className="items">
            <p>
              <b>Edad:</b> {pet.data.age} años
            </p>
            <p>
              <b>Tamaño:</b> {pet.data.size.toLowerCase()}
            </p>
            <p>
              <b>Género:</b> {pet.data.gender.toLowerCase()}
            </p>
          </div>
          <div className="description">
            <p>
              <b>Descripción:</b>{" "}
            </p>
            <p>{pet.data.description}</p>
          </div>
        </section>
        <button onClick={handleAdoptClick}>Adoptame</button>
      </div>
    </div>
  );
}

export default PetDetail;
