import { IPost } from '@/@types/post'
import { db } from '@/services/firebase'
import { doc, getDoc } from 'firebase/firestore'

export async function getPostComments(id: string): Promise<IPost['comments']> {
	const collectionName = 'posts'
	const docRef = doc(db, collectionName, id)

	const docSnap = await getDoc(docRef)
	const { comments } = docSnap.data() as IPost

	return comments || []
}
