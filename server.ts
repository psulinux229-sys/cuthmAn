import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Lazy initialize Supabase client
  let supabaseClient: ReturnType<typeof createClient> | null = null;

  function getSupabase() {
    if (!supabaseClient) {
      const url = process.env.SUPABASE_URL;
      const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
      if (!url || !key) {
        throw new Error("SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY environment variables are required");
      }
      supabaseClient = createClient(url, key);
    }
    return supabaseClient;
  }

  // API Routes
  app.get("/api/goals", async (req, res) => {
    try {
      const supabase = getSupabase();
      const userId = req.headers['x-user-id'] || '00000000-0000-0000-0000-000000000000';
      
      const { data, error } = await supabase
        .from('goals')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) {
        // Handle specific table missing error
        if (error.code === 'PGRST116' || error.message.includes('not found') || error.message.includes('relation') || error.message.includes('schema cache')) {
          return res.status(404).json({ 
            error: "Database table 'goals' not found.", 
            code: 'MISSING_TABLE',
            details: "Please run the SQL schema in your Supabase SQL Editor." 
          });
        }
        throw error;
      }
      res.json(data || []);
    } catch (error: any) {
      console.error("Fetch goals error:", error.message);
      
      const isMissingConfig = error.message.includes("required");
      res.status(isMissingConfig ? 503 : 500).json({ 
        error: isMissingConfig ? "Supabase credentials missing" : error.message,
        code: isMissingConfig ? 'MISSING_CONFIG' : 'SERVER_ERROR'
      });
    }
  });

  app.post("/api/goals", async (req, res) => {
    try {
      const supabase = getSupabase();
      const userId = req.headers['x-user-id'] || '00000000-0000-0000-0000-000000000000';
      const goal = req.body;

      const { data, error } = await supabase
        .from('goals')
        .upsert({ 
          ...goal, 
          user_id: userId,
          updated_at: new Date().toISOString() 
        }, { onConflict: 'id' })
        .select()
        .single();

      if (error) throw error;
      res.json(data);
    } catch (error: any) {
      console.error("Save goal error:", error.message);
      res.status(500).json({ error: error.message });
    }
  });

  app.delete("/api/goals/:id", async (req, res) => {
    try {
      const supabase = getSupabase();
      const userId = req.headers['x-user-id'] || '00000000-0000-0000-0000-000000000000';
      
      const { error } = await supabase
        .from('goals')
        .delete()
        .eq('id', req.params.id)
        .eq('user_id', userId);

      if (error) throw error;
      res.json({ success: true });
    } catch (error: any) {
      console.error("Delete goal error:", error.message);
      res.status(500).json({ error: error.message });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
