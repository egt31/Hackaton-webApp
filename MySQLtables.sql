-- Table for Services
CREATE TABLE Services (
    service_id INT AUTO_INCREMENT PRIMARY KEY,
    service_name VARCHAR(100),
    service_code VARCHAR(10)
);

-- Table for Students
CREATE TABLE Students (
    student_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    email VARCHAR(100),
    studentID VARCHAR(20),
    chosen_service_id INT,
    appointment_date DATE,
    FOREIGN KEY (chosen_service_id) REFERENCES Services(service_id)
);


-- Services
INSERT INTO Services (service_name, service_code) VALUES
    ('Statement of Grades', 'SOG'),
    ('ID Procurement', 'IDP'),
    ('Grade Verification', 'GV');