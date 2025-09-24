export function Hero() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 to-blue-900">
      <div className="text-center text-white">
        <h1 className="text-6xl font-bold mb-4">MysticVisions</h1>
        <p className="text-xl mb-8">あなたの運命を解き明かします</p>
        <button className="bg-purple-600 hover:bg-purple-700 px-8 py-3 rounded-lg text-lg">
          無料占いを始める
        </button>
      </div>
    </div>
  )
}