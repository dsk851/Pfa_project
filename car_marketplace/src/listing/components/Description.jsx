import React from 'react'

function Description({carDetails}) {
  if (!carDetails?.description) {
    return <p className="text-center">Aucune description disponible</p>;
  }
  return (
    <div className="w-full flex flex-col shadow-md bg-white p-6 rounded-lg mt-4">
      <h2 className="text-xl font-bold mb-2">Description</h2>
      <p className="text-sm text-gray-700">{carDetails?.description}</p>
    </div>
  );
}

export default Description