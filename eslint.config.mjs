// @ts-check
// Importaciones de las herramientas que usarás
import eslint from '@eslint/js'; // Reglas base de ESLint
import globals from 'globals'; // Define variables globales (ej: 'process' en Node, 'describe' en Jest)
import tseslint from 'typescript-eslint'; // Herramientas para que ESLint entienda TypeScript

// La exportación principal es un array de configuraciones
export default tseslint.config(

  // --- 1. Archivos a Ignorar ---
  {
    ignores: ['eslint.config.mjs'], // Le dice a ESLint que no se analice a sí mismo.
  },

  // --- 2. Reglas Base de ESLint ---
  //eslint.configs.recommended, 
  
  // --- 3. Reglas Base de TypeScript ---
  ...tseslint.configs.recommendedTypeChecked, // Activa las reglas recomendadas para TypeScript que necesitan información de tipos (requiere tsconfig.json).

  // --- 4. Integración con Prettier  ---
  //eslintPluginPrettierRecommended, 
                                   

  // --- 5. Configuración del Entorno y Parser ---
  {
    languageOptions: {
      globals: {
        ...globals.node, // Reconoce variables globales de Node.js (ej: `require`, `process`).
        ...globals.jest, // Reconoce variables globales de Jest (ej: `describe`, `it`, `expect`).
      },
      sourceType: 'commonjs', // Asume que tu código fuente usa `require` y `module.exports`. Cambia a 'module' si usas `import/export`.
      parserOptions: {
        projectService: true, // Optimización para el análisis con tipos.
        tsconfigRootDir: import.meta.dirname, // Le dice a ESLint dónde encontrar tu `tsconfig.json` (en la misma carpeta que este archivo).
      },
    },
  },
  
  // --- 6. Tus Reglas Personalizada  ---
  {
    rules: {
      // 'off' -> Desactiva la regla.
      '@typescript-eslint/no-explicit-any': 'off', 
      
      // 'warn' -> Muestra una advertencia amarilla, pero no falla el linting.
      '@typescript-eslint/no-floating-promises': 'warn', 
      '@typescript-eslint/no-unsafe-argument': 'warn',

      // 'error' -> Muestra un error rojo y falla el linting. (Ejemplo no presente en tu código).
    },
  },
);