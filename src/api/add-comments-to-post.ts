import { IPost } from '@/@types/post'
import { db } from '@/services/firebase'
import { doc, getDoc, updateDoc } from 'firebase/firestore'

interface AddCommentsToPostParams {
	id: string
	comments: IPost['comments']
}

export async function addCommentsToPost({
	id,
	comments
}: AddCommentsToPostParams) {
	const collectionName = 'posts'
	const docRef = doc(db, collectionName, id)

	const docSnap = await getDoc(docRef)

	if (docSnap.exists()) {
		await updateDoc(docRef, { comments })
	}
}
