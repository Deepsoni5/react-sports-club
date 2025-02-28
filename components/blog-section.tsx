import Image from "next/image"
import Link from "next/link"

const blogs = [
  {
    id: 1,
    title: "The Art of Goal Keeping",
    image: "https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    content:
      "Eos beatae voluptate non unde ad saepe maiores odit quis. Quis corporis aliquid placeat ipsam. Et molestiae deleniti consectetur hic. Voluptas in soluta maiores.Eos beatae voluptate non unde ad saepe maiores odit quis. Quis corporis aliquid placeat ipsam. Et molestiae deleniti consectetur hic. Voluptas in soluta maiores.",
    link: "#",
  },
  {
    id: 2,
    title: "Match Strategies Unveiled",
    image:
      "https://images.unsplash.com/photo-1574629810360-7efbbe195018?ixlib=rb-4.0.3&auto=format&fit=crop&w=1476&q=80",
    content:
      "Eos beatae voluptate non unde ad saepe maiores odit quis. Quis corporis aliquid placeat ipsam. Et molestiae deleniti consectetur hic. Voluptas in soluta maiores.Eos beatae voluptate non unde ad saepe maiores odit quis. Quis corporis aliquid placeat ipsam. Et molestiae deleniti consectetur hic. Voluptas in soluta maiores.",
    link: "#",
  },
  {
    id: 3,
    title: "Training Tips & Tricks",
    image:
      "https://images.unsplash.com/photo-1577223625816-7546f13df25d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    content:
      "Eos beatae voluptate non unde ad saepe maiores odit quis. Quis corporis aliquid placeat ipsam. Et molestiae deleniti consectetur hic. Voluptas in soluta maiores.Eos beatae voluptate non unde ad saepe maiores odit quis. Quis corporis aliquid placeat ipsam. Et molestiae deleniti consectetur hic. Voluptas in soluta maiores.",
    link: "#",
  },
]

function BlogCard({
  image,
  content,
  link,
}: {
  image: string
  content: string
  link: string
}) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-[#1032B9]/20 to-[#1032B9]/10 backdrop-blur-sm transition-all duration-300 hover:border-[#1032B9]/50 hover:bg-[#1032B9]/30">
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#1032B9]/0 to-[#1032B9]/0 opacity-0 blur-xl transition-all duration-300 group-hover:from-[#1032B9]/10 group-hover:to-[#1032B9]/10 group-hover:opacity-100" />

      {/* Content */}
      <div className="relative space-y-4 p-6">
        {/* Image */}
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg">
          <Image
            src={image || "/placeholder.svg"}
            alt="Blog"
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {/* Text Content */}
        <div className="space-y-4">
          <p className="line-clamp-6 text-sm leading-relaxed text-gray-300">{content}</p>
          <Link
            href={link}
            className="inline-block text-sm font-semibold text-white transition-colors hover:text-[#EF3DF6]"
          >
            Know More..
          </Link>
        </div>
      </div>
    </div>
  )
}

export function BlogSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#1032B9]/20 to-[#1032B9]/5 backdrop-blur-sm py-16 md:py-24">
      <div className="container">
        <h2 className="mb-12 text-3xl font-bold text-white md:text-4xl lg:text-5xl">Howzat !</h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <BlogCard key={blog.id} {...blog} />
          ))}
        </div>
      </div>
    </section>
  )
}

