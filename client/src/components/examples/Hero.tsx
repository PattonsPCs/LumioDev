import Hero from '../Hero'

export default function HeroExample() {
  return <Hero onShopClick={() => console.log('Shop clicked')} />
}
