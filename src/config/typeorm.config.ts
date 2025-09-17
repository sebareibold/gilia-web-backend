import { DataSource, DataSourceOptions } from 'typeorm'; // Necesario para crear y configurar la base de datos
import { ConfigService } from '@nestjs/config'; // Necesario para obtener leer las variables de entorno
import { config } from 'dotenv';  // Necesario para cargar variables de entorno desde un archivo .env

config(); // Aca se ejecutan las varaibles de entorno en mem antes de usarla

const configService = new ConfigService(); // Creas la instacia de configService para acceder a las variables de entorno

export const dataSourceOptions: DataSourceOptions = {
  type: 'sqlite',
  database: configService.get<string>('DB_NAME', 'gilia.db'),  // Obtiene el nombre de la base de datos desde el archivo .env
  entities: ['dist/**/*.entity{.ts,.js}'], 
  synchronize: false, // Important: Keep this as false when using migrations
  migrations: ['dist/migrations/*.js'],
  migrationsTableName: 'migrations',
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;

/*
En este archivo se define y exporta la configuración de TypeORM:
- Se cargan variables del .env.
- Se crea un ConfigService para leerlas.
- Se arma un objeto DataSourceOptions con datos de la base (tipo, nombre, entidades, migraciones).
- Se instancia un DataSource con esa configuración.
- Se exporta para que NestJS o la CLI de TypeORM lo usen al conectarse y ejecutar migraciones.

================== Que quiere decir migraciones o cual es la idea ==================

Migraciones en TypeORM son scripts que registran cambios en la estructura de la base de datos
(crear, modificar o borrar tablas, columnas, índices).Ejemplo: si agregás un campo email en 
tu entidad User, no tocás la base a mano. Generás una migración (typeorm migration:generate)
y esa migración contiene el SQL para agregar la columna. Al correrla, TypeORM actualiza la 
base y marca en la tabla migrations que ese cambio ya fue aplicado.

*/
