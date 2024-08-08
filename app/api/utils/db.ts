import { ConnectionPool, config as SqlConfig } from 'mssql';
import sql from 'mssql';

export async function query(sqlText: string, parameters: any) {
  const config: SqlConfig = {
    user: process.env.DB_USER || '',
    password: process.env.DB_PASSWORD || '',
    server: process.env.DB_SERVER || '',
    database: process.env.DB_DATABASE || '',
    options: {
      encrypt: true, 
      trustServerCertificate: true 
    }
  };

  if (!config.user || !config.password || !config.server || !config.database) {
    throw new Error('Database configuration is incomplete.');
  }

  const pool = new ConnectionPool(config);

  try {
    await pool.connect();
    const request = pool.request();

    // Add parameters with type
    if (parameters) {
      for (const [key, value] of Object.entries(parameters)) {
        if (value && value.value !== undefined) {
          request.input(key, value.type, value.value);
        } else {
          throw new Error(`Parameter ${key} is undefined or has no value.`);
        }
      }
    }

    const result = await request.query(sqlText);
    return result;
  } catch (error) {
    throw new Error(`SQL query error: ${error.message}`);
  } finally {
    await pool.close();
  }
}
