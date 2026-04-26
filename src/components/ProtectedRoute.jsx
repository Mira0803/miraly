import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { supabase } from "../lib/supabase";

export function ProtectedRoute({ children }) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const checkUser = async () => {
        const { data } = await supabase.auth.getUser();

        if (!data.user) {
          navigate("/login");
        } else {
          setLoading(false);
        }
      };

      checkUser();

      const { data: listener } = supabase.auth.onAuthStateChange(
        (_event, session) => {
          if (!session?.user) {
            navigate("/login");
          }
        }
      );

      return () => {
        listener.subscription.unsubscribe();
      };
      
      
    }, [navigate]);

    if (loading) 
      return <div className="text-white p-10">Loading...</div>;

  return children;
}