const pool = require("./db");

async function getApiaries(){
  return (await pool.query("SELECT * FROM apiary")).rows;
}

async function getApiary(id){
  return (await pool.query(
    "SELECT * FROM apiary WHERE apiaryID=$1",[id]
  )).rows[0];
}

async function createApiary(name,zipcode){
  return (await pool.query(
    "INSERT INTO apiary(name,zipcode) VALUES($1,$2) RETURNING *",
    [name,zipcode]
  )).rows[0];
}

async function updateApiary(id,name,zipcode){
  return (await pool.query(
    "UPDATE apiary SET name=$1,zipcode=$2 WHERE apiaryID=$3 RETURNING *",
    [name,zipcode,id]
  )).rows[0];
}

async function deleteApiary(id){
  await pool.query("DELETE FROM apiary WHERE apiaryID=$1",[id]);
}

async function getHives(){
  return (await pool.query("SELECT * FROM hive")).rows;
}

async function getHive(id){
  return (await pool.query(
    "SELECT * FROM hive WHERE hiveID=$1",[id]
  )).rows[0];
}

async function createHive(hiveName,apiaryId){
  return (await pool.query(
    "INSERT INTO hive(hiveName,apiaryID) VALUES($1,$2) RETURNING *",
    [hiveName,apiaryId]
  )).rows[0];
}

async function updateHive(id,name){
  return (await pool.query(
    "UPDATE hive SET hiveName=$1 WHERE hiveID=$2 RETURNING *",
    [name,id]
  )).rows[0];
}

async function deleteHive(id){
  await pool.query("DELETE FROM hive WHERE hiveID=$1",[id]);
}

async function insertHiveAnalytics(data){
  const {hiveId,temperature,weight,pressure,humidity,beeDeparture} = data;

  return (await pool.query(
    `INSERT INTO hiveAnalytics
    (hiveID,temperature,weight,pressure,humidity,beeDeparture,createdAt,generatedAt)
    VALUES($1,$2,$3,$4,$5,$6,NOW(),NOW())
    RETURNING *`,
    [hiveId,temperature,weight,pressure,humidity,beeDeparture]
  )).rows[0];
}

async function insertOutside(apiaryId,temp){
  return (await pool.query(
    "INSERT INTO outsideAnalytics(apiaryID,temperature,createdAt) VALUES($1,$2,NOW()) RETURNING *",
    [apiaryId,temp]
  )).rows[0];
}

async function insertCredential(hash,apiaryId){
  return (await pool.query(
    "INSERT INTO credentials(hashedKey,apiaryID,createdAt) VALUES($1,$2,NOW()) RETURNING *",
    [hash,apiaryId]
  )).rows[0];
}

async function revokeCredential(hash){
  await pool.query(
    "DELETE FROM credentials WHERE hashedKey=$1",[hash]
  );
}

async function findCredential(hash){
  return (await pool.query(
    "SELECT * FROM credentials WHERE hashedKey=$1",
    [hash]
  )).rows[0];
}

module.exports = {
  getApiaries,
  getApiary,
  createApiary,
  updateApiary,
  deleteApiary,
  getHives,
  getHive,
  createHive,
  updateHive,
  deleteHive,
  insertHiveAnalytics,
  insertOutside,
  insertCredential,
  revokeCredential,
  findCredential
};
