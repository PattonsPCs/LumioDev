import Nav from '../Nav'

export default function NavExample() {
  return <Nav cartCount={3} onCartClick={() => console.log('Cart clicked')} />
}
