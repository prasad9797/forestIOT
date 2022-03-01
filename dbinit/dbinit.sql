CREATE TABLE sensordata (
    fire varchar(250) not null,
    sound VARCHAR(250) not null,
    ph VARCHAR(250) not null,
    gyro VARCHAR(250) not null,
    gx VARCHAR(250) not null,
    gy VARCHAR(250) not null,
    gz VARCHAR(250) not null,
    lat VARCHAR(250),
    long VARCHAR(250),
    danger VARCHAR(250) not null,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);