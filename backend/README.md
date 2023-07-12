# CAC23001 - Backend

## Instalación
### Primeros pasos
Asegurarse de tener instalado el intérprete de Python en el sistema:
https://www.python.org/downloads/

Clonar el repositorio. Abrir una consola en la ruta principal.

### Entorno virtual
El entorno virtual de Python permite instalar dependencias solo en el proyecto actual.

Crear entorno virtual:
Windows:
```python -m venv app```

macOS, Linux:
```python3 -m venv app```

Activar el entorno virtual:

En Powershell:
```.\app\scripts\activate.ps1```

En Windows CMD:
```.\app\scripts\activate.bat```

En BASH de macOS, Linux, Windows GitBash:
```source ./app/scripts/activate```

La línea de comandos debe mostrar (app)

### Instalación de dependencias
Con el entorno virtual activado:
```pip install -r requirements.txt```

### Base de datos
Se necesita una base de datos de tipo MySQL para administrar las tablas.
Para pruebas en escritorio se puede instalar XAMPP, que incluye el servidor Apache y MariaDB

En app.py se deben editar las credenciales:
```"SQLALCHEMY_DATABASE_URI"```

## Activación de la API
en consola ejecutar:

Windows Powershell, CMD, GitBash:
```python app.py```

macOS, Linux:
```python3 ./app.py```