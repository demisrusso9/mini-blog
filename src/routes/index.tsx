import { AppLayout } from '@/layout/app-layout'
import { AuthLayout } from '@/layout/auth-layout'
import { About } from '@/pages/about'
import { Dashboard } from '@/pages/dashboard'
import { Home } from '@/pages/home'
import { Login } from '@/pages/login'
import { NotFound } from '@/pages/not-found'
import { Posts } from '@/pages/posts'
import { Register } from '@/pages/register'

import { BrowserRouter, Route, Routes } from 'react-router'

export function AppRoutes() {
	return (
		<BrowserRouter>
			<Routes>
				<Route element={<AppLayout />}>
					{/* <Route
						path="/post"
						element={
							<Post
								imgUrl="https://images3.alphacoders.com/133/thumb-1920-1334079.png"
								title="forza motorsport"
								description="lorem"
								author="demis"
								tags={['game', 'xbox', 'abc', 'test', '123']}
								isHomeView={false}
							/>
						}
					/> */}
					<Route path="/create-post" element={<Posts />} />
					<Route path="/dashboard" element={<Dashboard />} />
				</Route>

				<Route element={<AuthLayout />}>
					<Route path="/" element={<Home />} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route path="/about" element={<About />} />
					<Route path="*" element={<NotFound />} />
				</Route>
			</Routes>
		</BrowserRouter>
	)
}
