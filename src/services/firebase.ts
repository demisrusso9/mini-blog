import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

import { env } from '@/env'

const firebaseConfig = {
	apiKey: env.VITE_SCANNER_API_KEY,
	authDomain: env.VITE_SCANNER_AUTH_DOMAIN,
	projectId: env.VITE_SCANNER_PROJECT_ID,
	storageBucket: env.VITE_SCANNER_STORAGE_BUCKET,
	messagingSenderId: env.VITE_SCANNER_MESSAGING_SENDER_ID,
	appId: env.VITE_SCANNER_APP_ID
}

const app = initializeApp(firebaseConfig)
const db = getFirestore()
const auth = getAuth()

export { app, auth, db }
