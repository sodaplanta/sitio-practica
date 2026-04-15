Selección de Tecnologías y Despliegue del Sistema
Elección del Sistema Gestor de Base de Datos: PostgreSQL

Para el desarrollo del modelo relacional del sistema de la distribuidora de abarrotes se seleccionó PostgreSQL como Sistema Gestor de Base de Datos. La elección se basó en su robustez, cumplimiento de estándares y facilidad de aprendizaje, lo cual lo convierte en una herramienta adecuada tanto para entornos académicos como profesionales.

PostgreSQL permite implementar de manera precisa las estructuras definidas en el modelo entidad-relación extendido, incluyendo entidades fuertes, entidades débiles, relaciones de diferentes cardinalidades y jerarquías de especialización. Gracias a su soporte completo de SQL, es posible definir claves primarias, claves foráneas, restricciones de integridad y reglas de validación que garantizan la consistencia de los datos.

Además, PostgreSQL ofrece características avanzadas que resultan relevantes para el proyecto, tales como:

Manejo de transacciones (ACID), lo que asegura la integridad de las operaciones.
Soporte para funciones y procedimientos almacenados, útiles para automatizar cálculos como totales de compra.
Posibilidad de implementar triggers para mantener datos derivados actualizados.
Escalabilidad, permitiendo que el sistema crezca sin necesidad de migrar a otro gestor.

En este proyecto, PostgreSQL se utilizó principalmente a nivel de diseño y modelado, asegurando que la estructura del sistema sea correcta y esté preparada para una futura implementación real.

Plataforma de Despliegue: GitHub Pages

Para la publicación de la interfaz web del sistema se utilizó GitHub Pages, un servicio gratuito que permite alojar sitios web estáticos directamente desde repositorios de GitHub.

Esta plataforma facilita la publicación de aplicaciones frontend sin necesidad de configurar servidores o servicios adicionales. Es especialmente útil en proyectos donde el objetivo principal es mostrar la interfaz de usuario y la interacción básica del sistema.

GitHub Pages permite desplegar archivos HTML, CSS y JavaScript de forma inmediata, lo que simplifica el proceso de desarrollo y pruebas.

Proceso de Publicación del Sitio

El despliegue del sistema se realizó mediante los siguientes pasos:

Creación de un repositorio público en GitHub para almacenar el proyecto.
Organización de los archivos del sistema (HTML, CSS y JavaScript).
Subida de los archivos a la rama principal (main) del repositorio.
Configuración de GitHub Pages desde la sección Settings > Pages.
Selección de la rama main como fuente del sitio.
Generación automática de una URL pública accesible desde cualquier navegador.

La URL generada permite visualizar la aplicación sin necesidad de instalar software adicional.

Ventajas de GitHub Pages

El uso de GitHub Pages ofrece múltiples beneficios en el contexto del proyecto:

Despliegue rápido y sencillo.
Integración con control de versiones mediante Git.
Acceso remoto al sistema.
Actualización automática al realizar cambios en el repositorio.
Sin costos de implementación o mantenimiento.
Ideal para pruebas, demostraciones y presentaciones académicas.
Limitaciones de GitHub Pages

A pesar de sus ventajas, GitHub Pages presenta limitaciones importantes:

No permite ejecutar código del lado del servidor.
No soporta bases de datos.
No existe almacenamiento persistente de datos.
No se pueden implementar validaciones complejas del lado backend.
Requiere que el repositorio sea público.
Tiene límites en cuanto al tamaño del proyecto y tráfico permitido.

Debido a estas restricciones, el sistema actual funciona únicamente como una simulación de la base de datos, donde los datos ingresados no se almacenan de forma permanente.

Simulación del Sistema en el Frontend

Dado que GitHub Pages no permite el uso de bases de datos, la funcionalidad del sistema se implementó mediante JavaScript en el navegador. Esto implica que:

Los datos ingresados se almacenan temporalmente en memoria.
No existe persistencia entre sesiones.
Las relaciones entre entidades se simulan sin validación real de integridad referencial.

Sin embargo, esta simulación permite representar de manera visual y funcional:

La estructura del modelo relacional.
La interacción entre entidades.
El flujo de registro de datos como clientes, productos y compras.

Esto cumple con el objetivo académico de demostrar la aplicación del modelo sin necesidad de una implementación completa.

Comparación con Alternativa: Render

Se evaluó el uso de la plataforma Render como alternativa para el despliegue del sistema. Render ofrece soporte para aplicaciones dinámicas, ejecución de código backend y conexión con bases de datos reales.

Entre sus ventajas destacan:

Posibilidad de integrar PostgreSQL directamente.
Soporte para frameworks backend como Node.js.
Mayor control sobre la configuración del entorno.
Capacidad de implementar autenticación y lógica de negocio.

No obstante, también presenta desventajas en este contexto:

Mayor complejidad de configuración.
Requiere conocimientos adicionales en despliegue.
Puede implicar costos dependiendo del uso.
Justificación de la Decisión

Se decidió utilizar GitHub Pages debido a que el objetivo principal del proyecto es demostrar el diseño del sistema y su interfaz, no su implementación completa.

GitHub Pages permite:

Reducir la complejidad técnica.
Acelerar el desarrollo.
Facilitar la entrega y evaluación del proyecto.
Mantener un control claro de versiones.

Por estas razones, se consideró la opción más adecuada para esta etapa.

Proyección a Futuro

El sistema desarrollado puede evolucionar hacia una implementación completa mediante:

Integración con un backend (por ejemplo, Node.js o Django).
Conexión a una base de datos PostgreSQL real.
Implementación de autenticación de usuarios.
Validación de integridad referencial en el servidor.
Automatización de cálculos como totales y subtotales.
Uso de APIs para comunicación entre frontend y backend.

Esto permitiría transformar el sistema de una simulación a una aplicación funcional.

Conclusión

La elección de PostgreSQL y GitHub Pages permitió desarrollar un sistema estructurado, funcional a nivel de interfaz y alineado con el modelo relacional definido.

PostgreSQL proporciona la base teórica y estructural del sistema, mientras que GitHub Pages facilita su visualización y acceso. Esta combinación representa una solución adecuada para el alcance del proyecto, permitiendo una implementación clara, organizada y escalable en futuras etapas.