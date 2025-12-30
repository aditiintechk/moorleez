import { Resend } from 'resend'
import { OrderWithItems } from '@/types'

const resend = new Resend(process.env.RESEND_API_KEY || 'test_key')

// Helper function to generate product items HTML
function generateProductItemsHTML(items: OrderWithItems['items']): string {
	return items
		.map(
			(item) => `
    <div style="border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px; margin-bottom: 12px; display: flex;">
      <img src="${item.productImage}" alt="${item.productName}" style="width: 80px; height: 80px; object-fit: cover; border-radius: 4px; margin-right: 16px;" />
      <div style="flex: 1;">
        <h3 style="margin: 0 0 8px 0; font-size: 16px;">${item.productName}</h3>
        <p style="margin: 0; color: #6b7280;">Quantity: ${item.quantity}</p>
        <p style="margin: 0; color: #6b7280;">Price: ₹${item.productPrice}</p>
        <p style="margin: 8px 0 0 0; font-weight: bold;">Subtotal: ₹${item.subtotal}</p>
      </div>
    </div>
  `
		)
		.join('')
}

export async function sendOrderConfirmationEmail(orderData: OrderWithItems) {
	try {
		const { data, error } = await resend.emails.send({
			from: "Moorlee'z <onboarding@resend.dev>", // Change this later
			to: [orderData.customerEmail],
			subject: `Order Confirmation - ${orderData.orderId}`,
			html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h1 style="color: #1f2937;">Thank you for your order!</h1>
                    <p>Hi ${orderData.customerName},</p>
                    <p>Your order <strong>${
						orderData.orderId
					}</strong> has been confirmed!</p>
                    
                    <h2 style="color: #374151; margin-top: 24px;">Order Details</h2>
                    ${generateProductItemsHTML(orderData.items)}
                    
                    <div style="border-top: 2px solid #e5e7eb; margin-top: 24px; padding-top: 16px;">
                    <p style="font-size: 18px; font-weight: bold;">Total: ₹${
						orderData.totalPrice
					}</p>
                    </div>
                    
                    <h3 style="color: #374151; margin-top: 24px;">Shipping Address</h3>
                    <p style="margin: 0;">${orderData.shippingAddress}</p>
                    <p style="margin: 0;">${orderData.apartment || ''}</p>
                    <p style="margin: 0;">${orderData.city}, ${
				orderData.state
			} - ${orderData.pincode}</p>
                    
                    <p style="margin-top: 24px; color: #6b7280;">Thank you for shopping with Moorlee'z!</p>
                </div>
                `,
		})

		if (error) {
			console.error('Email sending failed:', error)
			return { success: false, error }
		}

		return { success: true, data }
	} catch (error) {
		console.error('Email sending error:', error)
		return { success: false, error }
	}
}

export async function sendAdminOrderNotification(orderData: OrderWithItems) {
	try {
		const adminEmail = process.env.ADMIN_EMAIL

		if (!adminEmail) {
			console.error('ADMIN_EMAIL not configured')
			return { success: false, error: 'Admin email not configured' }
		}

		const { data, error } = await resend.emails.send({
			from: "Moorlee'z <onboarding@resend.dev>",
			to: [adminEmail],
			subject: `🔔 New Order Received - ${orderData.orderId}`,
			html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #fef3c7; padding: 20px; border-radius: 8px;">
                    <h1 style="color: #92400e;">🔔 New Order Alert!</h1>
                    
                    <div style="background-color: white; padding: 16px; border-radius: 8px; margin-bottom: 16px;">
                    <h2 style="color: #374151; margin-top: 0;">Order Information</h2>
                    <p><strong>Order ID:</strong> ${orderData.orderId}</p>
                    <p><strong>Customer:</strong> ${orderData.customerName}</p>
                    <p><strong>Email:</strong> ${orderData.customerEmail}</p>
                    <p><strong>Phone:</strong> ${orderData.customerPhone}</p>
                    <p style="font-size: 18px; font-weight: bold; color: #059669;">Total: ₹${
						orderData.totalPrice
					}</p>
                    </div>
                    
                    <div style="background-color: white; padding: 16px; border-radius: 8px; margin-bottom: 16px;">
                    <h3 style="color: #374151; margin-top: 0;">Ordered Items</h3>
                    ${generateProductItemsHTML(orderData.items)}
                    </div>
                    
                    <div style="background-color: white; padding: 16px; border-radius: 8px;">
                    <h3 style="color: #374151; margin-top: 0;">Shipping Address</h3>
                    <p style="margin: 0;">${orderData.shippingAddress}</p>
                    <p style="margin: 0;">${orderData.apartment || ''}</p>
                    <p style="margin: 0;">${orderData.city}, ${
				orderData.state
			} - ${orderData.pincode}</p>
                    </div>
                    
                    <p style="margin-top: 16px; color: #92400e; font-weight: bold;">Process this order in the admin dashboard!</p>
                </div>
                `,
		})

		if (error) {
			console.error('Admin email failed:', error)
			return { success: false, error }
		}

		return { success: true, data }
	} catch (error) {
		console.error('Admin email error:', error)
		return { success: false, error }
	}
}
