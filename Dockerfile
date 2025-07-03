# Imagen base
FROM node:20

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos de configuración
COPY package*.json ./
COPY tsconfig.json ./

# Instala dependencias
RUN npm install

# Copia el código fuente
COPY . .

# Compila el proyecto
RUN npm run build

# Copia los archivos .proto al directorio dist
RUN cp -r src/grpc/proto dist/grpc/ 2>/dev/null || mkdir -p dist/grpc && cp -r src/grpc/proto dist/grpc/

# Expone el puerto
EXPOSE 3001

# Comando para ejecutar la app
CMD ["node", "dist/index.js"]
