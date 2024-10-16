const pet = {
  name: "Chuleta",
  edad: '6 años',
  tamanio: "grande",
  sexo: "macho",
  picture: "/dog.png",
};

const Card = () => {
  return (
    <div className="new-card">
      <img src={pet.picture} />
      <span className="span-name">"{pet.name}"</span>
      <div className="text-container">
        <span>{pet.sexo}</span>
        <span>{pet.tamanio}</span>
        <span>{pet.edad}</span>
      </div>
    </div>
  );
};

export default Card;
