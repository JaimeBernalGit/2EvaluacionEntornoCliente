IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = 'GestionCursosDB')
BEGIN
    CREATE DATABASE GestionCursosDB;
END
GO

USE GestionCursosDB;
GO

IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Usuario' AND xtype='U')
BEGIN
    CREATE TABLE Usuario (
        usuario_id INT IDENTITY(1,1) PRIMARY KEY,
        nombre NVARCHAR(100) NOT NULL,
        nombre_usuario NVARCHAR(50) NOT NULL UNIQUE, 
        password NVARCHAR(255) NOT NULL,
        email NVARCHAR(100) NOT NULL UNIQUE,
        fecha_registro DATETIME NOT NULL DEFAULT GETDATE(), 
        estado NVARCHAR(20) DEFAULT 'activo',
        rol NVARCHAR(10) DEFAULT 'user',
        fotoPerfilUrl NVARCHAR(255)
    );
END
GO

IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Curso' AND xtype='U')
BEGIN
    CREATE TABLE Curso (
        curso_id INT IDENTITY(1,1) PRIMARY KEY,
        titulo NVARCHAR(150) NOT NULL,
        descripcion NVARCHAR(MAX), 
        categoria NVARCHAR(50),
        nivel NVARCHAR(20),
        fecha_creacion DATETIME NOT NULL DEFAULT GETDATE(),
        precio DECIMAL(10, 2) NOT NULL DEFAULT 0.00 CHECK (precio >= 0),
        docUrl NVARCHAR(255)
    );
END
GO

IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Leccion' AND xtype='U')
BEGIN
    CREATE TABLE Leccion (
        leccion_id INT IDENTITY(1,1) PRIMARY KEY,
        curso_id INT NOT NULL,
        titulo NVARCHAR(150) NOT NULL,
        contenido_url NVARCHAR(255),
        duracion_min INT,
        descripcion NVARCHAR(MAX),
        CONSTRAINT FK_Leccion_Curso FOREIGN KEY (curso_id) REFERENCES Curso(curso_id)
    );
END
GO

IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Inscripcion' AND xtype='U')
BEGIN
    CREATE TABLE Inscripcion (
        inscripcion_id INT IDENTITY(1,1) PRIMARY KEY,
        usuario_id INT NOT NULL,
        curso_id INT NOT NULL,
        fecha_inscripcion DATETIME NOT NULL DEFAULT GETDATE(),
        progreso_porcentaje DECIMAL(5, 2) DEFAULT 0.00 CHECK (progreso_porcentaje BETWEEN 0 AND 100),
        estado NVARCHAR(20) DEFAULT 'cursando',
        CONSTRAINT FK_Inscripcion_Usuario FOREIGN KEY (usuario_id) REFERENCES Usuario(usuario_id),
        CONSTRAINT FK_Inscripcion_Curso FOREIGN KEY (curso_id) REFERENCES Curso(curso_id)
    );
END
GO

IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Resena' AND xtype='U')
BEGIN
    CREATE TABLE Resena (
        resena_id INT IDENTITY(1,1) PRIMARY KEY,
        usuario_id INT NOT NULL,
        curso_id INT NOT NULL,
        calificacion INT NOT NULL CHECK (calificacion >= 1 AND calificacion <= 5),
        comentario NVARCHAR(MAX),
        fecha_publicacion DATETIME NOT NULL DEFAULT GETDATE(),
        CONSTRAINT FK_Resena_Usuario FOREIGN KEY (usuario_id) REFERENCES Usuario(usuario_id),
        CONSTRAINT FK_Resena_Curso FOREIGN KEY (curso_id) REFERENCES Curso(curso_id)
    );
END
GO

IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Pago' AND xtype='U')
BEGIN
    CREATE TABLE Pago (
        pago_id INT IDENTITY(1,1) PRIMARY KEY,
        usuario_id INT NOT NULL,
        curso_id INT NOT NULL,
        cantidad DECIMAL(10, 2) NOT NULL CHECK (cantidad >= 0),
        nombre_titular NVARCHAR(100) NOT NULL,
        numero_titular NVARCHAR(20) NOT NULL,
        cvv NVARCHAR(5) NOT NULL,
        fecha_pago DATETIME NOT NULL DEFAULT GETDATE(),
        CONSTRAINT FK_Pago_Usuario FOREIGN KEY (usuario_id) REFERENCES Usuario(usuario_id),
        CONSTRAINT FK_Pago_Curso FOREIGN KEY (curso_id) REFERENCES Curso(curso_id)
    );
