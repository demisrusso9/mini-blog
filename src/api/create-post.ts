import { getAuth } from 'firebase/auth'
import { addDoc, collection } from 'firebase/firestore'

import { IPost } from '@/@types/post'
import { db } from '@/services/firebase'

interface CreatePostParams {
	title: string
	image_url: string
	body: string
	tags: string
}

/**
 * Creates a new post in the Firestore 'posts' collection.
 *
 * @param data - The parameters required to create a post.
 * @returns A promise that resolves when the post has been added to the database.
 *
 * @remarks
 * - The function retrieves the current authenticated user and uses their information as the post author.
 * - If there is no authenticated user, the function returns early and does not create a post.
 * - The post object includes author details, timestamps, and an empty comments array.
 */
export async function createPost(data: CreatePostParams) {
	const { currentUser } = getAuth()

	if (!currentUser) return

	const collectionName = 'posts'

	const post: Omit<IPost, 'id'> = {
		...data,
		author: currentUser.displayName || 'user-from-miniblog',
		authorId: currentUser.uid,
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
		comments: []
	}

	await addDoc(collection(db, collectionName), post)
}
