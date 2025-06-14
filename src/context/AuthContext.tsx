'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { Session, User } from '@supabase/supabase-js'
import { createClient } from '@/lib/supabase-auth/client'
import { useRouter } from 'next/navigation'

type AuthContextType = {
  user: User | null
  session: Session | null
  loading: boolean
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const supabase = createClient();
  const [session, setSession] = useState<Session | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter();

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession()
      setSession(data.session)
      setUser(data.session?.user ?? null)
      setLoading(false)
    }

    getSession();

    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session)
      setUser(session?.user ?? null)
    })

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [supabase])

  const logout = async () => {
    await supabase.auth.signOut()
    setSession(null);
    setUser(null);
  }

  const setUserData = async () => {
    if (!user) return;
    console.log('Setting user data:', user.id, user.email);
    await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: user.id,
        email: user.email,
      }),
    });
  }

  useEffect(() => {
    if (user) {
      setUserData();
    }
  }, [user]);

  useEffect(() => {
    if (!loading) {
      if (!session) {
        router.push('/login');
      } else {
        router.push('/');
      }
    }
  }, [session, loading, router]);

  return (
    <AuthContext.Provider value={{ user, session, loading, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}
