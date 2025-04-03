import { getUser } from '@/api/get-user'
import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { useQuery } from '@tanstack/react-query'
import { Outlet, useNavigate } from 'react-router'

export function AppLayout() {
	const navigate = useNavigate()

	const { data: user } = useQuery({
		queryKey: ['user'],
		queryFn: getUser
	})

	if (!user) {
		navigate('/login')
	}

	return (
		<div className="flex min-h-screen flex-col">
			<Header />

			<div className="mx-auto flex w-full flex-1 bg-gray-300">
				<Outlet />
			</div>

			<Footer />
		</div>
	)
}
