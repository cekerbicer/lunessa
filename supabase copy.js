import { AppState } from 'react-native'
import 'react-native-url-polyfill/auto'
import { createClient } from '@supabase/supabase-js'
import AsyncStorage from '@react-native-async-storage/async-storage'

// ⚠️ DİKKAT: BURAYA KENDİ PROJE BİLGİLERİNİ YAPIŞTIR
const supabaseUrl = 'kişisel base url yazılmalı'
const supabaseAnonKey = 'kişisel anon key yazılmalı'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})

// Uygulama arka plana atılınca bağlantıyı yönetmek için:
AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh()
  } else {
    supabase.auth.stopAutoRefresh()
  }
})