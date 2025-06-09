-- Timestamp trigger function for updated_at columns
CREATE OR REPLACE FUNCTION update_updated_at_column()
    RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- USERS
CREATE TABLE users (
                       id              SERIAL PRIMARY KEY,
                       firebase_uid    VARCHAR(50) UNIQUE NOT NULL,
                       first_name      VARCHAR(50),
                       last_name       VARCHAR(50),
                       email           VARCHAR(100),
                       profile_photo   VARCHAR(255),
                       phone_number    VARCHAR(20),
                       is_phone_verified BOOLEAN DEFAULT FALSE,
                       is_kyc_completed BOOLEAN DEFAULT FALSE,
                       created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                       updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TRIGGER trg_update_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();

-- COINS
CREATE TABLE coins (
                       id            SERIAL PRIMARY KEY,
                       name          VARCHAR(50) NOT NULL,
                       symbol        VARCHAR(10) NOT NULL UNIQUE,
                       current_price NUMERIC(18, 8)
);

-- WALLETS
CREATE TABLE wallets (
                         id         SERIAL PRIMARY KEY,
                         user_id    INTEGER NOT NULL REFERENCES users ON DELETE CASCADE,
                         currency   VARCHAR(10) NOT NULL REFERENCES coins(symbol),
                         balance    NUMERIC(18, 8) DEFAULT 0.0,
                         updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                         UNIQUE (user_id, currency)
);

CREATE TRIGGER trg_update_wallets_updated_at
    BEFORE UPDATE ON wallets
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();

-- TRANSACTIONS
CREATE TABLE transactions (
                              id               SERIAL PRIMARY KEY,
                              sender_id        INTEGER REFERENCES users ON DELETE SET NULL,
                              receiver_id      INTEGER REFERENCES users ON DELETE SET NULL,
                              coin_symbol      VARCHAR(10) NOT NULL REFERENCES coins(symbol),
                              amount           NUMERIC(18, 8) NOT NULL,
                              transaction_type VARCHAR(20) NOT NULL CHECK (transaction_type IN ('SEND', 'RECEIVE', 'BUY', 'SELL', 'CONVERT')),
                              status           VARCHAR(20) DEFAULT 'PENDING',
                              created_at       TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                              updated_at       TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TRIGGER trg_update_transactions_updated_at
    BEFORE UPDATE ON transactions
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();

-- DEPOSITS
CREATE TABLE deposits (
                          id           SERIAL PRIMARY KEY,
                          user_id      INTEGER NOT NULL REFERENCES users ON DELETE CASCADE,
                          amount       NUMERIC(18, 2) NOT NULL,
                          method       VARCHAR(50),
                          phone_number VARCHAR(20),
                          status       VARCHAR(20) DEFAULT 'PENDING',
                          created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                          updated_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                          CONSTRAINT chk_deposits_phone_number_required
                              CHECK ((method <> 'Mobile Money') OR (phone_number IS NOT NULL AND phone_number <> ''))
);

CREATE TRIGGER trg_update_deposits_updated_at
    BEFORE UPDATE ON deposits
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();

-- WITHDRAWALS
CREATE TABLE withdrawals (
                             id           SERIAL PRIMARY KEY,
                             user_id      INTEGER NOT NULL REFERENCES users ON DELETE CASCADE,
                             amount       NUMERIC(18, 2) NOT NULL,
                             method       VARCHAR(50),
                             phone_number VARCHAR(20),
                             status       VARCHAR(20) DEFAULT 'PENDING',
                             created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                             updated_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                             CONSTRAINT chk_withdrawals_phone_number_required
                                 CHECK ((method <> 'Mobile Money') OR (phone_number IS NOT NULL AND phone_number <> ''))
);

CREATE TRIGGER trg_update_withdrawals_updated_at
    BEFORE UPDATE ON withdrawals
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();

-- USER KYC (for storing KYC info)
CREATE TABLE user_kyc (
                          id                SERIAL PRIMARY KEY,
                          user_id           INTEGER NOT NULL REFERENCES users ON DELETE CASCADE,
                          citizenship       VARCHAR(50),
                          legal_first_name  VARCHAR(50),
                          legal_last_name   VARCHAR(50),
                          date_of_birth     DATE,
                          address           VARCHAR(255),
                          kyc_status        VARCHAR(20) DEFAULT 'PENDING',
                          created_at        TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                          updated_at        TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TRIGGER trg_update_user_kyc_updated_at
    BEFORE UPDATE ON user_kyc
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();

-- USER DOCUMENTS (file storage references for KYC - images)
CREATE TABLE user_documents (
                                id           SERIAL PRIMARY KEY,
                                user_id      INTEGER NOT NULL REFERENCES users ON DELETE CASCADE,
                                doc_type     VARCHAR(50), -- e.g. 'ID_CARD', 'PASSPORT', 'UTILITY_BILL'
                                doc_url      VARCHAR(255) NOT NULL,
                                uploaded_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ONBOARDING STEPS (for tracking multistep onboarding flow)
CREATE TABLE onboarding_steps (
                                  id           SERIAL PRIMARY KEY,
                                  user_id      INTEGER NOT NULL REFERENCES users ON DELETE CASCADE,
                                  step         VARCHAR(50) NOT NULL,
                                  completed    BOOLEAN DEFAULT FALSE,
                                  completed_at TIMESTAMP
);

-- If not already present, add the timestamp trigger function (required by triggers above)
CREATE OR REPLACE FUNCTION update_updated_at_column()
    RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;


