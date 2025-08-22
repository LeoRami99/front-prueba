# Front-Prueba - Aplicación de Comercio Electrónico con React Native

Esta aplicación es una solución de comercio electrónico móvil desarrollada con React Native y Expo. Permite a los usuarios explorar productos, realizar pagos y gestionar transacciones.

## 📱 Características

- **Navegación intuitiva**: Implementada con expo-router para una experiencia de navegación fluida y basada en archivos
- **Catálogo de productos**: Visualización de productos en formato carrusel y cuadrícula
- **Detalles de productos**: Información detallada de cada producto
- **Proceso de pago**: Flujo completo de checkout con opciones de pago
- **Gestión de transacciones**: Seguimiento de las transacciones realizadas
- **Diseño responsivo**: Adaptable a diferentes tamaños de pantalla
- **Modo oscuro/claro**: Soporte para diferentes esquemas de color

## 🛠️ Tecnologías utilizadas

- **[Expo](https://expo.dev)**: Plataforma para desarrollo universal de aplicaciones React
- **[React Native](https://reactnative.dev)**: Framework para desarrollo de aplicaciones nativas
- **[Redux Toolkit](https://redux-toolkit.js.org/)**: Gestión del estado de la aplicación
- **[TanStack Query](https://tanstack.com/query)**: Gestión de datos asíncronos y cache
- **[NativeWind](https://www.nativewind.dev/)**: TailwindCSS para React Native
- **[React Hook Form](https://react-hook-form.com/)**: Manejo de formularios
- **[Axios](https://axios-http.com/)**: Cliente HTTP para realizar peticiones API
- **[React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/)**: Animaciones fluidas
- **[React Native Toast Message](https://github.com/calintamas/react-native-toast-message)**: Notificaciones tipo toast

## 🚀 Inicio rápido

### Requisitos previos

- Node.js (versión recomendada: 18.x o superior)
- npm o yarn
- Expo CLI: `npm install -g expo-cli`
- (Opcional) Emuladores para iOS o Android, o dispositivos físicos

### Instalación

1. Clonar el repositorio:

    ```bash
    git clone [url-del-repositorio]
    cd front-prueba
    ```

2. Instalar las dependencias:

    ```bash
    npm install
    ```

3. Iniciar la aplicación:

    ```bash
    npx expo start
    ```

4. Abre la aplicación en:
    - Un dispositivo físico usando Expo Go
    - Un emulador de iOS o Android
        - Un navegador web (aunque algunas funcionalidades pueden estar limitadas)

## 📁 Estructura del proyecto

```
/app                    # Vistas principales (enrutamiento basado en archivos)
/assets                 # Recursos estáticos (imágenes, fuentes)
/components             # Componentes reutilizables
/constants              # Constantes globales
/features               # Slices de Redux Toolkit
/hooks                  # Custom hooks
/lib                    # Configuración de bibliotecas
/services               # Servicios para la comunicación con APIs
/styles                 # Estilos globales
/types                  # Interfaces y tipos TypeScript
```

## 📱 Módulos principales

### Productos

Permite a los usuarios ver el catálogo de productos, incluyendo imágenes, precios y detalles.

### Proceso de pago

Gestiona el flujo de pago con validación de tarjetas de crédito y procesamiento de transacciones.

### Transacciones

Maneja el historial de transacciones y el estado de los pagos.

## 🧪 Desarrollo

### Comandos útiles

- **Iniciar la aplicación**: `npm start`
- **Resetear el proyecto**: `npm run reset-project`
- **Ejecutar en Android**: `npm run android`
- **Ejecutar en iOS**: `npm run ios`
- **Ejecutar en web**: `npm run web`
- **Lint**: `npm run lint`

### Entorno de desarrollo

El proyecto utiliza TypeScript para un desarrollo más robusto y con verificación de tipos. También se implementa NativeWind para estilizar los componentes utilizando clases de TailwindCSS.

## 📋 Requisitos para producción

- Cuenta en Expo para compilar la aplicación
- Cuentas de desarrollador para iOS (Apple Developer Program) y Android (Google Play Console) para publicar la aplicación
- Configuración de las variables de entorno adecuadas

---

Desarrollado con ❤️ utilizando Expo y React Native.
