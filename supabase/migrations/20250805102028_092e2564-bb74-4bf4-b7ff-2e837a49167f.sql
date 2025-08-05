-- Create medical history table for patient records
CREATE TABLE public.medical_history (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  patient_id TEXT NOT NULL,
  patient_name TEXT NOT NULL,
  visit_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  diagnosis TEXT,
  treatment TEXT,
  prescription TEXT,
  doctor_notes TEXT,
  vitals JSONB DEFAULT '{}',
  follow_up_date DATE,
  severity TEXT CHECK (severity IN ('low', 'medium', 'high', 'critical')) DEFAULT 'low',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.medical_history ENABLE ROW LEVEL SECURITY;

-- Create policies for medical history access
CREATE POLICY "Medical history is viewable by authenticated users" 
ON public.medical_history 
FOR SELECT 
USING (auth.role() = 'authenticated');

CREATE POLICY "Medical history can be created by authenticated users" 
ON public.medical_history 
FOR INSERT 
WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Medical history can be updated by authenticated users" 
ON public.medical_history 
FOR UPDATE 
USING (auth.role() = 'authenticated');

-- Create indexes for better performance
CREATE INDEX idx_medical_history_patient_id ON public.medical_history(patient_id);
CREATE INDEX idx_medical_history_visit_date ON public.medical_history(visit_date DESC);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
NEW.updated_at = now();
RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_medical_history_updated_at
BEFORE UPDATE ON public.medical_history
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample medical history data
INSERT INTO public.medical_history (patient_id, patient_name, visit_date, diagnosis, treatment, prescription, doctor_notes, vitals, follow_up_date, severity) VALUES
('priya-001', 'Priya Sharma', '2024-01-28', 'Prenatal Care - 32 weeks', 'Regular monitoring, nutritional counseling', 'Prenatal vitamins, Iron supplements', 'Patient shows excellent progress. Baby growth is normal. Continue current medications.', '{"blood_pressure": "120/80", "weight": "68kg", "temperature": "98.6F", "heart_rate": "72bpm"}', '2024-02-05', 'low'),
('priya-001', 'Priya Sharma', '2024-01-14', 'Prenatal Care - 30 weeks', 'Routine checkup, ultrasound', 'Folic acid, Calcium', 'Normal fetal development. Blood pressure slightly elevated, monitoring required.', '{"blood_pressure": "125/85", "weight": "66kg", "temperature": "98.4F", "heart_rate": "75bpm"}', '2024-01-28', 'medium'),
('kavya-002', 'Kavya Reddy', '2024-01-25', 'Postpartum hypertension', 'Blood pressure monitoring, medication adjustment', 'Antihypertensive medication, Diuretics', 'Blood pressure elevated. Requires close monitoring. Patient educated about warning signs.', '{"blood_pressure": "140/90", "weight": "72kg", "temperature": "99.2F", "heart_rate": "88bpm"}', '2024-02-01', 'high'),
('kavya-002', 'Kavya Reddy', '2024-01-10', 'Postpartum Care - 2 weeks', 'Wound healing assessment, general checkup', 'Pain medication, Antibiotics (completed)', 'Healing well. Some concerns about blood pressure elevation.', '{"blood_pressure": "135/88", "weight": "74kg", "temperature": "98.8F", "heart_rate": "82bpm"}', '2024-01-25', 'medium'),
('aadhya-003', 'Aadhya Patel', '2024-01-26', 'Growth Monitoring', 'Height and weight assessment, nutritional guidance', 'Multivitamins, Growth supplements', 'Child showing normal development. Slightly underweight, nutritional plan provided.', '{"height": "105cm", "weight": "16kg", "temperature": "98.2F", "heart_rate": "95bpm"}', '2024-02-26', 'low'),
('meera-004', 'Meera Singh', '2024-01-22', 'Prenatal Care - 28 weeks', 'Routine prenatal visit, glucose screening', 'Prenatal vitamins, Glucose tolerance test ordered', 'Pregnancy progressing normally. Glucose screening scheduled for next visit.', '{"blood_pressure": "118/78", "weight": "62kg", "temperature": "98.5F", "heart_rate": "68bpm"}', '2024-02-05', 'low');