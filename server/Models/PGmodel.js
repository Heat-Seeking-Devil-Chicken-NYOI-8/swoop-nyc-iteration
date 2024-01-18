const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: 'postgres://wpkjemsd:2GbAVbR9j_HwjxpDPqeGn8XpscuU6hgY@batyr.db.elephantsql.com/wpkjemsd'
});

pool.on('connect', () => {
    console.log('Connected to PostgreSQL database');
});

module.exports = {
    query: (text, params, callback) => {
        // console.log('executed query', text);
        return pool.query(text, params, callback);
    }
};