ALTER TABLE transaction
    ADD COLUMN coin_quantity NUMERIC(20, 8) NOT NULL DEFAULT 0;
