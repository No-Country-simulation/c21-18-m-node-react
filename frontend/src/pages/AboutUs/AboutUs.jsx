import './AboutUs.css';
import shelter1 from '../../assets/shelter1.jpg';
import shelter2 from '../../assets/shelter2.jpg';
import shelter3 from '../../assets/shelter-3.jpg';
import shelter4 from '../../assets/shelter-4.jpg';
import shelter5 from '../../assets/shelter-5.jpg';
import shelter6 from '../../assets/shelter-6.jpg';

function AboutUs() {
  return (
    <div className='about-container'>
      <article className='images-aboutUs'>
        <div>
        <img src={shelter1} alt="mujer con perro" />
        <img src={shelter2} alt="mujeres con gato" />
        </div>
        <div>
        <img src={shelter5} alt="mujer con perro" />
        <img src={shelter6} alt="niña con gato" />
        </div>
        <img src={shelter3} alt="mujer lavando a un perro" />
        <img src={shelter4} alt="voluntarios con perro" />
      </article>
      <div className='description-about'>
      <p>
        En nuestra misión, creemos que cada animal merece un hogar lleno de amor y cuidado. Por eso, nos dedicamos a conectar refugios de animales con personas dispuestas a abrir sus corazones y hogares a perros y gatos que lo necesitan. La adopción transforma no solo la vida de los animales, sino también la de las familias que les brindan una segunda oportunidad. Somos un grupo de apasionados amantes de los animales, voluntarios y defensores de la adopción responsable. Nuestra plataforma ha sido creada para facilitar la búsqueda y conexión entre refugios y potenciales adoptantes, soñando con un mundo donde cada animal tenga la oportunidad de encontrar una familia que lo ame.
    </p>
    <p>
        Ofrecemos recursos y consejos sobre el proceso de adopción y la responsabilidad de ser un dueño de mascota. Fomentamos la adopción responsable a través de campañas de sensibilización y eventos comunitarios. Te invitamos a unirte a nuestra comunidad, ya sea que busques adoptar, ser voluntario o aprender más sobre cómo ayudar. Juntos, podemos hacer una diferencia en la vida de muchos animales que esperan encontrar su hogar ideal. Si tienes preguntas o sugerencias, no dudes en contactarnos; ¡estamos aquí para ayudarte a tomar la mejor decisión para ti y tu futuro compañero peludo!
    </p>
      </div>
    </div>
  );
}

export default AboutUs;

