import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { Loading } from '@/components/loading'
import { useAuth } from '@/contexts/auth-context'
import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router'

export function ProtectedLayout() {
	const { user, loading } = useAuth()
	const navigate = useNavigate()

	useEffect(() => {
		if (!loading && !user) {
			navigate('/login', { replace: true })
		}
	}, [user, loading, navigate])

	return (
		<div className="flex min-h-screen flex-col">
			<Header />

			<div className="mx-auto flex w-full flex-1 bg-gray-300">
				{loading ? (
					<div className="mx-auto flex">
						<Loading />
					</div>
				) : (
					<Outlet />
				)}
			</div>

			<Footer />
		</div>
	)
}
