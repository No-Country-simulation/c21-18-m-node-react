import './PetCard.css';
import PropTypes from 'prop-types';

export default function PetCard({ name, age, size, gender, image }) {
    return (
        <div className="card">
            <article className='pet-article'>
                <img src={image} alt={name} />
                <div className="pet-info">
                    <span>{gender ? gender.toLowerCase() : 'unknown'}</span>
                    <span>{size ? size.toLowerCase() : 'unknown'}</span>
                    <span>{age ? `${age.toString().toLowerCase()} años` : 'unknown años'}</span>
                </div>
                <p className='name'>{name ? name.toLowerCase() : 'unknown'}</p>
            </article>
        </div>
    );
}

PetCard.propTypes = {
    name: PropTypes.string,
    age: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    size: PropTypes.string,
    gender: PropTypes.string,
    image: PropTypes.string,
};


