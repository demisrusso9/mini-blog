import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { Outlet } from 'react-router'

export function AppLayout() {
	return (
		<div className="flex min-h-screen flex-col">
			<Header />

			<div className="flex flex-1">
				<Outlet />
			</div>

			<Footer />
		</div>
	)
}
