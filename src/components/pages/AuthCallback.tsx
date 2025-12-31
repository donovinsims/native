import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";

export default function AuthCallback() {
    const navigate = useNavigate();

    useEffect(() => {
        // Handle the code exchange
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (session) {
                navigate("/");
            } else {
                // If no session is found, check specifically for hash fragments if using implicit flow
                // or just redirect home which will handle state check
                navigate("/");
            }
        });

        // Also listen for auth state changes which might trigger after implicit exchange
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            if (event === 'SIGNED_IN' && session) {
                navigate("/");
            }
        });

        return () => {
            subscription.unsubscribe();
        };
    }, [navigate]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-page">
            <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-secondary">Completing sign in...</p>
            </div>
        </div>
    );
}
