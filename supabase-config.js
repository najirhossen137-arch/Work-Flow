// supabase-config.js

import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabaseUrl = "https://uvhzxmqsaictnmkbsdly.supabase.co";
const supabaseKey = "sb_publishable_eBLkuPKORDJMfDZS1rACQ_gsJACa8X";

// Poori website ke liye sirf YAHAN EK BAAR client banaya gaya hai
export const supabase = createClient(supabaseUrl, supabaseKey);
