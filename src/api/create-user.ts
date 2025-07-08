import {
	createUserWithEmailAndPassword,
	updateProfile,
	User
} from 'firebase/auth'

import { auth } from '@/services/firebase'

interface CreateUserParams {
	name: string
	email: string
	password: string
}

/**
 * Creates a new user with the provided name, email, and password.
 * Utilizes Firebase authentication to register the user and sets the display name.
 *
 * @param {CreateUserParams} params - The parameters for creating a user.
 * @param {string} params.name - The display name for the new user.
 * @param {string} params.email - The email address for the new user.
 * @param {string} params.password - The password for the new user.
 * @returns {Promise<User>} A promise that resolves to the created user object.
 * @throws Will throw an error if user creation or profile update fails.
 */
export async function createUser({
	name,
	email,
	password
}: CreateUserParams): Promise<User> {
	const response = await createUserWithEmailAndPassword(auth, email, password)

	await updateProfile(response.user, {
		displayName: name
	})

	return response.user
}
