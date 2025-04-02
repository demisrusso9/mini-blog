import { signOut } from 'firebase/auth'

import { auth } from '@/services/firebase'

export async function signOutUser() {
	return await signOut(auth)
}
