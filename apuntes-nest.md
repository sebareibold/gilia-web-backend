# Tutorial por Seba :)

Guía con los pasos que seguí y los conceptos que aprendí. Está escrita para que otra persona pueda entenderlo fácilmente.

---

## 1. Instalar NestJS y crear el Proyecto

- Instalá el CLI de NestJS:
```bash
npm i -g @nestjs/cli
```

- Crear proyecto:
```bash
nest new gilia-web-backend
```

Obs: Ahí tenés que elegir el gestor de paquetes (npm, pnpm o yarn). Yo opté por **npm**.

## 2. Entendiendo el flujo de NestJS

### 2.1 Archivo principal: **main.ts**

En todo proyecto, el flujo comienza en **main.ts**. Este archivo arranca la aplicación NestJS y también configura middleware, CORS, pipes globales, etc.

Dentro de este archivo se declaran/aparecen cosas como:

- `const app = await NestFactory.create(AppModule);` → Crea una instancia de la aplicación NestJS.

- `app.useGlobalPipes()` → Define validaciones globales para todos los DTOs (Data Transfer Object).  
  Ejemplos:  
  - **whitelist**: elimina propiedades que no están en el DTO.  
  - **forbidNonWhitelisted**: lanza error si llegan propiedades no definidas en el DTO.  
  - **transform** y **transformOptions**: convierten los datos del frontend al tipo correcto.

- Configuración de **CORS**  → Permite que el frontend pueda hacer peticiones a la API.

- `app.setGlobalPrefix('api');` → Define el prefijo global `/api` para todas las rutas.


### 2.2 Módulo principal: **app.module.ts**

Este es el núcleo de la aplicación. Aquí se importan y organizan los demás módulos.  
Además, se configura **TypeORM**, que permite mapear clases a tablas de base de datos sin escribir SQL manualmente.

### 2.3 Controlador principal: **app.controller.ts**

Este archivo actúa como el "recepcionista" de la aplicación. Su función es **recibir las peticiones HTTP**, decidir qué hacer con ellas y devolver una respuesta.

- Los controladores usan decoradores como `@Controller()` para definirse y `@Get('ruta')` o `@Post('ruta')` para exponer endpoints específicos.
- Ejemplo: si el controlador define `@Get('health')`, la ruta completa sería `/api/health` (porque en `main.ts` se configuró el prefijo `/api`).


### 2.4 Servicio principal: **app.service.ts**

El archivo **app.service.ts** define la lógica de negocio básica de la aplicación.  
Un **service** en NestJS es simplemente una clase marcada con `@Injectable()` para poder ser inyectada en otros componentes (por ejemplo, en los controladores).  

Su rol es **procesar datos, aplicar reglas de negocio o devolver información**, mientras que el controlador solo se encarga de recibir la petición y delegar el trabajo.

## 3. Estructura de un módulo en NestJS

En NestJS cada funcionalidad de la aplicación se organiza dentro de **módulos**.  
Un módulo está formado por **controllers**, **services**, **entities** y **DTOs**.  

La idea es que cada módulo represente un dominio concreto (por ejemplo: Usuarios, Noticias, Publicaciones, etc.).


### 3.1 Módulo

- Archivo principal del módulo, ej: `usuarios.module.ts`.  
- Define qué **controladores** y **servicios** pertenecen a ese módulo.  
- Puede importar otros módulos si necesita usarlos.  

Ejemplo:
```typescript
import { Module } from '@nestjs/common';
import { UsuariosController } from './usuarios.controller';
import { UsuariosService } from './usuarios.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './usuario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario])],
  controllers: [UsuariosController],
  providers: [UsuariosService],
})
export class UsuariosModule {}
```

### 3.2 Controller
 - Recibe las peticiones HTTP (GET, POST, PUT, DELETE).
 - Se encarga de invocar al servicio correspondiente.
 - Devuelve la respuesta al cliente.

```typescript
import { Controller, Get, Post, Body } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Get()
  getAll() {
    return this.usuariosService.findAll();
  }

  @Post()
  create(@Body() dto: CreateUsuarioDto) {
    return this.usuariosService.create(dto);
  }
}

```

### 3.3 Service
 - Contiene la lógica de negocio.
 - Procesa datos y se comunica con la base de datos usando los repositories de TypeORM.
 - El controlador nunca accede directo a la base de datos, siempre pasa por el servicio.

```typescript
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './usuario.entity';
import { CreateUsuarioDto } from './dto/create-usuario.dto';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  findAll(): Promise<Usuario[]> {
    return this.usuarioRepository.find();
  }

  create(dto: CreateUsuarioDto): Promise<Usuario> {
    const nuevo = this.usuarioRepository.create(dto);
    return this.usuarioRepository.save(nuevo);
  }
}

```

### 3.4 Entidades
 - Representan las tablas en la base de datos.
 - Son clases decoradas con @Entity().
 - Cada propiedad es una columna (@Column).
```typescript

import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  email: string;
}
```

### 3.5 DTOs (Data Transfer Objects)
- Son clases que definen cómo deben venir los datos desde el frontend.
- Se usan para validar con class-validator.
- No son entidades, solo sirven para validar y tipar los datos de entrada.

```typescript
import { IsString, IsEmail } from 'class-validator';

export class CreateUsuarioDto {
  @IsString()
  nombre: string;

  @IsEmail()
  email: string;
}
```
Para aclarar class-validator es una librería de Node.js que NestJS usa para validar objetos basados en clases.

Se instala junto a class-transformer:

```typescript
npm install class-validator class-transformer
```

Su función es revisar que los datos que llegan en un DTO cumplan con las reglas que definas. Funciona a través de decoradores (ej: @IsEmail(), @IsNotEmpty(), @Length(), etc.). NestJS lo ejecuta gracias a los pipes globales que configuramos en main.ts con app.useGlobalPipes(new ValidationPipe()).