-- Travel Website Database Schema

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Users table
create table if not exists users (
    id uuid primary key default uuid_generate_v4(),
    email text unique not null,
    full_name text not null,
    phone text,
    bio text,
    preferences jsonb default '{}'::jsonb,
    role text default 'user' check (role in ('user', 'admin')),
    is_verified boolean default false,
    last_login timestamp with time zone,
    created_at timestamp with time zone default now(),
    updated_at timestamp with time zone default now()
);

-- Destinations table
create table if not exists destinations (
    id uuid primary key default uuid_generate_v4(),
    name text not null,
    slug text unique not null,
    description text not null,
    country text not null,
    city text not null,
    price_per_person numeric not null check (price_per_person >= 0),
    image_url text,
    category text not null check (category in ('beach', 'mountain', 'city', 'adventure', 'cultural')),
    rating numeric default 0,
    available_slots integer not null check (available_slots >= 0),
    views integer default 0,
    featured boolean default false,
    tags text[] default array[]::text[],
    latitude numeric,
    longitude numeric,
    created_at timestamp with time zone default now(),
    updated_at timestamp with time zone default now()
);

-- Bookings table
create table if not exists bookings (
    id uuid primary key default uuid_generate_v4(),
    user_id uuid references users(id) on delete cascade,
    destination_id uuid references destinations(id) on delete cascade,
    travel_date date not null,
    num_travelers integer not null check (num_travelers > 0),
    total_price numeric not null,
    status text default 'pending' check (status in ('pending', 'confirmed', 'cancelled')),
    payment_status text default 'pending' check (payment_status in ('pending', 'paid', 'failed', 'refunded')),
    stripe_session_id text,
    special_requests text,
    created_at timestamp with time zone default now(),
    updated_at timestamp with time zone default now()
);

-- Reviews table
create table if not exists reviews (
    id uuid primary key default uuid_generate_v4(),
    user_id uuid references users(id) on delete cascade,
    destination_id uuid references destinations(id) on delete cascade,
    rating integer not null check (rating >= 1 and rating <= 5),
    comment text not null,
    helpful_votes integer default 0,
    images text[] default array[]::text[],
    created_at timestamp with time zone default now(),
    updated_at timestamp with time zone default now(),
    unique(user_id, destination_id)
);

-- Wishlist table
create table if not exists wishlist (
    id uuid primary key default uuid_generate_v4(),
    user_id uuid references users(id) on delete cascade,
    destination_id uuid references destinations(id) on delete cascade,
    created_at timestamp with time zone default now(),
    unique(user_id, destination_id)
);

-- Payments table
create table if not exists payments (
    id uuid primary key default uuid_generate_v4(),
    booking_id uuid references bookings(id) on delete cascade,
    user_id uuid references users(id) on delete cascade,
    stripe_payment_intent_id text,
    stripe_session_id text,
    amount numeric not null,
    currency text default 'usd',
    status text default 'pending' check (status in ('pending', 'succeeded', 'failed', 'refunded')),
    metadata jsonb default '{}'::jsonb,
    created_at timestamp with time zone default now()
);

-- Notifications table
create table if not exists notifications (
    id uuid primary key default uuid_generate_v4(),
    user_id uuid references users(id) on delete cascade,
    title text not null,
    message text not null,
    type text default 'system' check (type in ('booking', 'payment', 'system', 'promo')),
    is_read boolean default false,
    data jsonb default '{}'::jsonb,
    created_at timestamp with time zone default now()
);

-- Analytics events table
create table if not exists analytics_events (
    id uuid primary key default uuid_generate_v4(),
    event_type text not null,
    user_id uuid references users(id) on delete set null,
    destination_id uuid references destinations(id) on delete set null,
    metadata jsonb default '{}'::jsonb,
    ip_address text,
    user_agent text,
    created_at timestamp with time zone default now()
);

-- Destination tags table (optional helper table if tags are complex)
create table if not exists destination_tags (
    id uuid primary key default uuid_generate_v4(),
    destination_id uuid references destinations(id) on delete cascade,
    tag text not null,
    created_at timestamp with time zone default now()
);

-- Itineraries table
create table if not exists itineraries (
    id uuid primary key default uuid_generate_v4(),
    user_id uuid references users(id) on delete cascade,
    booking_id uuid references bookings(id) on delete cascade,
    title text not null,
    day_number integer not null,
    activities jsonb default '[]'::jsonb,
    notes text,
    created_at timestamp with time zone default now()
);

-- Indexes for performance
create index if not exists idx_destinations_category on destinations(category);
create index if not exists idx_destinations_country on destinations(country);
create index if not exists idx_destinations_slug on destinations(slug);
create index if not exists idx_destinations_featured on destinations(featured);
create index if not exists idx_bookings_user_id on bookings(user_id);
create index if not exists idx_bookings_status on bookings(status);
create index if not exists idx_reviews_destination_id on reviews(destination_id);
create index if not exists idx_notifications_user_id_is_read on notifications(user_id, is_read);
create index if not exists idx_analytics_events_type_created on analytics_events(event_type, created_at);

-- Trigger for updated_at
create or replace function update_updated_at_column()
returns trigger as $$
begin
    new.updated_at = now();
    return new;
end;
$$ language plpgsql;

create trigger update_users_updated_at before update on users for each row execute procedure update_updated_at_column();
create trigger update_destinations_updated_at before update on destinations for each row execute procedure update_updated_at_column();
create trigger update_bookings_updated_at before update on bookings for each row execute procedure update_updated_at_column();
create trigger update_reviews_updated_at before update on reviews for each row execute procedure update_updated_at_column();
