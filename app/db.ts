import sql, { ConnectionPool, IProcedureResult } from 'mssql';

interface DBConfig {
  user: string | undefined;
  password: string | undefined;
  server: string | undefined;
  database: string | undefined;
  options: {
    encrypt: boolean;
    trustServerCertificate: boolean;
  };
}

const config: DBConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

const dbClientService = async (): Promise<ConnectionPool> => {
  try {
    // @ts-ignore
    const pool = await sql.connect(config);
    // @ts-ignore
    return pool;
  } catch (error) {
    console.error('Error connecting to database:', error);
    throw error;
  }
};

interface Params {
  [key: string]: any;
}

interface OutputParams {
  statusid?: number;
  statusmessage?: string;
  totalcount?: number;
  data?: any[];
}

async function callStoredProcedure(
  procedureName: string,
  params: Params = {},
  outputParams: string[] = ['StatusID', 'StatusMessage', 'TotalCount']
): Promise<OutputParams> {
  try {
    const pool = await dbClientService();
    const request = pool.request();

    if (Object.keys(params).length > 0) {
      for (const paramName in params) {
        request.input(paramName, params[paramName]);
      }
    }

    outputParams.forEach(paramName => {
      if (paramName === 'StatusID') {
        request.output(paramName, sql.Int);
      } else if (paramName === 'StatusMessage') {
        request.output(paramName, sql.VarChar(200));
      } else if (paramName === 'TotalCount') {
        request.output(paramName, sql.Int);
      }
    });

    const result: IProcedureResult<any> = await request.execute(procedureName);

    const returnObject: OutputParams = { data: result.recordset };

    outputParams.forEach(paramName => {
      returnObject[paramName.toLowerCase() as keyof OutputParams] = result.output[paramName];
    });

    return returnObject;
  } catch (error) {
    console.error(`Error occurred calling sp - ${procedureName}`, error);
    throw error;
  }
}

export { dbClientService, callStoredProcedure };
