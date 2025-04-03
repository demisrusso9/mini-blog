import { getUser } from '@/api/get-user'
import { signOutUser } from '@/api/sign-out-user'
import { useQuery } from '@tanstack/react-query'
import { NavLink, useNavigate } from 'react-router'

interface NavLinks {
	route: string
	name: string
	signout?: () => Promise<void>
}

export function Header() {
	const navLinkCss =
		'rounded-sm p-0 hover:p-0 hover:text-gray-500 cursor-pointer'

	const navLinkCssActive = `rounded-sm bg-black p-2 hover:p-2 text-gray-100 cursor-pointer`

	const navLinksLoggedOut = [
		{ route: '/', name: 'Home' },
		{ route: '/login', name: 'Entrar' },
		{ route: '/register', name: 'Cadastrar' },
		{ route: '/about', name: 'Sobre' }
	]

	const navLinksLoggedIn: NavLinks[] = [
		{ route: '/', name: 'Home' },
		{ route: '/create-post', name: 'Novo Post' },
		{ route: '/dashboard', name: 'Dashboard' },
		{ route: '/about', name: 'Sobre' },
		{ route: '/signout', name: 'Sair', signout: handleSignOut }
	]

	const navigate = useNavigate()

	async function handleSignOut() {
		await signOutUser()
		navigate('/login', { replace: true })
	}

	const { data: user } = useQuery({
		queryKey: ['user'],
		queryFn: getUser
	})

	return (
		<header className="flex h-20 items-center justify-between bg-gray-200 p-4">
			<h1 className="text-2xl">
				Mini <strong>Blog</strong>
			</h1>

			<nav className="flex items-center gap-5">
				{user &&
					navLinksLoggedIn.map((navLink) => (
						<NavLink
							key={navLink.route}
							to={navLink.route}
							className={({ isActive }) => (isActive ? navLinkCssActive : '')}
						>
							<button className={navLinkCss} onClick={navLink.signout}>
								{navLink.name}
							</button>
						</NavLink>
					))}

				{!user &&
					navLinksLoggedOut.map((navLink) => (
						<NavLink
							key={navLink.route}
							to={navLink.route}
							className={({ isActive }) => (isActive ? navLinkCssActive : '')}
						>
							<button className={navLinkCss}>{navLink.name}</button>
						</NavLink>
					))}
			</nav>
		</header>
	)
}
