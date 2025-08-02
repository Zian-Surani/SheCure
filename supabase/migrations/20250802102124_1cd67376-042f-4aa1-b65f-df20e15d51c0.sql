-- Insert sample doctors
INSERT INTO public.doctors (name, specialization, phone, location, available_days) VALUES
('Dr. Priya Nair', 'Gynecologist', '+91 98765 11111', 'Itarsi, Madhya Pradesh', ARRAY['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']),
('Dr. Amit Sharma', 'Pediatrician', '+91 98765 22222', 'Itarsi, Madhya Pradesh', ARRAY['Monday', 'Wednesday', 'Friday']),
('Dr. Kavya Reddy', 'General Physician', '+91 98765 33333', 'Itarsi, Madhya Pradesh', ARRAY['Tuesday', 'Thursday', 'Saturday']),
('Dr. Ravi Kumar', 'Child Specialist', '+91 98765 44444', 'Itarsi, Madhya Pradesh', ARRAY['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']),
('Dr. Sunita Patel', 'Maternal Health Expert', '+91 98765 55555', 'Itarsi, Madhya Pradesh', ARRAY['Monday', 'Wednesday', 'Friday', 'Saturday']);

-- Insert sample patients (without created_by foreign key for now)
INSERT INTO public.patients (name, age, phone, address, location, condition, status) VALUES
('Priya Sharma', 28, '+91 98765 43210', 'House No. 123, Sector 5, Itarsi', 'Itarsi, Madhya Pradesh', 'Prenatal Care - 32 weeks', 'active'),
('Aadhya Patel', 5, '+91 87654 32109', 'Village Khargone, Near School', 'Khargone, Madhya Pradesh', 'Growth Monitoring', 'active'),
('Kavya Reddy', 32, '+91 76543 21098', 'Flat 201, Sunrise Apartments', 'Itarsi, Madhya Pradesh', 'Postpartum Care - 6 weeks', 'critical'),
('Ananya Singh', 3, '+91 65432 10987', 'House No. 45, Gandhi Nagar', 'Itarsi, Madhya Pradesh', 'Vaccination Schedule', 'active'),
('Meera Gupta', 25, '+91 54321 09876', 'Village Pandhana', 'Pandhana, Madhya Pradesh', 'Maternal Health Checkup', 'active'),
('Lakshmi Nair', 7, '+91 43210 98765', 'Near Bus Stand, Main Road', 'Itarsi, Madhya Pradesh', 'Nutritional Assessment', 'inactive'),
('Deepika Joshi', 30, '+91 32109 87654', 'Colony Road, House No. 67', 'Itarsi, Madhya Pradesh', 'Family Planning Consultation', 'active'),
('Sanya Agarwal', 2, '+91 21098 76543', 'Shivaji Nagar, Lane 3', 'Itarsi, Madhya Pradesh', 'Developmental Screening', 'active');