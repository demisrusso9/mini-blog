import { AppRoutes } from '@/routes'
import { Bounce, ToastContainer } from 'react-toastify'

function App() {
	return (
		<>
			<AppRoutes />

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
