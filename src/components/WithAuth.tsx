// 'use client'

// import { useAuth } from '@/context/AuthContext'
// import { useRouter } from 'next/navigation'
// import { useEffect } from 'react'

// export default function withAuth<P>(Component: React.ComponentType<P>) {
//   return function ProtectedComponent(props: P) {
//     const { user, loading } = useAuth()
//     const router = useRouter()

//     useEffect(() => {
//       if (!loading && !user) {
//         router.push('/login')
//       }
//     }, [user, loading, router])

//     if (loading) return null // or a loading spinner

//     return user ? <Component {...props} /> : null
//   }
// }

// import withAuth from '@/components/withAuth'

// function ProtectedPage() {
//   return <div>You're logged in and can see this!</div>
// }

// export default withAuth(ProtectedPage)
