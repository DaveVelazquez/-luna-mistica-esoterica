-- Datos de ejemplo para la Tienda Esotérica
-- Ejecutar estos comandos en el SQL Editor de Supabase DESPUÉS de ejecutar el schema principal

-- Usuario admin de ejemplo
-- Nota: Este usuario debe registrarse primero desde la aplicación, luego cambiar su rol a admin
-- Después del registro, ejecutar esta query cambiando el email por el que usaste:
-- UPDATE public.users SET role = 'admin' WHERE email = 'tu-email@ejemplo.com';

-- Productos de ejemplo
INSERT INTO public.products (slug, name, description_md, price_mxn, featured) VALUES
('tarot-rider-waite', 'Tarot Rider-Waite Original', 
 'El tarot más popular del mundo, perfecto para principiantes y expertos. Incluye libro de instrucciones en español.
 
 ## Características
 - 78 cartas con ilustraciones clásicas
 - Libro de instrucciones en español
 - Cartas de alta calidad
 - Ideal para lectura diaria', 
 450.00, true),

('cristal-amatista', 'Amatista Natural Brasileña', 
 'Cristal de amatista natural de Brasil para meditación y protección energética. Tamaño mediano (5-7 cm).
 
 ## Propiedades
 - Protección espiritual
 - Meditación profunda
 - Claridad mental
 - Energía purificadora', 
 180.00, true),

('vela-proteccion', 'Vela de Protección Blanca', 
 'Vela artesanal con hierbas naturales para rituales de protección. Tiempo de quemado: 8 horas.
 
 ## Ingredientes
 - Cera natural de abeja
 - Hierbas de protección
 - Aceites esenciales
 - Mecha de algodón', 
 95.00, true),

('incienso-copal', 'Incienso de Copal Natural', 
 'Copal natural mexicano para limpia energética y purificación de espacios. Paquete de 50g.
 
 ## Usos
 - Purificación de espacios
 - Rituales de limpia
 - Meditación
 - Conexión espiritual', 
 120.00, false),

('cuarzo-rosa', 'Cuarzo Rosa del Amor', 
 'Cuarzo rosa natural para atraer el amor y fortalecer relaciones. Piedra pulida de 3-4 cm.
 
 ## Propiedades
 - Atrae el amor
 - Fortalece relaciones
 - Autoestima
 - Paz emocional', 
 85.00, false),

('sahumerios-lavanda', 'Sahumerios de Lavanda', 
 'Set de sahumerios artesanales de lavanda para relajación y armonía. 10 unidades.
 
 ## Beneficios
 - Relajación profunda
 - Armonía del hogar
 - Reducción del estrés
 - Mejor descanso', 
 65.00, true),

('collar-chakras', 'Collar de 7 Chakras', 
 'Collar con piedras naturales representando los 7 chakras principales. Equilibra tu energía.
 
 ## Piedras incluidas
 - Jaspe rojo (1er chakra)
 - Cornalina (2do chakra)
 - Citrino (3er chakra)
 - Cuarzo verde (4to chakra)
 - Sodalita (5to chakra)
 - Amatista (6to chakra)
 - Cuarzo transparente (7mo chakra)', 
 280.00, false),

('runas-madera', 'Set de Runas en Madera', 
 'Set completo de 25 runas nórdicas talladas en madera de roble con bolsa de terciopelo.
 
 ## Incluye
 - 24 runas + runa en blanco
 - Bolsa de terciopelo negro
 - Guía de interpretación
 - Madera de roble natural', 
 320.00, false);

-- Servicios de ejemplo
INSERT INTO public.services (slug, name, description_md, duration_min, price_mxn, mode) VALUES
('lectura-tarot-general', 'Lectura de Tarot General', 
 'Lectura completa de 3 cartas para orientación general sobre tu situación actual.
 
 ## Lo que incluye
 - Análisis de tu situación actual
 - Consejos para el presente
 - Perspectivas futuras
 - Grabación de la sesión
 
 ## Modalidad
 - Videollamada por Zoom/Meet
 - Duración: 45 minutos
 - Horarios flexibles', 
 45, 350.00, 'video'),

('lectura-tarot-amor', 'Lectura de Tarot del Amor', 
 'Consulta especializada en temas del corazón, relaciones y compatibilidad.
 
 ## Temas que abordamos
 - Relaciones actuales
 - Amor propio
 - Compatibilidad de pareja
 - Obstáculos en el amor
 - Consejos para atraer el amor
 
 ## Modalidad
 - Videollamada personalizada
 - Duración: 60 minutos
 - Seguimiento por WhatsApp', 
 60, 450.00, 'video'),

