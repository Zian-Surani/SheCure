-- Insert sample patients data
INSERT INTO public.patients (name, age, phone, address, condition, location, status, created_by) VALUES
('Priya Sharma', 28, '+91-9876543210', 'Block A, Sector 15, Noida', 'Prenatal Care - 32 weeks', 'Itarsi, Madhya Pradesh', 'active', '00000000-0000-0000-0000-000000000000'),
('Kavya Reddy', 24, '+91-9876543211', 'Lane 5, MG Road, Bangalore', 'Postpartum hypertension', 'Itarsi, Madhya Pradesh', 'critical', '00000000-0000-0000-0000-000000000000'),
('Aadhya Patel', 5, '+91-9876543212', 'Plot 12, Gandhi Nagar, Ahmedabad', 'Regular checkup', 'Itarsi, Madhya Pradesh', 'active', '00000000-0000-0000-0000-000000000000'),
('Meera Singh', 31, '+91-9876543213', 'House 8, Civil Lines, Lucknow', 'Prenatal Care - 28 weeks', 'Itarsi, Madhya Pradesh', 'active', '00000000-0000-0000-0000-000000000000'),
('Anita Gupta', 26, '+91-9876543214', 'Flat 4B, Park Street, Kolkata', 'Postpartum care', 'Itarsi, Madhya Pradesh', 'active', '00000000-0000-0000-0000-000000000000'),
('Riya Joshi', 8, '+91-9876543215', 'Bungalow 15, Banjara Hills, Hyderabad', 'Vaccination due', 'Itarsi, Madhya Pradesh', 'active', '00000000-0000-0000-0000-000000000000'),
('Sunita Devi', 29, '+91-9876543216', 'Village Road, Patna', 'High-risk pregnancy', 'Itarsi, Madhya Pradesh', 'critical', '00000000-0000-0000-0000-000000000000'),
('Pooja Verma', 3, '+91-9876543217', 'Society 7, Pune', 'Child wellness checkup', 'Itarsi, Madhya Pradesh', 'active', '00000000-0000-0000-0000-000000000000');

-- Insert sample appointments
INSERT INTO public.appointments (patient_id, doctor_id, appointment_date, appointment_time, notes, status, created_by) VALUES
((SELECT id FROM patients WHERE name = 'Priya Sharma'), '00000000-0000-0000-0000-000000000001', '2024-02-05', '10:00:00', 'Routine prenatal checkup', 'scheduled', '00000000-0000-0000-0000-000000000000'),
((SELECT id FROM patients WHERE name = 'Kavya Reddy'), '00000000-0000-0000-0000-000000000001', '2024-02-02', '14:30:00', 'Emergency consultation for hypertension', 'completed', '00000000-0000-0000-0000-000000000000'),
((SELECT id FROM patients WHERE name = 'Aadhya Patel'), '00000000-0000-0000-0000-000000000001', '2024-02-08', '11:00:00', 'Vaccination and growth assessment', 'scheduled', '00000000-0000-0000-0000-000000000000');

-- Insert sample health updates
INSERT INTO public.health_updates (patient_id, symptoms, vital_signs, prescribed_medicine, dosage_instructions, notes, next_checkup, created_by) VALUES
((SELECT id FROM patients WHERE name = 'Priya Sharma'), 'Mild fatigue, occasional nausea', '{"blood_pressure": "120/80", "weight": "68kg", "temperature": "98.6F", "heart_rate": "72bpm"}', 'Prenatal vitamins, Iron supplements', 'Take with food twice daily', 'Patient shows excellent progress. Baby development is normal.', '2024-02-12', '00000000-0000-0000-0000-000000000000'),
((SELECT id FROM patients WHERE name = 'Kavya Reddy'), 'Severe headache, blurred vision', '{"blood_pressure": "160/100", "weight": "62kg", "temperature": "99.2F", "heart_rate": "88bpm"}', 'Antihypertensive medication', 'Take as prescribed, monitor BP daily', 'Requires immediate monitoring for postpartum preeclampsia.', '2024-02-03', '00000000-0000-0000-0000-000000000000'),
((SELECT id FROM patients WHERE name = 'Aadhya Patel'), 'No symptoms, routine checkup', '{"height": "110cm", "weight": "18kg", "temperature": "98.4F", "heart_rate": "95bpm"}', 'Multivitamins', 'One tablet daily after breakfast', 'Healthy child, growth on track for age.', '2024-03-15', '00000000-0000-0000-0000-000000000000');