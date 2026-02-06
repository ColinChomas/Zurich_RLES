-- INSERT ANALYTIC DATA
INSERT INTO hiveAnalytics (
    hiveID,
    temperature,
    weight,
    pressure,
    humidity,
    beeDeparture,
    generatedAt
)
VALUES
    (1, 34.2, 52.8, 1013.4, 62.1, 120.0, NOW() - INTERVAL '40 minutes'),
    (1, 34.0, 52.7, 1013.2, 62.8, 118.9, NOW() - INTERVAL '30 minutes'),
    (1, 33.9, 52.7, 1013.0, 63.2, 119.4, NOW() - INTERVAL '20 minutes'),
    (1, 34.1, 52.8, 1013.3, 62.5, 121.1, NOW() - INTERVAL '10 minutes'),
    (1, 34.3, 52.9, 1013.5, 61.9, 122.0, NOW());