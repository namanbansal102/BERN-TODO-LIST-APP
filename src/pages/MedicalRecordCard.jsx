export function MedicalRecordCard({ record, onClick }) {
  return (
    <div
      className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-pointer"
      onClick={onClick}
    >
      <div className="relative h-40">
        <img
          src={record.imageUrl}
          alt={record.title}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="p-4">
        <h4 className="text-lg font-semibold text-gray-800 mb-2">{record.title}</h4>
        <p className="text-sm text-gray-600">Date: {record.date}</p>
        <p className="text-sm text-gray-600">Expiry: {record.expiry}</p>
        <p className="text-sm text-gray-600">Status: {record.status}</p>
      </div>
    </div>
  )
}

