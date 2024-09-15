import React from 'react';

function RiceBreakdownTable() {
  // ゆめぴりかと ななつぼし のフレコン内訳データ
  const bagBreakdownData = {
    ゆめぴりか: {
      totalBags: 26,
      salesBags: 2,
      rejectedBags: 8,
      consumptionBags: 18,
    },
    ななつぼし: {
      totalBags: 14,
      salesBags: 2,
      rejectedBags: 11,
      consumptionBags: 3,
    },
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">ゆめぴりか・ななつぼし フレコン内訳</h1>
      <table className="table-auto w-full mb-6">
        <thead>
          <tr>
            <th className="px-4 py-2">品種</th>
            <th className="px-4 py-2">合計本数</th>
            <th className="px-4 py-2">会社在庫数</th>
            <th className="px-4 py-2">ハネ分本数</th>
            <th className="px-4 py-2">食用本数</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(bagBreakdownData).map((riceType) => (
            <tr key={riceType}>
              <td className="border px-4 py-2">{riceType}</td>
              <td className="border px-4 py-2">{bagBreakdownData[riceType].totalBags}</td>
              <td className="border px-4 py-2">{bagBreakdownData[riceType].salesBags}</td>
              <td className="border px-4 py-2">{bagBreakdownData[riceType].rejectedBags}</td>
              <td className="border px-4 py-2">{bagBreakdownData[riceType].consumptionBags}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RiceBreakdownTable;
