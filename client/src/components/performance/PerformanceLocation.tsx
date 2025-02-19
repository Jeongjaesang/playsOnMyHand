interface PerformanceLocationProps {
  mapUrl: string;
}

export function PerformanceLocation({ mapUrl }: PerformanceLocationProps) {
  return (
    <div className="mb-6">
      <h2 className="mb-2 text-xl font-semibold text-gray-900">공연장 위치</h2>
      <iframe
        src={mapUrl}
        width="100%"
        height="300"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
}
