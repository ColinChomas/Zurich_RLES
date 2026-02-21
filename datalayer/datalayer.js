const pool = require("./db");

async function getApiaries(){
  return (await pool.query("SELECT * FROM apiary")).rows;
}

async function getApiary(id){
  return (await pool.query(
    "SELECT * FROM apiary WHERE apiaryid=$1",[id]
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
    "UPDATE apiary SET name=$1,zipcode=$2 WHERE apiaryid=$3 RETURNING *",
    [name,zipcode,id]
  )).rows[0];
}

async function deleteApiary(id){
  await pool.query("DELETE FROM apiary WHERE apiaryid=$1",[id]);
}

async function getHives(){
  return (await pool.query("SELECT * FROM hive")).rows;
}

async function getHive(id){
  return (await pool.query(
    "SELECT * FROM hive WHERE hiveid=$1",[id]
  )).rows[0];
}

async function createHive(hiveName,apiaryId){
  return (await pool.query(
    "INSERT INTO hive(hivename,apiaryid) VALUES($1,$2) RETURNING *",
    [hiveName,apiaryId]
  )).rows[0];
}

async function updateHive(id,name){
  return (await pool.query(
    "UPDATE hive SET hivename=$1 WHERE hiveid=$2 RETURNING *",
    [name,id]
  )).rows[0];
}

async function deleteHive(id){
  await pool.query("DELETE FROM hive WHERE hiveid=$1",[id]);
}

async function insertHiveAnalytics(data){
  const {hiveId,temperature,weight,pressure,humidity,beeDeparture} = data;

  return (await pool.query(
    `INSERT INTO hiveanalytics
    (hiveid,temperature,weight,pressure,humidity,beedeparture,measuredat,ingestedat)
    VALUES($1,$2,$3,$4,$5,$6,NOW(),NOW())
    RETURNING *`,
    [hiveId,temperature,weight,pressure,humidity,beeDeparture]
  )).rows[0];
}

async function insertOutside(apiaryId,temp){
  return (await pool.query(
    "INSERT INTO outsideanalytics(apiaryid,temperature,createdat) VALUES($1,$2,NOW()) RETURNING *",
    [apiaryId,temp]
  )).rows[0];
}

async function insertKey(hiveId,hash,prefix){
  return (await pool.query(
    "INSERT INTO hive_api_keys(hiveid,keyhash,keyprefix,isactive,createdat) VALUES($1,$2,$3,true,NOW()) RETURNING *",
    [hiveId,hash,prefix]
  )).rows[0];
}

async function revokeKey(id){
  return (await pool.query(
    "UPDATE hive_api_keys SET isactive=false WHERE keyid=$1 RETURNING *",
    [id]
  )).rows[0];
}

async function findKey(hash){
  return (await pool.query(
    "SELECT * FROM hive_api_keys WHERE keyhash=$1 AND isactive=true",
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
  insertKey,
  revokeKey,
  findKey
};
