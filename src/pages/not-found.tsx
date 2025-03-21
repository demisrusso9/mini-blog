import { NavLink } from 'react-router'

export function NotFound() {
	return (
		<div className="flex w-full flex-col items-center justify-center bg-gray-300">
			<h2 className="mb-4 text-2xl font-bold">Página não encontrada</h2>

			<NavLink to="/">
				<button className="cursor-pointer rounded-sm border p-2 hover:bg-black hover:text-gray-100">
					Voltar pro Inicio
				</button>
			</NavLink>
		</div>
	)
}
