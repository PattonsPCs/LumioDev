import { useState } from 'react'
import Cart from '../Cart'
import yellowHoodie from '@assets/generated_images/Yellow_hoodie_product_photo_259447ce.png'
import { Button } from '@/components/ui/button'

export default function CartExample() {
  const [isOpen, setIsOpen] = useState(true)
  const [items, setItems] = useState([
    {
      id: '1',
      name: 'Citrus Glow Hoodie',
      price: 89,
      image: yellowHoodie,
      quantity: 2,
      size: 'M',
      color: 'Citrus Yellow',
    },
  ])

  return (
    <div>
      <Button onClick={() => setIsOpen(true)}>Open Cart</Button>
      <Cart
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        items={items}
        onUpdateQuantity={(id, qty) => {
          if (qty === 0) {
            setItems(items.filter((i) => i.id !== id))
          } else {
            setItems(items.map((i) => (i.id === id ? { ...i, quantity: qty } : i)))
          }
        }}
        onRemove={(id) => setItems(items.filter((i) => i.id !== id))}
        onCheckout={() => console.log('Checkout clicked')}
      />
    </div>
  )
}
