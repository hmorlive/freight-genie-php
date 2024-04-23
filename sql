CREATE TABLE IF NOT EXISTS quotes (
    quote_id TEXT PRIMARY KEY,
    email TEXT NOT NULL,
    shipment_options TEXT,
    freight_options TEXT,
    from_location TEXT,
    to_location TEXT,
    shipment_date DATE,
    status TEXT,
    vendor_id INTEGER,
    FOREIGN KEY (fulfiller_id) REFERENCES fulfillers(fulfiller_id)
);