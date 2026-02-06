
-- PostgreSQL
-- CREATE DB 
-- DO $$
-- BEGIN
--     IF NOT EXISTS (
--         SELECT FROM pg_database WHERE datname = 'zurichdb'
--     ) THEN
--         EXECUTE 'CREATE DATABASE zurichdb';
--     END IF;
-- END$$;

-- -- Connect to db
-- \c zurichdb

-- Create apiary table
CREATE TABLE IF NOT EXISTS apiary ( 
    apiaryID SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    zipcode VARCHAR(10),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create user table
CREATE TABLE IF NOT EXISTS users (
    userID SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    userRole INT,
    preferences JSONB,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    apiaryID INT,
    FOREIGN KEY (apiaryID) REFERENCES apiary(apiaryID)
);

-- Create credentials table
CREATE TABLE IF NOT EXISTS credentials (
    hashedKey VARCHAR(255) PRIMARY KEY,
    apiaryID INT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (apiaryID) REFERENCES apiary(apiaryID)
);

-- Create hive table
CREATE TABLE IF NOT EXISTS hive (
    hiveID SERIAL PRIMARY KEY,
    hiveName VARCHAR(255) NOT NULL,
    apiaryID INT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (apiaryID) REFERENCES apiary(apiaryID)
);

-- Create alerts table
CREATE TABLE IF NOT EXISTS alerts (
    alertID SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    hiveID INT,
    type SMALLINT,
    FOREIGN KEY (hiveID) REFERENCES hive(hiveID)
);

-- Create hiveAnalytics table
CREATE TABLE IF NOT EXISTS hiveAnalytics (
    analyticID SERIAL PRIMARY KEY,
    hiveID INT,
    temperature DOUBLE PRECISION,
    weight DOUBLE PRECISION,
    pressure DOUBLE PRECISION,
    humidity DOUBLE PRECISION,
    beeDeparture DOUBLE PRECISION,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    generatedAt TIMESTAMP,
    FOREIGN KEY (hiveID) REFERENCES hive(hiveID)
);

-- Create outsideAnalytics table
CREATE TABLE IF NOT EXISTS outsideAnalytics (
    apiaryID INT,
    temperature DOUBLE PRECISION,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (apiaryID) REFERENCES apiary(apiaryID)
);

