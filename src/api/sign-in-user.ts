import { signInWithEmailAndPassword } from 'firebase/auth'

import { auth } from '@/services/firebase'

interface SignInUserParams {
	email: string
	password: string
}

export async function signInUser({ email, password }: SignInUserParams) {
	const { user } = await signInWithEmailAndPassword(auth, email, password)

	return user
}
