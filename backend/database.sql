-- Database Schema para CMS PHP
-- Execute este SQL no seu banco de dados MySQL/MariaDB

CREATE DATABASE IF NOT EXISTS portfolio_cms CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE portfolio_cms;

-- Tabela de usuários admin
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'editor') DEFAULT 'editor',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Hero Section
CREATE TABLE IF NOT EXISTS hero_section (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL DEFAULT 'WESLEY',
    subtitle TEXT,
    photo_url VARCHAR(500),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- About Section
CREATE TABLE IF NOT EXISTS about_section (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL DEFAULT 'Sobre MIM',
    description1 TEXT,
    description2 TEXT,
    specialty VARCHAR(255),
    focus VARCHAR(255),
    photo_url VARCHAR(500),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Projects
CREATE TABLE IF NOT EXISTS projects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    subtitle VARCHAR(255),
    category VARCHAR(255),
    description TEXT,
    url VARCHAR(500),
    year VARCHAR(10),
    tags JSON,
    preview_image_url VARCHAR(500),
    display_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Services
CREATE TABLE IF NOT EXISTS services (
    id INT AUTO_INCREMENT PRIMARY KEY,
    number INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    icon VARCHAR(100),
    preview_content LONGTEXT,
    display_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Testimonials
CREATE TABLE IF NOT EXISTS testimonials (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(255),
    company VARCHAR(255),
    text TEXT NOT NULL,
    rating INT DEFAULT 5,
    display_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- FAQ
CREATE TABLE IF NOT EXISTS faqs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    question VARCHAR(500) NOT NULL,
    answer TEXT NOT NULL,
    display_order INT DEFAULT 0,
    is_open BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Contact Info
CREATE TABLE IF NOT EXISTS contact_info (
    id INT AUTO_INCREMENT PRIMARY KEY,
    whatsapp VARCHAR(50),
    email VARCHAR(255),
    instagram VARCHAR(100),
    github VARCHAR(255),
    linkedin VARCHAR(255),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Inserir dados iniciais
INSERT INTO hero_section (name, subtitle) VALUES 
('WESLEY', 'Um web designer apaixonado por criar projetos ousados e memoráveis');

INSERT INTO about_section (title, description1, description2, specialty, focus) VALUES 
('Sobre MIM', 
'Especializado em desenvolvimento front-end e design de interfaces, transformo conceitos em experiências digitais que realmente funcionam.',
'Cada projeto que desenvolvo é pensado para unir estética, performance e resultados mensuráveis.',
'Web Design & Frontend',
'Experiência do Usuário');

INSERT INTO contact_info (whatsapp, email, instagram, github, linkedin) VALUES 
('5571991373142', 'devwesleysc@gmail.com', 'welziinho', 'https://github.com/weelzinhox22', 'https://www.linkedin.com/in/wesley-s-8a6b24108/');

-- Criar usuário admin padrão (senha: admin123)
-- Para gerar nova senha: php -r "echo password_hash('sua_senha', PASSWORD_DEFAULT);"
INSERT INTO users (username, email, password, role) VALUES 
('admin', 'admin@portfolio.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin');

