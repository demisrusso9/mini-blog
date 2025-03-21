import { NavLink } from 'react-router'

export function About() {
	return (
		<div className="flex w-full flex-col items-center justify-center bg-gray-300">
			<h2 className="mb-4 text-2xl font-bold">Sobre o Mini BLog</h2>

			<p className="mb-4 text-base font-thin">
				Esse projeto consiste em um blog feito com React no front-end e Firebase
				no back-end
			</p>

			<NavLink to="/">
				<button className="cursor-pointer rounded-sm border p-2 hover:bg-black hover:text-gray-100">
					Criar post
				</button>
			</NavLink>
		</div>
	)
}
