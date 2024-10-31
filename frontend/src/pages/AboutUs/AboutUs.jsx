import './AboutUs.css';
import shelter1 from '../../assets/shelter1.jpg';
import shelter2 from '../../assets/shelter2.jpg';
import shelter3 from '../../assets/shelter-3.jpg';
import shelter4 from '../../assets/shelter-4.jpg';

function AboutUs() {
  const handleDonateClick = () => {
    window.location.href = "https://www.mercadopago.com.ar/";
  };

  return (
    <div className='about-container'>
      <article className='images-aboutUs'>
        <div>
          <img src={shelter1} alt="mujer con perro" loading="lazy" />
          <img src={shelter2} alt="mujeres con gato" loading="lazy" />
        </div>
        <img src={shelter3} alt="mujer lavando a un perro" loading="lazy" />
        <img src={shelter4} alt="voluntarios con perro" loading="lazy" />
      </article>
      <div className='description-about'>
        <p>
          En nuestra misión, creemos que cada animal merece un hogar lleno de amor y cuidado. Por eso, nos dedicamos a conectar refugios de animales con personas dispuestas a abrir sus corazones y hogares a perros y gatos que lo necesitan. La adopción transforma no solo la vida de los animales, sino también la de las familias que les brindan una segunda oportunidad. Somos un grupo de apasionados amantes de los animales, voluntarios y defensores de la adopción responsable. Nuestra plataforma ha sido creada para facilitar la búsqueda y conexión entre refugios y potenciales adoptantes, soñando con un mundo donde cada animal tenga la oportunidad de encontrar una familia que lo ame.
        </p>
        <p>
          Ofrecemos recursos y consejos sobre el proceso de adopción y la responsabilidad de ser un dueño de mascota. Fomentamos la adopción responsable a través de campañas de sensibilización y eventos comunitarios. Te invitamos a unirte a nuestra comunidad, ya sea que busques adoptar, ser voluntario o aprender más sobre cómo ayudar. Juntos, podemos hacer una diferencia en la vida de muchos animales que esperan encontrar su hogar ideal. Si tienes preguntas o sugerencias, no dudes en contactarnos; ¡estamos aquí para ayudarte a tomar la mejor decisión para ti y tu futuro compañero peludo!
        </p>
        <div className='donation-message'>
          <h2>Ayúdanos a darles un futuro mejor: ¡dona hoy!</h2>
          <p>
            Cada día, cientos de animales esperan su oportunidad de ser parte de una familia amorosa. Sin embargo, no todos los animales tienen la misma suerte. Algunos requieren atención médica, alimento, refugio temporal y cuidados especiales antes de poder encontrar su hogar definitivo. Tu donación puede marcar la diferencia en la vida de estos animales, brindándoles los recursos y el apoyo necesarios para transformar su futuro.
          </p>
          <p>
            Con tu ayuda, podremos continuar conectando refugios con familias, organizando campañas de adopción, y proporcionando servicios esenciales para aquellos que más lo necesitan. No importa el monto, cada aporte suma para mejorar la vida de un perro o gato que espera su segunda oportunidad.
          </p>
          <p>
            <strong>¡Dona ahora y sé parte de nuestro sueño de un mundo donde cada animal tenga un hogar lleno de amor!</strong>
          </p>
          <button onClick={handleDonateClick} className='donate-button'>¡Dona!</button>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;

