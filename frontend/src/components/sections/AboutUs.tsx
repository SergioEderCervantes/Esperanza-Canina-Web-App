// Definimos los tipos para nuestros datos
interface InfoCardData {
  title: string;
  description: string;
}

interface StatItemData {
  value: string;
  label: string;
}

const coreValuesData: InfoCardData[] = [
  {
    title: 'Nuestra Misión',
    description: 'Rescatar, rehabilitar y encontrar hogares amorosos para perros abandonados, promoviendo la tenencia responsable de mascotas en nuestra comunidad',
  },
  {
    title: 'Nuestra Visión',
    description: 'Un mundo donde cada perro tenga un hogar lleno de amor y cuidados, eliminando el abandono animal',
  },
  {
    title: 'Nuestros Valores',
    description: 'Compasión, transparencia, dedicación y trabajo en equipo guían cada una de nuestras acciones diarias',
  },
];

const shelterStatsData: StatItemData[] = [
  { value: '15+', label: 'Años de Experiencia' },
  { value: '250+', label: 'Perros Rescatados' },
  { value: '180+', label: 'Adopciones Exitosas' },
  { value: '50+', label: 'Voluntarios Activos' },
];

const InfoCard = ({ title, description }: InfoCardData) => (
  <div className="bg-neutral-300 p-8 rounded-xl text-justify h-full">
    <h3 className="text-xl font-bold text-center text-neutral-800 mb-4">{title}</h3>
    <p className="text-neutral-600">{description}</p>
  </div>
);

const StatItem = ({ value, label }: StatItemData) => (
  <div className="text-center">
    <div className="text-5xl font-bold text-neutral-50 mb-2">{value}</div>
    <p className="text-white">{label}</p>
  </div>
);

const AboutUs = () => {
  return (
    <section 
      id="aboutUs" 
      className="relative md:p-16 py-16 px-8 bg-cover bg-center bg-[url(/images/hermanos.jpg)]
      lg:bg-[url(/images/hermanosXL.jpg)]"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#fafafa] to-transparent to-40%"></div>
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-neutral-800 mb-4">Sobre el Albergue Patitas</h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Conoce nuestra historia, misión y el impacto que hemos logrado en la comunidad durante más de una década
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 my-20">
          {coreValuesData.map((item) => (
            <InfoCard key={item.title} title={item.title} description={item.description} />
          ))}
        </div>

        <div className="backdrop-blur-xl p-4 rounded-2xl grid grid-cols-2 md:grid-cols-4 gap-8">
          {shelterStatsData.map((stat) => (
            <StatItem key={stat.label} value={stat.value} label={stat.label} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
