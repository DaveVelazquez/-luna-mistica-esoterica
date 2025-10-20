-- Configuración inicial de Supabase para Tienda Esotérica
-- Ejecutar estos comandos en el SQL Editor de Supabase

-- Habilitar extensiones necesarias
create extension if not exists "uuid-ossp";

-- Tabla de usuarios (extiende auth.users)
create table public.users (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  name text,
  phone text,
  role text default 'customer' check (role in ('customer','admin')),
  created_at timestamptz default now()
);

-- RLS para usuarios
alter table public.users enable row level security;

-- Policy: Los usuarios pueden ver y actualizar su propia información
create policy "Users can view own profile" 
  on public.users for select 
  using (auth.uid()::text = id::text);

create policy "Users can update own profile" 
  on public.users for update 
  using (auth.uid()::text = id::text);

-- Policy: Los admins pueden ver todos los usuarios
create policy "Admins can view all users" 
  on public.users for all 
  using (
    exists (
      select 1 from public.users 
      where id::text = auth.uid()::text 
      and role = 'admin'
    )
  );

-- Productos
create table public.products (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  description_md text,
  price_mxn numeric not null check (price_mxn >= 0),
  tax_included boolean default true,
  active boolean default true,
  featured boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- RLS para productos
alter table public.products enable row level security;

-- Policy: Todos pueden ver productos activos
create policy "Anyone can view active products" 
  on public.products for select 
  using (active = true);

-- Policy: Solo admins pueden modificar productos
create policy "Only admins can manage products" 
  on public.products for all 
  using (
    exists (
      select 1 from public.users 
      where id::text = auth.uid()::text 
      and role = 'admin'
    )
  );

-- Variantes de productos
create table public.product_variants (
  id uuid primary key default gen_random_uuid(),
  product_id uuid references public.products(id) on delete cascade,
  sku text unique not null,
  stock int default 0 check (stock >= 0),
  weight_g int default 0 check (weight_g >= 0),
  attrs jsonb default '{}'::jsonb,
  created_at timestamptz default now()
);

-- RLS para variantes
alter table public.product_variants enable row level security;

-- Policy: Todos pueden ver variantes de productos activos
create policy "Anyone can view product variants" 
  on public.product_variants for select 
  using (
    exists (
      select 1 from public.products 
      where id = product_id and active = true
    )
  );

-- Policy: Solo admins pueden modificar variantes
create policy "Only admins can manage variants" 
  on public.product_variants for all 
  using (
    exists (
      select 1 from public.users 
      where id::text = auth.uid()::text 
      and role = 'admin'
    )
  );

-- Media de productos
create table public.product_media (
  id uuid primary key default gen_random_uuid(),
  product_id uuid references public.products(id) on delete cascade,
  url text not null,
  alt text,
  sort int default 0,
  created_at timestamptz default now()
);

-- RLS para media
alter table public.product_media enable row level security;

-- Policy: Todos pueden ver media de productos activos
create policy "Anyone can view product media" 
  on public.product_media for select 
  using (
    exists (
      select 1 from public.products 
      where id = product_id and active = true
    )
  );

-- Policy: Solo admins pueden modificar media
create policy "Only admins can manage media" 
  on public.product_media for all 
  using (
    exists (
      select 1 from public.users 
      where id::text = auth.uid()::text 
      and role = 'admin'
    )
  );

-- Cupones
create table public.coupons (
  id uuid primary key default gen_random_uuid(),
  code text unique not null,
  kind text check (kind in ('percent','fixed')),
  value numeric not null check (value >= 0),
  min_total numeric default 0 check (min_total >= 0),
  starts_at date,
  ends_at date,
  max_uses int,
  used int default 0 check (used >= 0),
  active boolean default true,
  created_at timestamptz default now()
);

-- RLS para cupones
alter table public.coupons enable row level security;

-- Policy: Usuarios autenticados pueden ver cupones activos
create policy "Authenticated users can view active coupons" 
  on public.coupons for select 
  using (
    auth.role() = 'authenticated' and 
    active = true and 
    (starts_at is null or starts_at <= current_date) and
    (ends_at is null or ends_at >= current_date)
  );

-- Policy: Solo admins pueden modificar cupones
create policy "Only admins can manage coupons" 
  on public.coupons for all 
  using (
    exists (
      select 1 from public.users 
      where id::text = auth.uid()::text 
      and role = 'admin'
    )
  );

-- Pedidos
create table public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id),
  total_mxn numeric not null check (total_mxn >= 0),
  tax_mxn numeric default 0 check (tax_mxn >= 0),
  discount_mxn numeric default 0 check (discount_mxn >= 0),
  status text check (status in ('pending','paid','preparing','shipped','completed','cancelled')) default 'pending',
  payment_method text check (payment_method in ('cash','spei','mp','stripe')),
  payment_ref text,
  shipping_address jsonb,
  notes text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- RLS para pedidos
