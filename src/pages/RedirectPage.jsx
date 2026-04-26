import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../lib/supabase";

export function RedirectPage() {
    const { shortCode } = useParams();

useEffect(() => {
    const fetchLink = async () => {
        const { data, error } = await supabase
        .from("links")
        .select("*")
        .eq("short_code", shortCode)
        .single();

        console.log("shortCode:", shortCode);
        console.log("data:", data);
        console.log("error:", error);

        if (error || !data) {
            alert("Link not found");
            return;
        }

        // update clicks
        await supabase
        .from("links")
        .update({ clicks: data.clicks + 1 })
        .eq("id", data.id);

        // redirect
        window.location.replace(data.original_url);
        console.log("shortCode from URL:", shortCode);
    };

    fetchLink();
    }, [shortCode]);


    return (
        <div 
            className="min-h-screen flex items-center justify-center text-white bg-black flex-col">
            <img src="/Miraly logo.png" 
                alt="miraly-logo" 
                className="w-16 h-16 mb-4 animate-pulse" 
            />
            Redirecting...
        </div>
    );
}