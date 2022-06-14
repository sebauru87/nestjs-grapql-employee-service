//  synchronize: true es ultra peligroso porque actualiiza y borra una columna de una tabla de la base de datos
// solo true para development local
var dbConfig = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: false,
  migrations: ['migrations/*.js'],
  cli: {
    migrationsDir: 'migrations',
  },
};

// switch (process.env.NODE_ENV) {
//   case 'development':
//     Object.assign(dbConfig, {
//       type: 'sqlite',
//       database: 'db.sqlite',
//       entities: ['**/*.entity.js'],
//     });
//     break;
//   case 'test':
//     Object.assign(dbConfig, {
//       type: 'sqlite',
//       database: 'test.sqlite',
//       entities: ['**/*.entity.ts'],
//       migrationsRun: true,
//     });
//     break;
//   case 'production':
//     break;
//   default:
//     throw new Error('unknown environment');
// }

module.exports = dbConfig;
