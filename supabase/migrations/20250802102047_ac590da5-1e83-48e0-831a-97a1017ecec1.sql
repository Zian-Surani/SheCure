-- Insert sample doctors
INSERT INTO public.doctors (name, specialization, phone, location, available_days) VALUES
('Dr. Priya Nair', 'Gynecologist', '+91 98765 11111', 'Itarsi, Madhya Pradesh', ARRAY['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']),
('Dr. Amit Sharma', 'Pediatrician', '+91 98765 22222', 'Itarsi, Madhya Pradesh', ARRAY['Monday', 'Wednesday', 'Friday']),
('Dr. Kavya Reddy', 'General Physician', '+91 98765 33333', 'Itarsi, Madhya Pradesh', ARRAY['Tuesday', 'Thursday', 'Saturday']),
('Dr. Ravi Kumar', 'Child Specialist', '+91 98765 44444', 'Itarsi, Madhya Pradesh', ARRAY['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']),
('Dr. Sunita Patel', 'Maternal Health Expert', '+91 98765 55555', 'Itarsi, Madhya Pradesh', ARRAY['Monday', 'Wednesday', 'Friday', 'Saturday']);

-- Insert sample patients (using fixed user IDs for consistency)
INSERT INTO public.patients (name, age, phone, address, location, condition, status, created_by) VALUES
('Priya Sharma', 28, '+91 98765 43210', 'House No. 123, Sector 5, Itarsi', 'Itarsi, Madhya Pradesh', 'Prenatal Care - 32 weeks', 'active', '00000000-0000-0000-0000-000000000001'),
('Aadhya Patel', 5, '+91 87654 32109', 'Village Khargone, Near School', 'Khargone, Madhya Pradesh', 'Growth Monitoring', 'active', '00000000-0000-0000-0000-000000000001'),
('Kavya Reddy', 32, '+91 76543 21098', 'Flat 201, Sunrise Apartments', 'Itarsi, Madhya Pradesh', 'Postpartum Care - 6 weeks', 'critical', '00000000-0000-0000-0000-000000000001'),
('Ananya Singh', 3, '+91 65432 10987', 'House No. 45, Gandhi Nagar', 'Itarsi, Madhya Pradesh', 'Vaccination Schedule', 'active', '00000000-0000-0000-0000-000000000001'),
('Meera Gupta', 25, '+91 54321 09876', 'Village Pandhana', 'Pandhana, Madhya Pradesh', 'Maternal Health Checkup', 'active', '00000000-0000-0000-0000-000000000001'),
('Lakshmi Nair', 7, '+91 43210 98765', 'Near Bus Stand, Main Road', 'Itarsi, Madhya Pradesh', 'Nutritional Assessment', 'inactive', '00000000-0000-0000-0000-000000000001'),
('Deepika Joshi', 30, '+91 32109 87654', 'Colony Road, House No. 67', 'Itarsi, Madhya Pradesh', 'Family Planning Consultation', 'active', '00000000-0000-0000-0000-000000000001'),
('Sanya Agarwal', 2, '+91 21098 76543', 'Shivaji Nagar, Lane 3', 'Itarsi, Madhya Pradesh', 'Developmental Screening', 'active', '00000000-0000-0000-0000-000000000001');

-- Insert sample appointments
INSERT INTO public.appointments (patient_id, doctor_id, appointment_date, appointment_time, notes, status, created_by) 
SELECT 
    p.id,
    d.id,
    '2025-02-05'::date,
    '10:00:00'::time,
    'Regular checkup',
    'scheduled',
    '00000000-0000-0000-0000-000000000001'
FROM patients p, doctors d 
WHERE p.name = 'Priya Sharma' AND d.name = 'Dr. Priya Nair'
LIMIT 1;

INSERT INTO public.appointments (patient_id, doctor_id, appointment_date, appointment_time, notes, status, created_by) 
SELECT 
    p.id,
    d.id,
    '2025-02-06'::date,
    '14:30:00'::time,
    'Vaccination due',
    'scheduled',
    '00000000-0000-0000-0000-000000000001'
FROM patients p, doctors d 
WHERE p.name = 'Aadhya Patel' AND d.name = 'Dr. Amit Sharma'
LIMIT 1;

INSERT INTO public.appointments (patient_id, doctor_id, appointment_date, appointment_time, notes, status, created_by) 
SELECT 
    p.id,
    d.id,
    '2025-02-04'::date,
    '09:00:00'::time,
    'Urgent postpartum follow-up',
    'confirmed',
    '00000000-0000-0000-0000-000000000001'
FROM patients p, doctors d 
WHERE p.name = 'Kavya Reddy' AND d.name = 'Dr. Sunita Patel'
LIMIT 1;

-- Insert sample health updates
INSERT INTO public.health_updates (patient_id, update_date, symptoms, vital_signs, prescribed_medicine, dosage_instructions, notes, next_checkup, created_by)
SELECT 
    p.id,
    '2025-01-28'::date,
    'No complications, normal pregnancy progression',
    '{"blood_pressure": "120/80", "weight": "68kg", "temperature": "98.6F", "heart_rate": "72bpm"}'::jsonb,
    'Prenatal vitamins, Iron supplements',
    'Take one prenatal vitamin daily with food, Iron supplement twice daily',
    'Patient shows excellent progress. Baby development is normal.',
    '2025-02-05'::date,
    '00000000-0000-0000-0000-000000000001'
FROM patients p 
WHERE p.name = 'Priya Sharma'
LIMIT 1;

INSERT INTO public.health_updates (patient_id, update_date, symptoms, vital_signs, prescribed_medicine, dosage_instructions, notes, next_checkup, created_by)
SELECT 
    p.id,
    '2025-01-25'::date,
    'Mild hypertension, some fatigue',
    '{"blood_pressure": "140/90", "weight": "72kg", "temperature": "99.2F", "heart_rate": "88bpm"}'::jsonb,
    'Blood pressure medication, Rest',
    'Take BP medication twice daily, complete bed rest for 1 week',
    'Monitor blood pressure closely. Signs of postpartum hypertension.',
    '2025-02-01'::date,
    '00000000-0000-0000-0000-000000000001'
FROM patients p 
WHERE p.name = 'Kavya Reddy'
LIMIT 1;