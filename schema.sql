-- Create the goals table with UUID types for better validation
CREATE TABLE IF NOT EXISTS public.goals (
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    category TEXT,
    due_date TEXT,
    target_date TEXT,
    progress INTEGER DEFAULT 0,
    status TEXT DEFAULT 'active',
    milestones JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.goals ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows users to see only their own goals
-- Handles both authenticated users via Supabase Auth and the demo bypass IDs
CREATE POLICY "Users can see their own goals" 
ON public.goals 
FOR ALL 
USING (
    auth.uid() = user_id 
    OR user_id = '00000000-0000-0000-0000-000000000000'::uuid 
    OR user_id = '00000000-0000-0000-0000-000000000001'::uuid
);
