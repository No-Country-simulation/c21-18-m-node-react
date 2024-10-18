import React from 'react';
import './PetCard.css';

export default function PetCard({ name, age, size, gender, image }) {
    return (
        <div className="card">
            <article className='pet-article'>
                <img src={image} alt={name} />
                <div className="pet-info">
                    <span>{gender}</span>
                    <span>{size ?? 'Unknown'}</span>
                    <span>{age ?? 'Unknown'}</span>
                </div>
                <p className='name'>{name}</p>
            </article>
        </div>
    );
}

