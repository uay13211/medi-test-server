CREATE DATABASE mediconcen;

CREATE TABLE USERS (
    u_id SERIAL PRIMARY KEY,
    email VARCHAR(100),
    password VARCHAR(100),
    clinic_name VARCHAR(100),
    phone_number VARCHAR(16),
    address VARCHAR(255)
);

CREATE TABLE CONSULTATION_RECORDS (
    c_id SERIAL PRIMARY KEY,
    u_id INTEGER REFERENCES USERS (u_id),
    c_date timestamp without time zone,
    doctor_name VARCHAR(100),
    medication VARCHAR(255),
    c_fee INTEGER,
    follow_up BOOLEAN
);