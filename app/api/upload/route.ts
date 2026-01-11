import { NextRequest, NextResponse } from 'next/server'
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary'

export async function POST(request: NextRequest) {
	try {
		const formData = await request.formData()
		const file = formData.get('file') as File

		if (!file) {
			return NextResponse.json(
				{
					error: 'No file uploaded',
				},
				{
					status: 400,
				}
			)
		}

		const bytes = await file.arrayBuffer()
		const buffer = Buffer.from(bytes)

		// Upload to cloudinary using a Promise wrapper
		const result = await new Promise<UploadApiResponse>(
			(resolve, reject) => {
				const uploadStream = cloudinary.uploader.upload_stream(
					{
						folder: 'moorleez-products',
						resource_type: 'auto',
					},
					(error, result) => {
						if (error) {
							reject(error)
						} else if (result) {
							resolve(result)
						} else {
							reject(
								new Error('Upload failed - no result returned')
							)
						}
					}
				)
				uploadStream.end(buffer)
			}
		)

		// Check if result exists
		if (!result || !result.secure_url) {
			return NextResponse.json(
				{ error: 'Upload failed - no URL returned' },
				{ status: 500 }
			)
		}

		// Return the Cloudinary URL
		return NextResponse.json({
			success: true,
			url: result.secure_url,
		})
	} catch (error) {
		console.error('Upload error:', error)
		return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
	}
}
