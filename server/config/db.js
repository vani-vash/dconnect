import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

// Create a mock database object for when MySQL is not available
const createMockDB = () => ({
  query: (sql, params, callback) => {
    console.log('⚠️  Database not available - using mock DB');
    if (callback) callback(null, []);
  },
  on: () => {},
  end: () => {}
});

let db;

try {
  db = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'mentorship_db'
  });

  db.connect(err => {
    if (err) {
      console.log('⚠️  Database connection failed, using mock database');
      console.log('Error:', err.message);
      // Replace with mock DB
      db = createMockDB();
    } else {
      console.log('✅ MySQL Connected!');
    }
  });

  // Handle database errors gracefully
  db.on('error', (err) => {
    console.log('⚠️  Database error:', err.message);
    // Replace with mock DB on error
    db = createMockDB();
  });

} catch (error) {
  console.log('⚠️  Database setup failed, using mock database');
  db = createMockDB();
}

export { db };
