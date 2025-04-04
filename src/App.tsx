import { AuthProvider } from '@/contexts/auth-context'
import { AppRoutes } from '@/routes'
import { queryClient } from '@/services/react-query'
import { QueryClientProvider } from '@tanstack/react-query'
import { Bounce, ToastContainer } from 'react-toastify'

function App() {
	return (
		<>
			<AuthProvider>
				<QueryClientProvider client={queryClient}>
					<AppRoutes />
				</QueryClientProvider>
			</AuthProvider>

			<ToastContainer
				position="top-center"
				autoClose={4000}
				hideProgressBar={false}
				newestOnTop
				closeOnClick
				rtl={false}
				pauseOnFocusLoss={false}
				draggable
				pauseOnHover={false}
				theme="light"
				transition={Bounce}
			/>
		</>
	)
}

export default App