alter table public.orders enable row level security;

-- Policy: Los usuarios pueden ver sus propios pedidos
create policy "Users can view own orders" 
  on public.orders for select 
  using (user_id::text = auth.uid()::text);

-- Policy: Los usuarios pueden crear pedidos
create policy "Authenticated users can create orders" 
  on public.orders for insert 
  with check (auth.role() = 'authenticated');

-- Policy: Los usuarios pueden actualizar sus pedidos pendientes
create policy "Users can update own pending orders" 
  on public.orders for update 
  using (user_id::text = auth.uid()::text and status = 'pending');

-- Policy: Los admins pueden ver y modificar todos los pedidos
create policy "Admins can manage all orders" 
  on public.orders for all 
  using (
    exists (
      select 1 from public.users 
      where id::text = auth.uid()::text 
      and role = 'admin'
    )
  );

-- Items de pedidos
create table public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid references public.orders(id) on delete cascade,
  product_id uuid references public.products(id),
  variant_id uuid references public.product_variants(id),
  qty int not null check (qty > 0),
  unit_price_mxn numeric not null check (unit_price_mxn >= 0),
  created_at timestamptz default now()
);

-- RLS para items de pedidos
alter table public.order_items enable row level security;

-- Policy: Los usuarios pueden ver items de sus propios pedidos
create policy "Users can view own order items" 
  on public.order_items for select 
  using (
    exists (
      select 1 from public.orders 
      where id = order_id and user_id::text = auth.uid()::text
    )
  );

-- Policy: Los usuarios pueden crear items en sus pedidos
create policy "Users can create own order items" 
  on public.order_items for insert 
  with check (
    exists (
      select 1 from public.orders 
      where id = order_id and user_id::text = auth.uid()::text
    )
  );

-- Policy: Los admins pueden ver y modificar todos los items
create policy "Admins can manage all order items" 
  on public.order_items for all 
  using (
    exists (
      select 1 from public.users 
      where id::text = auth.uid()::text 
      and role = 'admin'
    )
  );

-- Servicios (lecturas esotéricas)
create table public.services (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  description_md text,
  duration_min int not null check (duration_min > 0),
  price_mxn numeric not null check (price_mxn >= 0),
  mode text check (mode in ('in_person','video')) default 'video',
  active boolean default true,
  created_at timestamptz default now()
);

-- RLS para servicios
alter table public.services enable row level security;

-- Policy: Todos pueden ver servicios activos
create policy "Anyone can view active services" 
  on public.services for select 
  using (active = true);

-- Policy: Solo admins pueden modificar servicios
create policy "Only admins can manage services" 
  on public.services for all 
  using (
    exists (
      select 1 from public.users 
      where id::text = auth.uid()::text 
      and role = 'admin'
    )
  );

-- Slots de servicios (disponibilidad)
create table public.service_slots (
  id uuid primary key default gen_random_uuid(),
  service_id uuid references public.services(id) on delete cascade,
  starts_at timestamptz not null,
  ends_at timestamptz not null,
  status text check (status in ('available','held','booked','blocked')) default 'available',
  created_at timestamptz default now(),
  constraint valid_time_range check (ends_at > starts_at)
);

-- RLS para slots
alter table public.service_slots enable row level security;

-- Policy: Todos pueden ver slots disponibles
create policy "Anyone can view available slots" 
  on public.service_slots for select 
  using (status = 'available' and starts_at > now());

-- Policy: Solo admins pueden modificar slots
create policy "Only admins can manage slots" 
  on public.service_slots for all 
  using (
    exists (
      select 1 from public.users 
      where id::text = auth.uid()::text 
      and role = 'admin'
    )
  );

-- Reservas de servicios
create table public.service_bookings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id),
  service_id uuid references public.services(id),
  slot_id uuid references public.service_slots(id),
  status text check (status in ('pending','paid','completed','cancelled')) default 'pending',
  video_link text,
  notes text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- RLS para reservas
alter table public.service_bookings enable row level security;

