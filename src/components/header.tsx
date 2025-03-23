import { NavLink } from 'react-router'

export function Header() {
	const navLinkCssClasses =
		'rounded-sm p-2 hover:bg-black hover:p-2 hover:text-gray-100'

	const navLinkActive = `rounded-sm bg-black p-2 hover:p-2 text-gray-100`

	const navLinks = [
		{ route: '/', name: 'Home' },
		{ route: '/login', name: 'Entrar' },
		{ route: '/register', name: 'Cadastrar' },
		{ route: '/about', name: 'Sobre' }
	]

	return (
		<header className="flex h-20 items-center justify-between bg-gray-200 p-4">
			<h1 className="text-2xl">
				Mini <strong>Blog</strong>
			</h1>

			<nav className="flex items-center gap-5">
				{navLinks.map((navLink) => (
					<NavLink
						key={navLink.route}
						to={navLink.route}
						className={({ isActive }) => (isActive ? navLinkActive : '')}
					>
						<span className={navLinkCssClasses}>{navLink.name}</span>
					</NavLink>
				))}
			</nav>
		</header>
	)
}
