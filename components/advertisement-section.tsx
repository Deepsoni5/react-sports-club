export function AdvertisementSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#1032B9]/20 to-[#1032B9]/5 py-8">
      <div className="container">
        <div className="relative mx-auto max-w-[1200px]">
          {/* Ad Container */}
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#1032B9]/10 backdrop-blur-sm">
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#1032B9]/0 to-[#EF3DF6]/0 opacity-0 blur-xl transition-all duration-300 group-hover:from-[#1032B9]/10 group-hover:to-[#EF3DF6]/10 group-hover:opacity-100" />

            {/* Ad Content */}
            <div className="relative aspect-[8/1] w-full">
              {/* Placeholder text - Remove when implementing actual ads */}
              <div className="flex h-full items-center justify-center text-sm text-white/40">Advertisement Space</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

