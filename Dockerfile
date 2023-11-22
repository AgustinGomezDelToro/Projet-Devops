# Utilizar una imagen de Node.js como base
FROM node:18.16
# Crear directorio de trabajo
WORKDIR /usr/src/app

# Copiar 'package.json' y 'package-lock.json' (si está disponible)
COPY package*.json ./

# Instalar dependencias del proyecto
RUN npm install

# Copiar todos los archivos del proyecto al contenedor
COPY . .

# Construir la aplicación de Next.js
RUN npm run build

# Exponer el puerto que usa tu aplicación (usualmente es el 3000 para Next.js)
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "start"]
