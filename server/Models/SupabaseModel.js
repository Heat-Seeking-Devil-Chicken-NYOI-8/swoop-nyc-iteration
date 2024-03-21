const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const SUPABASE_URI = process.env.SUPABASE_URI;
const SUPABASE_KEY = process.env.SUPABASE_KEY;

const supabase = createClient(SUPABASE_URI, SUPABASE_KEY);

supabase.auth.onAuthStateChange((event, session) => {
  console.log('Authentication state changed:', event, session);
});

module.exports = supabase;
