import Card from "@/components/dashboard/cardui"

export default function Example() {
  return (
    <div className="p-4 space-y-4">
      <Card animated className="p-4">
        <h2 className="text-lg font-semibold">Card Animasi</h2>
        <p>Lorem ipsum dolor sit amet.</p>
      </Card>
      <Card className="p-4">
        <h2 className="text-lg font-semibold">Card Tanpa Animasi</h2>
        <p>Contoh konten lain.</p>
      </Card>
    </div>
  )
}
