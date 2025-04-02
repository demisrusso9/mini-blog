import { getAuth, User } from 'firebase/auth'

export async function getUser(): Promise<User | null> {
	const { currentUser } = getAuth()

	return currentUser
}
