-- create tables for the database

-- quotes table
CREATE TABLE IF NOT EXISTS quotes (
    id TEXT PRIMARY KEY,
    email TEXT NOT NULL CHECK(email LIKE '%_@__%.__%'),
    from_city TEXT NOT NULL,
    to_city TEXT NOT NULL,
    shipping_date DATE NOT NULL,
    freight_type TEXT NOT NULL CHECK(freight_type IN ('ftl', 'ltl', 'partial', 'intermodal')),
    goods_type TEXT NOT NULL CHECK(goods_type IN ('general', 'perishable', 'hazardous', 'fragile', 'oversized')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    vendor_id INTEGER NOT NULL,
    FOREIGN KEY (vendor_id) REFERENCES vendors(id)
);

-- vendors table
CREATE TABLE IF NOT EXISTS vendors (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL CHECK(email LIKE '%_@__%.__%'),
    phone TEXT NOT NULL CHECK(phone LIKE '(___) ___-____'),
    address TEXT NOT NULL
);