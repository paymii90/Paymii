create table users
(
    id          serial
        primary key,
    first_name  varchar(50)  not null,
    last_name   varchar(50)  not null,
    email       varchar(100) not null
        unique,
    password    varchar(255) not null,
    is_verified boolean     default false,
    role        varchar(20) default 'USER'::character varying,
    created_at  timestamp   default CURRENT_TIMESTAMP,
    updated_at  timestamp   default CURRENT_TIMESTAMP
);

alter table users
    owner to postgres;

create trigger trg_update_users_updated_at
    before update
    on users
    for each row
execute procedure update_updated_at_column();

create table coins
(
    id            serial
        primary key,
    name          varchar(50) not null,
    symbol        varchar(10) not null
        unique,
    current_price numeric(18, 8)
);

alter table coins
    owner to postgres;

create table wallets
(
    id         serial
        primary key,
    user_id    integer     not null
        references users
            on delete cascade,
    currency   varchar(10) not null
        constraint fk_wallets_currency
            references coins (symbol),
    balance    numeric(18, 8) default 0.0,
    updated_at timestamp      default CURRENT_TIMESTAMP,
    unique (user_id, currency)
);

alter table wallets
    owner to postgres;

create trigger trg_update_wallets_updated_at
    before update
    on wallets
    for each row
execute procedure update_updated_at_column();

create table transactions
(
    id               serial
        primary key,
    sender_id        integer
                                    references users
                                        on delete set null,
    receiver_id      integer
                                    references users
                                        on delete set null,
    coin_symbol      varchar(10)    not null
        constraint fk_transactions_coin
            references coins (symbol),
    amount           numeric(18, 8) not null,
    transaction_type varchar(20)    not null
        constraint transactions_transaction_type_check
            check ((transaction_type)::text = ANY
                   ((ARRAY ['SEND'::character varying, 'RECEIVE'::character varying, 'BUY'::character varying, 'SELL'::character varying, 'CONVERT'::character varying])::text[])),
    status           varchar(20) default 'PENDING'::character varying,
    created_at       timestamp   default CURRENT_TIMESTAMP,
    updated_at       timestamp   default CURRENT_TIMESTAMP
);

alter table transactions
    owner to postgres;

create trigger trg_update_transactions_updated_at
    before update
    on transactions
    for each row
execute procedure update_updated_at_column();

create table deposits
(
    id           serial
        primary key,
    user_id      integer        not null
        references users
            on delete cascade,
    amount       numeric(18, 2) not null,
    method       varchar(50),
    phone_number varchar(20),
    status       varchar(20) default 'PENDING'::character varying,
    created_at   timestamp   default CURRENT_TIMESTAMP,
    updated_at   timestamp   default CURRENT_TIMESTAMP,
    constraint chk_deposits_phone_number_required
        check (((method)::text <> 'Mobile Money'::text) OR
               ((phone_number IS NOT NULL) AND ((phone_number)::text <> ''::text)))
);

alter table deposits
    owner to postgres;

create trigger trg_update_deposits_updated_at
    before update
    on deposits
    for each row
execute procedure update_updated_at_column();

create table withdrawals
(
    id           serial
        primary key,
    user_id      integer        not null
        references users
            on delete cascade,
    amount       numeric(18, 2) not null,
    method       varchar(50),
    phone_number varchar(20),
    status       varchar(20) default 'PENDING'::character varying,
    created_at   timestamp   default CURRENT_TIMESTAMP,
    updated_at   timestamp   default CURRENT_TIMESTAMP,
    constraint chk_withdrawals_phone_number_required
        check (((method)::text <> 'Mobile Money'::text) OR
               ((phone_number IS NOT NULL) AND ((phone_number)::text <> ''::text)))
);

alter table withdrawals
    owner to postgres;

create trigger trg_update_withdrawals_updated_at
    before update
    on withdrawals
    for each row
execute procedure update_updated_at_column();

