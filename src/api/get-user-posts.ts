import { Post } from '@/@types/post'
import { db } from '@/services/firebase'
import { getAuth } from 'firebase/auth'

import { collection, getDocs, query, where } from 'firebase/firestore'

export async function getUserPosts() {
	const { currentUser } = getAuth()

	const userPosts = query(
		collection(db, 'posts'),
		where('authorId', '==', currentUser?.uid)
	)

	const querySnapshot = await getDocs(userPosts)

	const posts = querySnapshot.docs.map((post) => {
		return {
			id: post.id,
			...(post.data() as Omit<Post, 'id'>)
		}
	})

	return posts
}
