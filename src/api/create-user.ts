import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'

import { auth } from '@/services/firebase'

interface CreateUserParams {
	name: string
	email: string
	password: string
}

export async function createUser({ name, email, password }: CreateUserParams) {
	const response = await createUserWithEmailAndPassword(auth, email, password)

	await updateProfile(response.user, {
		displayName: name
	})

	return response.user
}
