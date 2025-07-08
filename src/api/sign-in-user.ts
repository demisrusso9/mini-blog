import { signInWithEmailAndPassword, User } from 'firebase/auth'

import { auth } from '@/services/firebase'

interface SignInUserParams {
	email: string
	password: string
}

/**
 * Signs in a user using their email and password credentials.
 *
 * @param {SignInUserParams} params - The user's sign-in credentials.
 * @param {string} params.email - The user's email address.
 * @param {string} params.password - The user's password.
 * @returns {Promise<User>} A promise that resolves to the authenticated user object.
 * @throws Will throw an error if authentication fails.
 */
export async function signInUser({
	email,
	password
}: SignInUserParams): Promise<User> {
	const { user } = await signInWithEmailAndPassword(auth, email, password)

	return user
}
