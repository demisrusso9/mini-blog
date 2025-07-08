import { signOut } from 'firebase/auth'

import { auth } from '@/services/firebase'

/**
 * Signs out the currently authenticated user.
 *
 * @returns A promise that resolves when the user has been signed out.
 */
export async function signOutUser() {
	return await signOut(auth)
}
