
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-black text-white pt-20 pb-16">
      <div className="container mx-auto px-4">
        <div className="py-8">
          <h1 className="text-4xl font-display mb-6 text-center">
            Política de <span className="text-racing-red">Privacidad</span>
          </h1>
          
          <div className="mt-8 bg-black border border-gray-800 rounded-lg p-8">
            <p className="text-gray-300 mb-6">
              De conformidad con la Ley Orgánica 3/2018, de 5 de diciembre, de Protección de Datos Personales y garantía de los derechos digitales (LOPD) y el Reglamento General de Protección de Datos 
              (RGPD) de la Unión Europea, SUPERPORRA MOTOR pone en su conocimiento que los datos de carácter personal suministrados por sus usuarios quedarán incorporados en ficheros 
              automatizados bajo su responsabilidad.
            </p>
            
            <div className="mb-8">
              <h2 className="text-xl font-medium text-white mb-2">Identidad</h2>
              <p className="text-gray-300">SUPERPORRA MOTOR</p>
              <p className="text-gray-300">Correo electrónico: info@superporramotor.com</p>
            </div>
            
            <div className="mb-8">
              <h2 className="text-xl font-medium text-white mb-2">Finalidad del tratamiento de los datos</h2>
              <p className="text-gray-300">
                Con carácter general, sus datos personales serán usados para poder relacionarnos con usted y poder prestarle nuestros servicios. Asimismo, también pueden ser usados para otras actividades, 
                como enviarle publicidad o promocionar nuestras actividades.
              </p>
            </div>
            
            <div className="mb-8">
              <h2 className="text-xl font-medium text-white mb-2">Legitimación para el tratamiento de los datos</h2>
              <p className="text-gray-300">
                El tratamiento de sus datos personales se basa en la ejecución del contrato entre SUPERPORRA MOTOR y el usuario, así como en el cumplimiento de obligaciones legales y el consentimiento 
                expreso del usuario para determinados tratamientos.
              </p>
            </div>
            
            <div className="mb-8">
              <h2 className="text-xl font-medium text-white mb-2">Cesiones de datos a terceros</h2>
              <p className="text-gray-300 mb-4">Los datos podrán ser cedidos a:</p>
              <ul className="space-y-2 text-gray-300 pl-6 list-disc">
                <li>Entidades bancarias para la gestión de pagos y cobros.</li>
                <li>Administración tributaria y Seguridad Social para cumplir con obligaciones fiscales.</li>
                <li>Empresas colaboradoras necesarias para la prestación del servicio.</li>
              </ul>
              <p className="text-gray-300 mt-4">
                No se realizarán transferencias de datos a países fuera del Espacio Económico Europeo sin el consentimiento del usuario y sin aplicar medidas de seguridad adecuadas.
              </p>
            </div>
            
            <div className="mb-8">
              <h2 className="text-xl font-medium text-white mb-2">Seguridad de los datos</h2>
              <p className="text-gray-300 mb-4">
                Protegeremos sus datos con medidas de seguridad eficaces en función de los riesgos que conlleve el uso de su información.
              </p>
              <p className="text-gray-300">
                Para ello, nuestra entidad ha aprobado una Política de Protección de Datos y se realizan controles y auditorías anuales para verificar que sus datos personales están seguros en todo momento.
              </p>
            </div>
            
            <div className="mb-8">
              <h2 className="text-xl font-medium text-white mb-2">Derechos del usuario</h2>
              <p className="text-gray-300 mb-4">El usuario tiene derecho a:</p>
              <ul className="space-y-2 text-gray-300 pl-6 list-disc">
                <li>Acceder a sus datos personales.</li>
                <li>Rectificar los datos inexactos o solicitar su eliminación cuando ya no sean necesarios.</li>
                <li>Oponerse o limitar el tratamiento de sus datos.</li>
                <li>Solicitar la portabilidad de sus datos a otra entidad.</li>
              </ul>
              <p className="text-gray-300 mt-4">
                Para ejercer estos derechos, el usuario podrá enviar una solicitud escrita, junto con una copia de su D.N.I., a la dirección de correo electrónico indicada arriba.
              </p>
            </div>
            
            <div className="mb-8">
              <h2 className="text-xl font-medium text-white mb-2">Duración del almacenamiento de los datos</h2>
              <p className="text-gray-300">
                Conservaremos sus datos durante nuestra relación y mientras nos obliguen las leyes. Una vez finalizados los plazos legales aplicables, procederemos a eliminarlos de forma segura y respetuosa 
                con el medio ambiente.
              </p>
            </div>
            
            <div className="mb-8">
              <h2 className="text-xl font-medium text-white mb-2">Elaboración de perfiles</h2>
              <p className="text-gray-300 mb-4">
                Nuestra política es no elaborar perfiles sobre los usuarios de nuestros servicios. No obstante, pueden existir situaciones en las que, con fines de prestación del servicio, comerciales o de otro tipo, 
                necesitemos elaborar perfiles de información sobre usted. Un ejemplo pudiera ser la utilización de su historial de compras o servicios para poder ofrecerle productos o servicios adaptados a sus 
                gustos o necesidades.
              </p>
              <p className="text-gray-300">
                En tal caso, aplicaremos medidas de seguridad eficaces que protejan su información en todo momento de personas no autorizadas que pretendan utilizarla en su propio beneficio.
              </p>
            </div>
            
            <div className="mb-8">
              <h2 className="text-xl font-medium text-white mb-2">Modificación de la política de privacidad</h2>
              <p className="text-gray-300">
                SUPERPORRA MOTOR se reserva el derecho de modificar esta política de privacidad para adaptarla a novedades legislativas o cambios en el servicio. En caso de cambios significativos, se 
                informará a los usuarios a través de la plataforma o por correo electrónico.
              </p>
            </div>
            
            <div className="mb-8">
              <h2 className="text-xl font-medium text-white mb-2">Contacto y reclamaciones</h2>
              <p className="text-gray-300 mb-4">
                Si el usuario considera que sus derechos han sido vulnerados, puede presentar una reclamación ante la Agencia Española de Protección de Datos a través de:
              </p>
              <div className="text-gray-300 mb-2">
                <strong className="text-white">Sede electrónica:</strong> www.aepd.es
              </div>
              <div className="text-gray-300 mb-2">
                <strong className="text-white">Dirección postal:</strong> Agencia Española de Protección de Datos. C/ Jorge Juan, 6, 28001 Madrid.
              </div>
              <div className="text-gray-300 mb-4">
                <strong className="text-white">Vía telefónica:</strong> 901 100 099 / 91 266 35 17
              </div>
              <p className="text-gray-300">
                Formular una reclamación en la Agencia Española de Protección de Datos no conlleva ningún coste y no es necesaria la asistencia de abogado ni procurador.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
