/*
  # Add user_id column and update RLS policies

  1. Changes
    - Add user_id column to members table
    - Update RLS policies to enforce user ownership
  
  2. Security
    - Users can only see and modify their own records
    - user_id is required and must match the authenticated user
*/

-- Add user_id column
ALTER TABLE members 
ADD COLUMN user_id uuid REFERENCES auth.users(id) NOT NULL;

-- Drop existing policies
DROP POLICY IF EXISTS "Allow insert for authenticated users" ON members;
DROP POLICY IF EXISTS "Allow select for authenticated users" ON members;

-- Create new policies
CREATE POLICY "Users can insert their own records" ON members
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own records" ON members
  FOR SELECT TO authenticated
  USING (auth.uid() = user_id);