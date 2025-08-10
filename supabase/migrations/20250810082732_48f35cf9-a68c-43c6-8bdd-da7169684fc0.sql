-- Create admin users directly in auth.users and assign roles
-- First admin user: zian.surani@gmail.com
INSERT INTO auth.users (
  id,
  instance_id,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  raw_app_meta_data,
  raw_user_meta_data,
  is_super_admin,
  role
) VALUES (
  gen_random_uuid(),
  '00000000-0000-0000-0000-000000000000',
  'zian.surani@gmail.com',
  crypt('shecure@123', gen_salt('bf')),
  now(),
  now(),
  now(),
  '{"provider":"email","providers":["email"]}',
  '{"full_name":"Zian Surani"}',
  false,
  'authenticated'
) ON CONFLICT (email) DO NOTHING;

-- Second admin user: vaishnavisoni1209@gmail.com
INSERT INTO auth.users (
  id,
  instance_id,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  raw_app_meta_data,
  raw_user_meta_data,
  is_super_admin,
  role
) VALUES (
  gen_random_uuid(),
  '00000000-0000-0000-0000-000000000000',
  'vaishnavisoni1209@gmail.com',
  crypt('shecure@123', gen_salt('bf')),
  now(),
  now(),
  now(),
  '{"provider":"email","providers":["email"]}',
  '{"full_name":"Vaishnavi Soni"}',
  false,
  'authenticated'
) ON CONFLICT (email) DO NOTHING;

-- Create profiles for both users (using the trigger that should fire automatically)
-- But let's also ensure they exist
DO $$
DECLARE
    zian_user_id uuid;
    vaishnavi_user_id uuid;
BEGIN
    -- Get user IDs
    SELECT id INTO zian_user_id FROM auth.users WHERE email = 'zian.surani@gmail.com';
    SELECT id INTO vaishnavi_user_id FROM auth.users WHERE email = 'vaishnavisoni1209@gmail.com';
    
    -- Insert profiles if they don't exist
    INSERT INTO public.profiles (user_id, full_name, role)
    VALUES (zian_user_id, 'Zian Surani', 'admin')
    ON CONFLICT (user_id) DO UPDATE SET role = 'admin';
    
    INSERT INTO public.profiles (user_id, full_name, role)
    VALUES (vaishnavi_user_id, 'Vaishnavi Soni', 'admin')
    ON CONFLICT (user_id) DO UPDATE SET role = 'admin';
    
    -- Insert user roles
    INSERT INTO public.user_roles (user_id, role)
    VALUES (zian_user_id, 'admin')
    ON CONFLICT (user_id, role) DO NOTHING;
    
    INSERT INTO public.user_roles (user_id, role)
    VALUES (vaishnavi_user_id, 'admin')
    ON CONFLICT (user_id, role) DO NOTHING;
END $$;