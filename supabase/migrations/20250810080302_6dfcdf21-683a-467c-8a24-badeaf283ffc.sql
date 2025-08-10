-- Call the seed-admins edge function to create admin users
SELECT 
  CASE 
    WHEN (SELECT count(*) FROM user_roles WHERE role = 'admin') = 0 THEN
      'Admin seeding needed'
    ELSE 
      'Admins already exist'
  END as status;