-- Policy: Los usuarios pueden ver sus propias reservas
create policy "Users can view own bookings" 
  on public.service_bookings for select 
  using (user_id::text = auth.uid()::text);

-- Policy: Los usuarios pueden crear reservas
create policy "Authenticated users can create bookings" 
  on public.service_bookings for insert 
  with check (auth.role() = 'authenticated');

-- Policy: Los usuarios pueden actualizar sus reservas pendientes
create policy "Users can update own pending bookings" 
  on public.service_bookings for update 
  using (user_id::text = auth.uid()::text and status = 'pending');

-- Policy: Los admins pueden ver y modificar todas las reservas
create policy "Admins can manage all bookings" 
  on public.service_bookings for all 
  using (
    exists (
      select 1 from public.users 
      where id::text = auth.uid()::text 
      and role = 'admin'
    )
  );

-- Blog posts
create table public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  content_md text,
  excerpt text,
  published_at timestamptz,
  cover_url text,
  tags text[],
  author_id uuid references public.users(id),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- RLS para blog posts
alter table public.blog_posts enable row level security;

-- Policy: Todos pueden ver posts publicados
create policy "Anyone can view published posts" 
  on public.blog_posts for select 
  using (published_at is not null and published_at <= now());

-- Policy: Solo admins pueden modificar posts
create policy "Only admins can manage posts" 
  on public.blog_posts for all 
  using (
    exists (
      select 1 from public.users 
      where id::text = auth.uid()::text 
      and role = 'admin'
    )
  );

-- Función para actualizar updated_at automáticamente
create or replace function public.update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Triggers para updated_at
create trigger update_products_updated_at before update on public.products
  for each row execute function public.update_updated_at_column();

create trigger update_orders_updated_at before update on public.orders
  for each row execute function public.update_updated_at_column();

create trigger update_service_bookings_updated_at before update on public.service_bookings
  for each row execute function public.update_updated_at_column();

create trigger update_blog_posts_updated_at before update on public.blog_posts
  for each row execute function public.update_updated_at_column();

-- Función para sincronizar usuarios con auth.users
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.users (id, email)
  values (new.id, new.email);
  return new;
end;
$$ language plpgsql security definer;

-- Trigger para crear usuario en public.users cuando se registra en auth.users
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Datos de ejemplo para desarrollo (opcional)
-- Descomenta si quieres datos de prueba

/*
-- Usuario admin de ejemplo
insert into public.users (id, email, name, role) 
values ('00000000-0000-0000-0000-000000000000', 'admin@tiendaesoterica.com', 'Administrador', 'admin');

-- Productos de ejemplo
insert into public.products (slug, name, description_md, price_mxn, featured) values
('tarot-rider-waite', 'Tarot Rider-Waite Original', 'El tarot más popular del mundo, perfecto para principiantes y expertos. Incluye libro de instrucciones en español.', 450.00, true),
('cristal-amatista', 'Amatista Natural Brasileña', 'Cristal de amatista natural de Brasil para meditación y protección energética. Tamaño mediano (5-7 cm).', 180.00, true),
('vela-proteccion', 'Vela de Protección Blanca', 'Vela artesanal con hierbas naturales para rituales de protección. Tiempo de quemado: 8 horas.', 95.00, true),
('incienso-copal', 'Incienso de Copal Natural', 'Copal natural mexicano para limpia energética y purificación de espacios. Paquete de 50g.', 120.00, false),
('cuarzo-rosa', 'Cuarzo Rosa del Amor', 'Cuarzo rosa natural para atraer el amor y fortalecer relaciones. Piedra pulida de 3-4 cm.', 85.00, false);

-- Servicios de ejemplo
insert into public.services (slug, name, description_md, duration_min, price_mxn, mode) values
('lectura-tarot-general', 'Lectura de Tarot General', 'Lectura completa de 3 cartas para orientación general sobre tu situación actual.', 45, 350.00, 'video'),
('lectura-tarot-amor', 'Lectura de Tarot del Amor', 'Consulta especializada en temas del corazón, relaciones y compatibilidad.', 60, 450.00, 'video'),
('carta-natal', 'Carta Natal Personalizada', 'Análisis completo de tu carta astral natal con interpretación detallada.', 90, 650.00, 'video'),
('consulta-presencial', 'Consulta Presencial', 'Lectura de tarot presencial en nuestro consultorio con ambiente especial.', 60, 550.00, 'in_person');
*/