('carta-natal', 'Carta Natal Personalizada', 
 'Análisis completo de tu carta astral natal con interpretación detallada.
 
 ## Lo que necesitas
 - Fecha exacta de nacimiento
 - Hora de nacimiento
 - Lugar de nacimiento
 
 ## Lo que recibes
 - Carta natal completa
 - Interpretación de planetas
 - Casas astrológicas
 - Aspectos planetarios
 - Documento PDF personalizado
 
 ## Modalidad
 - Videollamada de explicación
 - Duración: 90 minutos
 - Documento digital incluido', 
 90, 650.00, 'video'),

('consulta-presencial', 'Consulta Presencial', 
 'Lectura de tarot presencial en nuestro consultorio con ambiente especial.
 
 ## Ubicación
 - Consultorio en zona centro
 - Ambiente relajante
 - Música de meditación
 - Incienso y velas
 
 ## Lo que incluye
 - Lectura completa de tarot
 - Limpia energética
 - Recomendaciones personalizadas
 - Té de hierbas naturales
 
 ## Modalidad
 - Presencial únicamente
 - Duración: 60 minutos
 - Cita previa requerida', 
 60, 550.00, 'in_person'),

('lectura-runas', 'Lectura de Runas Nórdicas', 
 'Consulta ancestral con runas nórdicas para obtener sabiduría y guía espiritual.
 
 ## Método ancestral
 - Runas talladas a mano
 - Interpretación tradicional
 - Conexión con la sabiduría nórdica
 - Guía espiritual profunda
 
 ## Modalidad
 - Videollamada
 - Duración: 50 minutos
 - Ritual de apertura incluido', 
 50, 380.00, 'video');

-- Variantes para algunos productos (opcional)
INSERT INTO public.product_variants (product_id, sku, stock, weight_g, attrs) 
SELECT 
  p.id,
  p.slug || '-std',
  CASE 
    WHEN p.slug = 'tarot-rider-waite' THEN 15
    WHEN p.slug = 'cristal-amatista' THEN 8
    WHEN p.slug = 'vela-proteccion' THEN 25
    WHEN p.slug = 'incienso-copal' THEN 30
    WHEN p.slug = 'cuarzo-rosa' THEN 12
    WHEN p.slug = 'sahumerios-lavanda' THEN 20
    WHEN p.slug = 'collar-chakras' THEN 5
    WHEN p.slug = 'runas-madera' THEN 7
    ELSE 10
  END as stock,
  CASE 
    WHEN p.slug = 'tarot-rider-waite' THEN 200
    WHEN p.slug = 'cristal-amatista' THEN 50
    WHEN p.slug = 'vela-proteccion' THEN 120
    WHEN p.slug = 'incienso-copal' THEN 50
    WHEN p.slug = 'cuarzo-rosa' THEN 30
    WHEN p.slug = 'sahumerios-lavanda' THEN 80
    WHEN p.slug = 'collar-chakras' THEN 45
    WHEN p.slug = 'runas-madera' THEN 300
    ELSE 100
  END as weight_g,
  '{"size": "standard", "color": "natural"}'::jsonb as attrs
FROM public.products p;

-- Slots de ejemplo para servicios (próximos 30 días)
INSERT INTO public.service_slots (service_id, starts_at, ends_at, status)
SELECT 
  s.id,
  (CURRENT_DATE + interval '1 day' + (generate_series(1, 30) || ' days')::interval + 
   CASE 
     WHEN generate_series(1, 3) = 1 THEN '10:00'::time
     WHEN generate_series(1, 3) = 2 THEN '15:00'::time  
     ELSE '18:00'::time
   END)::timestamp,
  (CURRENT_DATE + interval '1 day' + (generate_series(1, 30) || ' days')::interval + 
   CASE 
     WHEN generate_series(1, 3) = 1 THEN '10:00'::time + (s.duration_min || ' minutes')::interval
     WHEN generate_series(1, 3) = 2 THEN '15:00'::time + (s.duration_min || ' minutes')::interval
     ELSE '18:00'::time + (s.duration_min || ' minutes')::interval
   END)::timestamp,
  'available'
FROM public.services s
CROSS JOIN generate_series(1, 30) -- 30 días
CROSS JOIN generate_series(1, 3)  -- 3 horarios por día
WHERE s.active = true;

-- Mensaje final
SELECT 'Datos de ejemplo agregados exitosamente! 🌙✨' as mensaje;