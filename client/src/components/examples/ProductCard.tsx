import ProductCard from '../ProductCard'
import yellowHoodie from '@assets/generated_images/Yellow_hoodie_product_photo_259447ce.png'

export default function ProductCardExample() {
  const product = {
    id: '1',
    name: 'Citrus Glow Hoodie',
    price: 89,
    image: yellowHoodie,
    colors: ['#FFD54A', '#FF5A9E', '#D6C7FF'],
    inStock: true,
    isNew: true,
  }

  return (
    <div className="max-w-sm">
      <ProductCard 
        product={product} 
        onAddToCart={(p) => console.log('Added to cart:', p.name)}
        onClick={() => console.log('Product clicked')}
      />
    </div>
  )
}
