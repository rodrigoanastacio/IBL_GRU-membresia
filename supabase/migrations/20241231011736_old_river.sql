/*
  # Create members table

  1. New Tables
    - `members`
      - `id` (uuid, primary key)
      - `full_name` (text)
      - `birth_date` (date)
      - `baptism_date` (date)
      - `baptism_church` (text)
      - `phone` (text)
      - `email` (text)
      - `cep` (text)
      - `street` (text)
      - `number` (text)
      - `complement` (text)
      - `neighborhood` (text)
      - `city` (text)
      - `state` (text)
      - `profession` (text)
      - `marital_status` (text)
      - `pastoral_interviewer` (text)
      - `belongs_to_gc` (boolean)
      - `wants_to_volunteer` (boolean)
      - `created_at` (timestamptz)
      - `user_id` (uuid, references auth.users)

  2. Security
    - Enable RLS on `members` table
    - Add policies for authenticated users to:
      - Create their own records
      - Read their own records
*/

CREATE TABLE members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  birth_date date NOT NULL,
  baptism_date date NOT NULL,
  baptism_church text NOT NULL,
  phone text NOT NULL,
  email text NOT NULL,
  cep text NOT NULL,
  street text NOT NULL,
  number text NOT NULL,
  complement text,
  neighborhood text NOT NULL,
  city text NOT NULL,
  state text NOT NULL,
  profession text NOT NULL,
  marital_status text NOT NULL,
  pastoral_interviewer text NOT NULL,
  belongs_to_gc boolean DEFAULT false,
  wants_to_volunteer boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  user_id uuid REFERENCES auth.users NOT NULL
);

ALTER TABLE members ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can create their own records"
  ON members
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can read their own records"
  ON members
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);