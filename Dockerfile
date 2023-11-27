# Utiliza la imagen de node como base
FROM node:latest

# Establece el directorio de trabajo en /app
WORKDIR /app

# Copia los archivos de package.json y package-lock.json en el directorio de trabajo
COPY package*.json ./

# Instala todas las dependencias
RUN npm install

# Copia todo el contenido de la aplicación en el directorio de trabajo
COPY . .

# Copia los archivos de configuración de ESLint, Prettier, TypeScript, Next.js y otros archivos necesarios en el directorio de trabajo
COPY jsconfig.json .
COPY .prettierrc .
COPY .babelrc .
COPY .env.development .
COPY .gitignore .

RUN npm run build

# Expone el puerto 3000
EXPOSE 3000

# Ejecuta el comando para iniciar el servidor de desarrollo
CMD [ "npm", "run", "start" ]
