import { ProtectedLayout } from '@/layouts/protected-layout'
import { PublicLayout } from '@/layouts/public-layout'
import { About } from '@/pages/about'
import { Dashboard } from '@/pages/dashboard'
import { EditPost } from '@/pages/edit-post'
import { Home } from '@/pages/home'
import { Login } from '@/pages/login'
import { NotFound } from '@/pages/not-found'
import { Posts } from '@/pages/posts'
import { Register } from '@/pages/register'
import { ViewPost } from '@/pages/view-post'

import { BrowserRouter, Route, Routes } from 'react-router'

export function AppRoutes() {
	return (
		<BrowserRouter>
			<Routes>
				<Route element={<ProtectedLayout />}>
					<Route path="/post/edit/:id" element={<EditPost />} />
					<Route path="/create-post" element={<Posts />} />
					<Route path="/dashboard" element={<Dashboard />} />
				</Route>

				<Route element={<PublicLayout />}>
					<Route path="/" element={<Home />} />
					<Route path="/post/:id" element={<ViewPost />} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route path="/about" element={<About />} />
					<Route path="*" element={<NotFound />} />
				</Route>
			</Routes>
		</BrowserRouter>
	)
}
