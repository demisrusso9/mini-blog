import { NavLink } from 'react-router'

export function Header() {
	const navLinkCssClasses =
		'text-black p-2 rounded-sm hover:bg-black hover:p-2 hover:text-gray-100'

	return (
		<header className="flex h-20 items-center justify-between bg-gray-200 p-4">
			<h1 className="text-2xl">
				Mini <strong>Blog</strong>
			</h1>

			<nav className="flex items-center gap-4">
				<NavLink to="/">
					<span className={navLinkCssClasses}>Home</span>
				</NavLink>

				<NavLink to="/login">
					<span className={navLinkCssClasses}>Entrar</span>
				</NavLink>

				<NavLink to="/register">
					<span className={navLinkCssClasses}>Cadastrar</span>
				</NavLink>

				<NavLink to="/about">
					<span className={navLinkCssClasses}>Sobre</span>
				</NavLink>
			</nav>
		</header>
	)
}
