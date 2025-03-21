import { AppLayout } from '@/layout/app-layout'
import { About } from '@/pages/about'
import { Home } from '@/pages/home'
import { Login } from '@/pages/login'
import { Register } from '@/pages/register'

import { BrowserRouter, Route, Routes } from 'react-router'

export function AppRoutes() {
	return (
		<BrowserRouter>
			<Routes>
				<Route element={<AppLayout />}>
					<Route path="/" element={<Home />} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route path="/about" element={<About />} />
					<Route path="*" element={<div>NotFound</div>} />
				</Route>
			</Routes>
		</BrowserRouter>
	)
}
