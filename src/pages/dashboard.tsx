export function Dashboard() {
	return (
		<div className="flex w-full flex-col items-center justify-center bg-gray-300 px-10">
			<h2 className="mb-4 text-2xl font-bold">Dashboard</h2>
			<p className="mb-4 text-base font-thin">Gerencie os seus posts</p>

			<div className="flex w-full justify-between border-b-2 pb-4">
				<span className="text-base font-bold">Título</span>
				<span className="text-base font-bold">Ações</span>
			</div>

			{Array.from({ length: 3 }).map((post) => (
				<div className="flex w-full items-center border-b-1 py-4">
					<p className="flex flex-1">Qualquer coisa</p>

					<div className="flex gap-3">
						<button className="w-26 cursor-pointer rounded-sm border p-2 hover:bg-black hover:text-gray-100">
							Ver
						</button>

						<button className="w-26 cursor-pointer rounded-sm border p-2 hover:bg-black hover:text-gray-100">
							Editar
						</button>

						<button className="w-26 cursor-pointer rounded-sm border p-2 hover:bg-black hover:text-gray-100">
							Excluir
						</button>
					</div>
				</div>
			))}
		</div>
	)
}
