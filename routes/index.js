const express = require( 'express' ),
      router = express.Router(),
      { Client } = require('pg');
      
// establish database connection
const client = new Client({
  host: 'localhost',
  database: 'zurichdb',
  user: 'student',
  password: 'student',
  port: 5432,
});

client.connect();

// GET home page
router.get('/', async ( req, res ) => { 
      
  try {

    const queryResult = await client.query('SELECT * FROM defaults WHERE id=1');

    // Respond with the queried data
    res.render( `index`, { title: queryResult.rows[0].sitename });
  }
  catch ( error ) {
    console.error( error );
    res.status( 500 ).send( 'Internal Server Error' );
  }
    
});

module.exports = router;


