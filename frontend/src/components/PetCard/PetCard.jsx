import React from 'react';
import './PetCard.css';

export default function PetCard() {
    const data ={
        image: 'https://animalxop.com/cdn/shop/articles/playful-miniature-husky-puppy-1536x1104.jpg?v=1701896652',
        name: 'Buddy',
        age: 3,
        sex: 'Male',
        size: 'Medium'
    }
    const { image, name, age, sex, size } = data;

    return (
        <div className="card">
            <article className='pet-article'>
                <img src={image} alt="" />
                <div className="pet-info">
                    <span>{sex}</span>
                    <span>{size}</span>
                    <span>{age ??  'Unknown'}</span>
                </div>
                <p>{ name } </p>
            </article>
        </div>
    );
}

