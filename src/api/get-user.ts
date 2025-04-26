import { getAuth, User } from 'firebase/auth'

export function getUser(): User | null {
	const { currentUser } = getAuth()

	return currentUser
}
