-- Tabla: users
CREATE TABLE
    users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL, -- Almacenar hash, no contraseñas en texto plano
        email VARCHAR(100) NOT NULL UNIQUE,
        role VARCHAR(20) NOT NULL DEFAULT 'user', -- 'admin', 'user', etc.
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        status TINYINT DEFAULT 1 -- 1 = activo, 0 = inactivo
    );

-- Tabla: products
CREATE TABLE
    products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        description TEXT,
        price DECIMAL(10, 2) NOT NULL,
        stock INT NOT NULL DEFAULT 0,
        category_id INT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        status TINYINT DEFAULT 1, -- 1 = activo, 0 = inactivo
        FOREIGN KEY (category_id) REFERENCES categories (id)
    );

-- Tabla: categories
CREATE TABLE
    categories (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(50) NOT NULL,
        description TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        status TINYINT DEFAULT 1 -- 1 = activo, 0 = inactivo
    );