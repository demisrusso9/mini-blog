export interface IPost {
	id: string
	title: string
	image_url: string
	body: string
	tags: string
	author: string
	authorId: string
	createdAt: string
	updatedAt: string
	comments: {
		id: string
		user_id: string
		user_photo: string | null
		username: string | null
		body: string
		createdAt: string
	}[]
}
