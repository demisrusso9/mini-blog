import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { Outlet } from 'react-router'

export function PublicLayout() {
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
