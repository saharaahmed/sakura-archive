import {createClient} from '@supabase/supabase-js'

const supabaseUrl = 'https://wynlhkpxoprtkarjvwly.supabase.co'
const supabaseKey = 'sb_publishable_VYV0d61lNLnAYIqK6G38xA_vEqUkrDh'

export const supabase = createClient(supabaseUrl, supabaseKey)