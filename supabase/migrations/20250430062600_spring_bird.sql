/*
  # Create executions history table

  1. New Tables
    - `code_executions`
      - `id` (uuid, primary key)
      - `code` (text, the submitted code)
      - `language` (text, programming language)
      - `output` (text, execution output)
      - `execution_time` (integer, in milliseconds)
      - `memory_usage` (integer, in KB)
      - `status` (text, execution status)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `code_executions` table
    - Add policy for public read access
*/

CREATE TABLE IF NOT EXISTS code_executions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text NOT NULL,
  language text NOT NULL,
  output text,
  execution_time integer,
  memory_usage integer,
  status text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE code_executions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access"
  ON code_executions
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public insert access"
  ON code_executions
  FOR INSERT
  TO public
  WITH CHECK (true);

  -- Add input column to code_executions table if it doesn't exist
ALTER TABLE code_executions ADD COLUMN IF NOT EXISTS input text;