END
GO

IF NOT EXISTS (SELECT TOP 1 1 FROM Usuario)
BEGIN
    INSERT INTO Usuario (nombre, nombre_usuario, password, email, estado, rol, fotoPerfilUrl)
    VALUES 
    ('Ana García', 'ana_g', 'pass1234', 'ana@email.com', 'activo', 'admin', 'https://res.cloudinary.com/duuqqcbod/image/upload/v1779028526/knrmqyzgdlxbhhrc7yiu.jpg'),
    ('Pedro Martínez', 'pedro_dev', 'claveSegura', 'pedro@email.com', 'activo', 'user', 'https://res.cloudinary.com/duuqqcbod/image/upload/v1779028526/knrmqyzgdlxbhhrc7yiu.jpg'),
    ('Lucía Fernández', 'lucia_art', 'arte2024', 'lucia@email.com', 'suspendido', 'user', 'https://res.cloudinary.com/duuqqcbod/image/upload/v1779028526/knrmqyzgdlxbhhrc7yiu.jpg');
END
GO

IF NOT EXISTS (SELECT TOP 1 1 FROM Curso)
BEGIN
    INSERT INTO Curso (titulo, descripcion, categoria, nivel, precio, docUrl)
    VALUES 
    ('Python para Principiantes', 'Domina los fundamentos de la programación con Python.', 'Programación', 'Básico', 15.50, 'https://res.cloudinary.com/duuqqcbod/raw/upload/v1779018791/g0o6qyvuw6ghqopxcgnh.pdf'),
    ('Fotografía Profesional', 'Aprende iluminación y composición avanzada.', 'Arte', 'Avanzado', 45.00, 'https://res.cloudinary.com/duuqqcbod/raw/upload/v1779018791/g0o6qyvuw6ghqopxcgnh.pdf'),
    ('Marketing Digital 360', 'Estrategias de SEO, SEM y Redes Sociales.', 'Necios', 'Intermedio', 29.99, 'https://res.cloudinary.com/duuqqcbod/raw/upload/v1779018791/g0o6qyvuw6ghqopxcgnh.pdf');
END
GO

IF NOT EXISTS (SELECT TOP 1 1 FROM Leccion)
BEGIN
    INSERT INTO Leccion (curso_id, titulo, contenido_url, duracion_min, descripcion)
    VALUES 
    (1, 'Instalación de Python', 'video_url_1', 10, 'Configurando el entorno en Windows y Mac'),
    (1, 'Variables y Tipos de Datos', 'video_url_2', 25, 'Entendiendo int, string y float'),
    (1, 'Bucles y Condicionales', 'video_url_3', 30, 'Uso de If, For y While'),
    (2, 'La regla de los tercios', 'video_url_4', 15, 'Composición básica'),
    (2, 'Iluminación de estudio', 'video_url_5', 45, 'Configuración de softbox y luces'),
    (3, 'Introducción al SEO', 'video_url_6', 20, 'Posicionamiento orgánico');
END
GO

IF NOT EXISTS (SELECT TOP 1 1 FROM Pago)
BEGIN
    INSERT INTO Pago (usuario_id, curso_id, cantidad, nombre_titular, numero_titular, cvv)
    VALUES 
    (1, 1, 15.50, 'Ana García', '4000123456789010', '123'),
    (1, 3, 29.99, 'Ana García', '4000123456789010', '123'),
    (2, 2, 45.00, 'Pedro Martínez', '5000987654321098', '999');
END
GO

IF NOT EXISTS (SELECT TOP 1 1 FROM Inscripcion)
BEGIN
    INSERT INTO Inscripcion (usuario_id, curso_id, progreso_porcentaje, estado)
    VALUES 
    (1, 1, 100.00, 'completado'),
    (1, 3, 15.50, 'cursando'),
    (2, 2, 50.00, 'cursando');
END
GO

IF NOT EXISTS (SELECT TOP 1 1 FROM Resena)
BEGIN
    INSERT INTO Resena (usuario_id, curso_id, calificacion, comentario)
    VALUES 
    (1, 1, 5, 'Excelente curso, muy bien explicado para principiantes.'),
    (2, 2, 3, 'Buen contenido, pero el audio de los videos es bajo.');
END
GO