import LookbookCard from '../LookbookCard'
import lookbookYellow from '@assets/generated_images/Lookbook_editorial_photo_yellow_1a515cdc.png'

export default function LookbookCardExample() {
  return (
    <div className="max-w-sm">
      <LookbookCard
        image={lookbookYellow}
        title="Urban Sunset"
        onClick={() => console.log('Lookbook clicked')}
      />
    </div>
  )
}
