interface PerformanceHeaderProps {
  title: string;
  image: string;
}

export function PerformanceHeader({ title, image }: PerformanceHeaderProps) {
  return (
    <>
      <h1 className="mb-2 text-2xl font-bold text-gray-900 md:text-3xl md:mb-4">
        {title}
      </h1>
      <div className="relative h-[200px] md:h-[400px] mb-4 md:mb-6">
        <img
          src={image}
          alt={title}
          className="object-cover w-full h-full rounded-lg"
        />
      </div>
    </>
  );
}
