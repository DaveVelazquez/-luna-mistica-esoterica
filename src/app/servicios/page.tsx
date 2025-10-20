import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Clock, Video, Users, Star } from 'lucide-react'

// Datos de ejemplo hasta que Supabase esté configurado
const services = [
  {
    id: '1',
    slug: 'lectura-tarot-general',
    name: 'Lectura de Tarot General',
    description_md: 'Lectura completa de 3 cartas para orientación general sobre tu situación actual, desafíos y oportunidades.',
    duration_min: 45,
    price_mxn: 350,
    mode: 'video' as const,
    features: ['Interpretación detallada', 'Registro de la sesión', 'Seguimiento posterior'],
    popular: false
  },
  {
    id: '2',
    slug: 'lectura-tarot-amor',
    name: 'Lectura de Tarot del Amor',
    description_md: 'Consulta especializada en temas del corazón, relaciones actuales y compatibilidad de pareja.',
    duration_min: 60,
    price_mxn: 450,
    mode: 'video' as const,
    features: ['Enfoque en relaciones', 'Consejos personalizados', 'Ritual de amor incluido'],
    popular: true
  },
  {
    id: '3',
    slug: 'carta-natal',
    name: 'Carta Natal Personalizada',
    description_md: 'Análisis completo de tu carta astral natal con interpretación detallada de planetas, casas y aspectos.',
    duration_min: 90,
    price_mxn: 650,
    mode: 'video' as const,
    features: ['Carta astral completa', 'Informe PDF', 'Predicciones anuales'],
    popular: false
  },
  {
    id: '4',
    slug: 'consulta-presencial',
    name: 'Consulta Presencial VIP',
    description_md: 'Lectura de tarot presencial en nuestro consultorio especialmente ambientado con cristales y aromas.',
    duration_min: 60,
    price_mxn: 550,
    mode: 'in_person' as const,
    features: ['Ambiente especial', 'Cristales personalizados', 'Té de hierbas incluido'],
    popular: false
  },
  {
    id: '5',
    slug: 'lectura-numerologia',
    name: 'Análisis Numerológico',
    description_md: 'Descubre los secretos de tu personalidad y destino a través del poder de los números.',
    duration_min: 45,
    price_mxn: 380,
    mode: 'video' as const,
    features: ['Número de vida', 'Compatibilidades', 'Ciclos personales'],
    popular: false
  },
  {
    id: '6',
    slug: 'limpia-energetica',
    name: 'Limpia Energética Personalizada',
    description_md: 'Sesión de limpia y equilibrio energético para liberarte de bloqueos y energías negativas.',
    duration_min: 75,
    price_mxn: 480,
    mode: 'video' as const,
    features: ['Diagnóstico energético', 'Ritual de limpia', 'Protecciones personalizadas'],
    popular: false
  }
]

function ServiceCard({ service }: { service: typeof services[0] }) {
  return (
    <Card className={`relative hover:shadow-xl transition-all duration-300 ${service.popular ? 'ring-2 ring-purple-500' : ''}`}>
      {service.popular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
            <Star className="h-3 w-3" />
            Más Popular
          </div>
        </div>
      )}
      
      <CardHeader>
        <CardTitle className="text-xl">{service.name}</CardTitle>
        <CardDescription className="text-base">
          {service.description_md}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Precio y duración */}
        <div className="flex justify-between items-center">
          <div>
            <span className="text-3xl font-bold text-purple-600">
              ${service.price_mxn}
            </span>
            <span className="text-gray-500 ml-1">MXN</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Clock className="h-4 w-4 mr-1" />
            <span>{service.duration_min} min</span>
          </div>
        </div>

        {/* Modalidad */}
        <div className="flex items-center text-sm text-gray-600">
          {service.mode === 'video' ? (
            <>
              <Video className="h-4 w-4 mr-2" />
              <span>Consulta Virtual</span>
            </>
          ) : (
            <>
              <Users className="h-4 w-4 mr-2" />
              <span>Consulta Presencial</span>
            </>
          )}
        </div>

        {/* Características */}
        <div>
          <p className="text-sm font-medium text-gray-700 mb-2">Incluye:</p>
          <ul className="text-sm text-gray-600 space-y-1">
            {service.features.map((feature, index) => (
              <li key={index} className="flex items-center">
                <span className="text-purple-500 mr-2">✓</span>
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>

      <CardFooter>
        <Link href={`/servicios/${service.slug}`} className="w-full">
          <Button 
            className={`w-full ${service.popular 
              ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700' 
              : ''
            }`}
          >
            Reservar Consulta
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

export default function ServicesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-purple-800 mb-4">
          🔮 Servicios de Consulta Espiritual
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
          Conecta con tu sabiduría interior a través de nuestras consultas personalizadas. 
          Tarot, astrología y guía espiritual para iluminar tu camino.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <div className="flex items-center text-sm text-gray-600">
            <Video className="h-4 w-4 mr-2 text-purple-600" />
            Consultas virtuales disponibles
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Users className="h-4 w-4 mr-2 text-purple-600" />
            También presencial en CDMX
          </div>
        </div>
      </div>

      {/* Servicios */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {services.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>

      {/* Información adicional */}
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
          <CardHeader>
            <CardTitle className="text-xl text-purple-800">
              🌟 ¿Cómo funciona?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-gray-700">
            <div className="flex items-start">
              <span className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">1</span>
              <div>
                <strong>Reserva tu cita</strong>
                <p className="text-sm">Elige el servicio y horario que más te convenga</p>
              </div>
            </div>
            <div className="flex items-start">
              <span className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">2</span>
              <div>
                <strong>Realiza el pago</strong>
                <p className="text-sm">Pago seguro con transferencia o tarjeta</p>
              </div>
            </div>
            <div className="flex items-start">
              <span className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">3</span>
              <div>
                <strong>Recibe tu consulta</strong>
                <p className="text-sm">Link de video llamada o dirección para presencial</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-200">
          <CardHeader>
            <CardTitle className="text-xl text-indigo-800">
              💫 Sobre nuestras consultas
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-gray-700">
            <p className="text-sm">
              ✨ <strong>15+ años de experiencia</strong> en lectura de tarot y astrología
            </p>
            <p className="text-sm">
              🔮 <strong>Enfoque personalizado</strong> para cada consulta y necesidad
            </p>
            <p className="text-sm">
              📱 <strong>Flexibilidad total:</strong> presencial en CDMX o virtual
            </p>
            <p className="text-sm">
              💝 <strong>Seguimiento incluido:</strong> soporte post-consulta vía WhatsApp
            </p>
            <p className="text-sm">
              🎯 <strong>Satisfacción garantizada</strong> o devolvemos tu dinero
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl text-white p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">¿Tienes dudas sobre qué servicio elegir?</h2>
        <p className="text-lg mb-6 opacity-90">
          Contáctanos y te ayudamos a encontrar la consulta perfecta para tu situación
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" variant="secondary">
            Consulta Gratuita por WhatsApp
          </Button>
          <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-purple-600">
            Ver Disponibilidad
          </Button>
        </div>
      </div>
    </div>
  )
}