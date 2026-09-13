# 💰 Alke Wallet

![Logo](assets/images/logo.png)

## 📌 Descripción

**Alke Wallet** es una billetera digital desarrollada como proyecto del Módulo 2: Fundamentos del desarrollo Front-end. Permite a los usuarios gestionar sus activos financieros de manera segura y conveniente, simulando operaciones bancarias en un entorno web intuitivo y responsive.

## 🎯 Objetivo

Desarrollar una aplicación web funcional que demuestre los conocimientos adquiridos en:
- HTML5 semántico
- CSS3 responsive
- JavaScript para lógica de negocio
- Bootstrap 5 para diseño UI
- jQuery para interactividad
- Git para control de versiones

## ✨ Funcionalidades

### 🔐 Inicio de Sesión
- Validación de credenciales
- Mensajes de error interactivos
- Redirección al menú principal

### 💵 Gestión de Fondos
- Visualización de saldo disponible
- Depósito de fondos con confirmación
- Actualización en tiempo real

### 📤 Envío de Dinero
- Búsqueda de contactos con autocomplete
- Validación de saldo suficiente
- Registro de transacciones

### 📊 Historial de Transacciones
- Visualización de todos los movimientos
- Identificación por tipo (depósito/envío)
- Fechas y estados de cada transacción

### 👥 Gestión de Contactos
- Lista de contactos predefinidos
- Agregar nuevos contactos (modal)
- Autocomplete en búsqueda

## 🛠️ Tecnologías Utilizadas

| Tecnología | Versión | Uso |
|------------|---------|-----|
| HTML5 | - | Estructura semántica |
| CSS3 | - | Estilos y diseño |
| JavaScript | ES6 | Lógica de negocio |
| Bootstrap | 5.3.0 | Framework UI responsive |
| jQuery | 3.7.1 | Manipulación DOM y efectos |
| jQuery UI | 1.13.2 | Autocomplete |
| Git | 2.55.0 | Control de versiones |
| GitHub | - | Repositorio remoto |

## 📁 Estructura del Proyecto
billetera-digital/
│
├── index.html          ← jQuery + Bootstrap + login.js
├── menu.html           ← jQuery + Bootstrap + menu.js
├── deposit.html        ← jQuery + Bootstrap + deposit.js
├── sendmoney.html      ← jQuery + Bootstrap + sendmoney.js
├── transactions.html   ← jQuery + Bootstrap + transactions.js
│
└── assets/
    └── js/
        ├── login.js
        ├── menu.js
        ├── deposit.js
        ├── sendmoney.js
        └── transactions.js
