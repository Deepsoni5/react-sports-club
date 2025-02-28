export function ContinuousVideo() {
  return (
    <section className="w-full py-4">
      <div className="container px-4">
        <div className="relative aspect-[5/1] w-full overflow-hidden rounded-2xl bg-gradient-to-r from-[#1032B9]/20 via-[#1032B9]/10 to-[#1032B9]/20">
          <video className="h-full w-full object-cover" autoPlay loop muted playsInline>
            <source
              src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </section>
  )
}

