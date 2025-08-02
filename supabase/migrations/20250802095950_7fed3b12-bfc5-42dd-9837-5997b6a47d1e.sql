-- Create user profiles table for NGO employees
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'employee',
  ngo_name TEXT DEFAULT 'SheCure',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create doctors table
CREATE TABLE public.doctors (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  specialization TEXT NOT NULL,
  location TEXT NOT NULL DEFAULT 'Itarsi, Madhya Pradesh',
  phone TEXT,
  available_days TEXT[] DEFAULT ARRAY['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create patients table
CREATE TABLE public.patients (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  age INTEGER NOT NULL,
  aadhar_number TEXT UNIQUE,
  address TEXT NOT NULL,
  phone TEXT NOT NULL,
  location TEXT NOT NULL DEFAULT 'Itarsi, Madhya Pradesh',
  condition TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'critical')),
  created_by UUID REFERENCES public.profiles(user_id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create appointments table
CREATE TABLE public.appointments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  patient_id UUID NOT NULL REFERENCES public.patients(id) ON DELETE CASCADE,
  doctor_id UUID NOT NULL REFERENCES public.doctors(id) ON DELETE CASCADE,
  appointment_date DATE NOT NULL,
  appointment_time TIME NOT NULL,
  status TEXT DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'completed', 'cancelled')),
  notes TEXT,
  created_by UUID REFERENCES public.profiles(user_id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create patient records table
CREATE TABLE public.patient_records (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  patient_id UUID NOT NULL REFERENCES public.patients(id) ON DELETE CASCADE,
  record_type TEXT NOT NULL,
  file_name TEXT,
  file_url TEXT,
  description TEXT,
  uploaded_by UUID REFERENCES public.profiles(user_id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create health updates table
CREATE TABLE public.health_updates (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  patient_id UUID NOT NULL REFERENCES public.patients(id) ON DELETE CASCADE,
  update_date DATE NOT NULL DEFAULT CURRENT_DATE,
  vital_signs JSONB,
  symptoms TEXT,
  prescribed_medicine TEXT,
  dosage_instructions TEXT,
  next_checkup DATE,
  notes TEXT,
  created_by UUID REFERENCES public.profiles(user_id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.doctors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.patient_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.health_updates ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
CREATE POLICY "Users can view their own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" 
ON public.profiles 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Create RLS policies for doctors (all authenticated users can view)
CREATE POLICY "Authenticated users can view doctors" 
ON public.doctors 
FOR SELECT 
TO authenticated 
USING (true);

-- Create RLS policies for patients
CREATE POLICY "Authenticated users can view all patients" 
ON public.patients 
FOR SELECT 
TO authenticated 
USING (true);

CREATE POLICY "Authenticated users can create patients" 
ON public.patients 
FOR INSERT 
TO authenticated 
WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Authenticated users can update patients" 
ON public.patients 
FOR UPDATE 
TO authenticated 
USING (true);

-- Create RLS policies for appointments
CREATE POLICY "Authenticated users can view all appointments" 
ON public.appointments 
FOR SELECT 
TO authenticated 
USING (true);

CREATE POLICY "Authenticated users can create appointments" 
ON public.appointments 
FOR INSERT 
TO authenticated 
WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Authenticated users can update appointments" 
ON public.appointments 
FOR UPDATE 
TO authenticated 
USING (true);

-- Create RLS policies for patient records
CREATE POLICY "Authenticated users can view all patient records" 
ON public.patient_records 
FOR SELECT 
TO authenticated 
USING (true);

CREATE POLICY "Authenticated users can create patient records" 
ON public.patient_records 
FOR INSERT 
TO authenticated 
WITH CHECK (auth.uid() = uploaded_by);

-- Create RLS policies for health updates
CREATE POLICY "Authenticated users can view all health updates" 
ON public.health_updates 
FOR SELECT 
TO authenticated 
USING (true);

CREATE POLICY "Authenticated users can create health updates" 
ON public.health_updates 
FOR INSERT 
TO authenticated 
WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Authenticated users can update health updates" 
ON public.health_updates 
FOR UPDATE 
TO authenticated 
USING (true);

-- Create function to handle new user profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', 'NGO Employee'),
    'employee'
  );
  RETURN NEW;
END;
$$;

-- Create trigger for automatic profile creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for timestamp updates
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_patients_updated_at
  BEFORE UPDATE ON public.patients
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample doctors
INSERT INTO public.doctors (name, specialization, location, phone) VALUES
('Dr. Priya Sharma', 'General Medicine', 'Itarsi, Madhya Pradesh', '+91 98765 43210'),
('Dr. Rajesh Kumar', 'Pediatrics', 'Itarsi, Madhya Pradesh', '+91 87654 32109'),
('Dr. Sunita Patel', 'Gynecology', 'Itarsi, Madhya Pradesh', '+91 76543 21098'),
('Dr. Amit Singh', 'Cardiology', 'Itarsi, Madhya Pradesh', '+91 65432 10987'),
('Dr. Kavita Reddy', 'Dermatology', 'Itarsi, Madhya Pradesh', '+91 54321 09876');