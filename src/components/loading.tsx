import { LoaderCircle } from 'lucide-react'

export function Loading() {
	return (
		<div className="flex items-center justify-center">
			<LoaderCircle size={36} className="animate-spin" />
		</div>
	)
}
