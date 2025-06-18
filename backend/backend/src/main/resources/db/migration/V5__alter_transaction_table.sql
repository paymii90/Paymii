-- 2. Add new columns for external coin data if not already present
ALTER TABLE transaction
    ADD COLUMN IF NOT EXISTS coin_name varchar(255),
    ADD COLUMN IF NOT EXISTS coin_symbol varchar(255),
    ADD COLUMN IF NOT EXISTS coin_image varchar(255),
    ADD COLUMN IF NOT EXISTS coin_price numeric(20,8);



-- Drop the foreign key if it exists
ALTER TABLE transaction DROP CONSTRAINT IF EXISTS fk76w1om59147ehk1foaefkj5p8;

-- Change the type to varchar
ALTER TABLE transaction ALTER COLUMN coin_id TYPE VARCHAR(255);

-- Optionally, drop the old Coin relation column if you have one:
-- ALTER TABLE transaction DROP COLUMN coin;

