import { db } from '@/services/firebase'
import { deleteDoc, doc } from 'firebase/firestore'

export async function deletePost(id: string) {
	const collection = 'posts'
	await deleteDoc(doc(db, collection, id))
}
