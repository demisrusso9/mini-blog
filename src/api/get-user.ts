import { getAuth, User } from 'firebase/auth'

/**
 * Retrieves the currently authenticated user.
 *
 * @returns The current `User` object if a user is authenticated, or `null` if no user is signed in.
 */
export function getUser(): User | null {
	const { currentUser } = getAuth()

	return currentUser
}
