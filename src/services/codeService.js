import axios from 'axios';
import { createClient } from '@supabase/supabase-js';

const API_URL = 'https://code-playground-api.onrender.com/api';
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export const executeCode = async (code, language, input = '') => {
  try {
    // Execute code via backend
    const response = await axios.post(`${API_URL}/execute`, {
      code,
      language,
      input
    });
    
    // Store execution result in Supabase
    const { error } = await supabase
      .from('code_executions')
      .insert({
        code,
        language,
        input,
        output: response.data.output,
        execution_time: response.data.executionTime,
        memory_usage: response.data.memoryUsage,
        status: response.data.status
      });
    
    if (error) {
      console.error('Error storing execution result:', error);
    }
        
    return response.data;
  } catch (error) {
    console.error('Error executing code:', error);
        
    // Store failed execution in Supabase
    await supabase
      .from('code_executions')
      .insert({
        code,
        language,
        input,
        output: error.response?.data?.message || 'Failed to execute code',
        status: 'error'
      });
          
    throw new Error(error.response?.data?.message || 'Failed to execute code');
  }
};
