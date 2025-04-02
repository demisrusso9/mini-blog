import { getAuth } from 'firebase/auth'
import { addDoc, collection } from 'firebase/firestore'

import { db } from '@/services/firebase'

interface PostParams {
	title: string
	image_url: string
	body: string
	tags: string
	author: string
	authorId: string
	createdAt: string
	updatedAt: string
}

interface CreatePostParams {
	title: string
	image_url: string
	body: string
	tags: string
}

export async function createPost(data: CreatePostParams) {
	const { currentUser } = getAuth()

	if (!currentUser) return

	const collectionName = 'posts'

	const post: PostParams = {
		...data,
		author: currentUser.displayName || 'user-from-miniblog',
		authorId: currentUser.uid,
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString()
	}

	await addDoc(collection(db, collectionName), post)
}
