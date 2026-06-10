GRANT SELECT, INSERT, UPDATE, DELETE ON public.access_requests TO authenticated;
GRANT INSERT ON public.access_requests TO anon;
GRANT ALL ON public.access_requests TO service_role;

GRANT SELECT ON public.agents TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.agents TO authenticated;
GRANT ALL ON public.agents TO service_role;

GRANT SELECT ON public.app_settings TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.app_settings TO authenticated;
GRANT ALL ON public.app_settings TO service_role;

GRANT SELECT, INSERT, UPDATE, DELETE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;

GRANT SELECT, INSERT, UPDATE, DELETE ON public.access_codes TO authenticated;
GRANT ALL ON public.access_codes TO service_role;

GRANT SELECT, INSERT, UPDATE, DELETE ON public.access_code_usage TO authenticated;
GRANT ALL ON public.access_code_usage TO service_role;

GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;

GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.admin_exists() TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.claim_admin() TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.redeem_access_code(text) TO anon, authenticated, service_role;