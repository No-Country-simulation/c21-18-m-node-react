
const Card = ({ name, age, size, gender, image }) => {
  return (
    <div className="new-card">
      <img src={image} alt='picture-pet' />
      <span className="span-name">"{name}"</span>
      <div className="text-container">
        <span>{gender}</span>
        <span>{size}</span>
        <span>{age} years</span>
      </div>
    </div>
  );
};

export default Card;
