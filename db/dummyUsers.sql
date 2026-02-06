--create apiary
INSERT INTO apiary 
	(name, zipcode)
VALUES (
	'First Apiary',
	'02184'
);

--create first admin
INSERT INTO users
(username, password, userRole, preferences, apiaryID)
VALUES (
	'ColinChomas',
	'password',
	1,
	'{"EmptyJSON" : null}',
	1
)

-- create first hive
INSERT INTO hive
(hiveName, apiaryID)
VALUES (
	'Alpha Hive',
	1
)

