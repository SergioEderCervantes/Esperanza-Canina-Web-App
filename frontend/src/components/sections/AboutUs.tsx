import "@/styles/AboutUsCards.css";

// Definimos los tipos para nuestros datos

interface StatItemData {
  value: string;
  label: string;
}


const shelterStatsData: StatItemData[] = [
  { value: "15+", label: "Años de Experiencia" },
  { value: "600+", label: "Perros Rescatados" },
  { value: "180+", label: "Adopciones Exitosas" },
  { value: "50+", label: "Voluntarios Activos" },
];


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
      <div className="absolute inset-0 bg-gradient-to-t from-[#fafafa] to-transparent to-10% pb-20"></div>
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-100 mb-4 text-shadow-custom">
            Sobre el Albergue Patitas
          </h2>
          <p className="text-xl text-white max-w-3xl mx-auto text-shadow-custom">
            Conoce nuestra historia, misión y el impacto que hemos logrado en la
            comunidad durante más de una década
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 my-20">
          <div className="about-card shadow-lg">
            <div className="about-card-content">
              <h3 className="text-xl font-bold text-white mb-4 text-shadow-custom">
                Nuestra Misión
              </h3>
              <p className="text-white text-center text-shadow-custom">
                Rescatar, rehabilitar y encontrar hogares amorosos para perros
                abandonados, promoviendo la tenencia responsable de mascotas en
                nuestra comunidad
              </p>
            </div>
          </div>
          <div className="about-card shadow-lg">
            <div className="about-card-content">
              <h3 className="text-xl font-bold text-white mb-4 text-shadow-custom">
                Nuestra Visión
              </h3>
              <p className="text-white text-center text-shadow-custom">
                Un mundo donde cada perro tenga un hogar lleno de amor y cuidados,
                eliminando el abandono animal
              </p>
            </div>
          </div>
          <div className="about-card shadow-lg">
            <div className="about-card-content">
              <h3 className="text-xl font-bold text-white mb-4 text-shadow-custom">
                Nuestros Valores
              </h3>
              <p className="text-white text-center text-shadow-custom">
                Compasión, transparencia, dedicación y trabajo en equipo guían
                cada una de nuestras acciones diarias.
              </p>
            </div>
          </div>
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
