// ...existing code...
export default function Card({ title, desc, img, className }: CardProps) {
  return (
    <div className={`rounded-lg overflow-hidden shadow-md bg-white transition-all hover:shadow-lg ${className}`}>
      <div className="aspect-video w-full relative overflow-hidden">
        <Image
          src={img}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 33vw, 25vw"
        />
      </div>
      <div className="p-4">
        <h3 className="font-medium text-lg md:text-base lg:text-lg mb-2 line-clamp-1">{title}</h3>
        <p className="text-gray-600 text-sm line-clamp-2">{desc}</p>
      </div>
    </div>
  );
}
// ...existing code...
