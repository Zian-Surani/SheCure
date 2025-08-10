-- Create admin users using the existing edge function approach
-- First, ensure we have some test user IDs to work with
DO $$
DECLARE
    test_admin_1_id uuid := '11111111-1111-1111-1111-111111111111';
    test_admin_2_id uuid := '22222222-2222-2222-2222-222222222222';
BEGIN
    -- Insert user roles for admin users (these will be updated by the edge function)
    INSERT INTO public.user_roles (user_id, role, created_by)
    VALUES 
        (test_admin_1_id, 'admin', test_admin_1_id),
        (test_admin_2_id, 'admin', test_admin_2_id)
    ON CONFLICT (user_id, role) DO NOTHING;
    
    -- Insert profiles for admin users (these will be updated by the edge function)
    INSERT INTO public.profiles (user_id, full_name, role, ngo_name)
    VALUES 
        (test_admin_1_id, 'Zian Surani', 'admin', 'SheCure'),
        (test_admin_2_id, 'Vaishnavi Soni', 'admin', 'SheCure')
    ON CONFLICT (user_id) DO UPDATE SET 
        role = EXCLUDED.role,
        full_name = EXCLUDED.full_name;
END $$;