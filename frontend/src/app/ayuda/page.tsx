//Informacion de donaciones y voluntariado
//redireccion a whatsapp

export default function AyudaPage() {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
            <div className="max-w-3xl w-full bg-white p-8 rounded-lg shadow-md">
                <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Cómo Puedes Ayudar</h1>
                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-700">Donaciones</h2>
                    <p className="text-gray-600 mb-4">  Ayudar a nuestros amigos peludos nunca ha sido tan fácil. Puedes contribuir de las siguientes maneras:</p>
                    <ul className="list-disc list-inside text-gray-600 space-y-2">
                        <li>Donaciones Monetarias: Cada aporte, grande o pequeño, hace una gran diferencia. Puedes donar a través de nuestra cuenta bancaria o plataformas de pago en línea.</li>   
                        <li>Donaciones en Especie: Siempre estamos en necesidad de alimentos, medicinas, mantas y juguetes. Consulta nuestra lista de necesidades actuales en nuestro sitio web.</li>
                        <li>Donaciones de Tiempo: Si no puedes donar dinero, considera donar tu tiempo. Ayuda con el cuidado de los perros, limpieza o eventos de recaudación de fondos.</li>
                    </ul>
                </section>
                    <h2 className="text-2xl font-semibold mb-4 text-gray-700">Voluntariado</h2>
                    <p className="text-gray-600 mb-4">  Únete a nuestro equipo de voluntarios y marca la diferencia en la vida de estos perros. Como voluntario, puedes:</p>
                    <ul className="list-disc list-inside text-gray-600 space-y-2">
                        <li>Cuidar y socializar con los perros.</li>
                        <li>Ayudar en eventos y campañas de adopción.</li>
                        <li>Asistir en tareas administrativas y de mantenimiento.</li>
                    </ul>
                    <p className="text-gray-600 mt-4">Para más información sobre cómo donar o convertirte en voluntario, contáctanos a través de nuestro correo electrónico o número de teléfono. ¡Tu ayuda es invaluable!</p>
            </div>
        </div>
    )
}
                    