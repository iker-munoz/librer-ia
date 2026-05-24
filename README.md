# Librer-IA

Librer-IA es una aplicación web desarrollada con **SvelteKit** que permite interactuar con modelos de lenguaje ejecutados localmente mediante **Ollama**.
El sistema utiliza **SurrealDB** para almacenar conversaciones y mantener la persistencia de los datos de forma local.

## Requisitos

Antes de ejecutar la aplicación, asegúrate de tener instalados los siguientes componentes:

* **Node.js** `22.11.0 LTS` o superior
* **Docker** y **Docker Compose**

## Instalación y ejecución

### 1. Clonar el repositorio

```bash
git clone https://github.com/iker-munoz/librer-ia.git
cd librer-ia
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Iniciar los servicios necesarios

```bash
docker compose up -d
```

### 4. Ejecutar la aplicación

```bash
npm run dev
```

Una vez iniciada la aplicación, estará disponible desde el navegador en la dirección local configurada por **SvelteKit**.

## Primer inicio

En el primer acceso se ejecutará automáticamente un proceso de configuración inicial (*setup*). Este proceso se encarga de:

* Crear los esquemas necesarios en la base de datos.
* Descargar los modelos requeridos desde los repositorios de Ollama.
* Preparar la configuración básica de la aplicación.

> [!WARNING]
> El proceso de inicialización puede tardar varios minutos dependiendo de la velocidad de conexión a Internet y del tamaño de los modelos descargados.

## Credenciales por defecto

Durante la inicialización se genera automáticamente una cuenta de administrador.
Estas credenciales permiten acceder a las funcionalidades administrativas de la aplicación:

```text
Usuario: Root
Contraseña: librer-ia
```
