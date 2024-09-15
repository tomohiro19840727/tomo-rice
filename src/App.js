import React, { useState } from 'react';

function RiceProfitCalculator() {
  // 各品種のデータ
  const riceData = {
    新市場米ゆめぴりか: {
      areaHa: 17,
      yieldBales: 1360,
      flaconTotal: 81,
      flaconAfterReduction: 65,
    },
    新市場米ななつぼし: {
      areaHa: 24,
      yieldBales: 1920,
      flaconTotal: 115,
      flaconAfterReduction: 92,
    },
    食用米ゆめぴりか: {
      areaHa: 4.3,
      yieldBales: 344,
      flaconTotal: 20,
    },
    食用米ななつぼし: {
      areaHa: 1,
      yieldBales: 80,
      flaconTotal: 5,
    },
  };

  const maxShipmentMeijiya = {
    食用米ゆめぴりか: 25, // トン
    食用米ななつぼし: 15, // トン
  };

  const prices = {
    明治屋: { 食用米ゆめぴりか: 36300, 食用米ななつぼし: 29700 },
    函館米穀: { 新市場米ゆめぴりか: 11000, 新市場米ななつぼし: 10000 },
    北斗ライス: { 新市場米ゆめぴりか: 23000, 新市場米ななつぼし: 22000 },
    石澤: { 新市場米ゆめぴりか: 23000, 新市場米ななつぼし: 20000 },
  };

  const [quantities, setQuantities] = useState({
    明治屋: { 食用米ゆめぴりか: 0, 食用米ななつぼし: 0 },
    函館米穀: { 新市場米ゆめぴりか: 0, 新市場米ななつぼし: 0 },
    北斗ライス: { 新市場米ゆめぴりか: 0, 新市場米ななつぼし: 0 },
    石澤: { 新市場米ゆめぴりか: 0, 新市場米ななつぼし: 0 },
  });

  // 出荷量の入力を処理
  const handleInputChange = (e, company, riceType) => {
    const value = parseFloat(e.target.value);
    setQuantities((prev) => ({
      ...prev,
      [company]: {
        ...prev[company],
        [riceType]: isNaN(value) ? 0 : value,
      },
    }));
  };

  const balesToKg = (bales) => bales * 60;

  const calculateProfit = (company, riceType) => {
    const pricePer60kg = prices[company][riceType];
    const quantityInBales = quantities[company][riceType];
    const totalPrice = balesToKg(quantityInBales) / 60 * pricePer60kg;
    return totalPrice;
  };

  const calculateTotalProfit = () => {
    let totalProfit = 0;
    Object.keys(prices).forEach((company) => {
      Object.keys(prices[company]).forEach((riceType) => {
        totalProfit += calculateProfit(company, riceType);
      });
    });
    return totalProfit.toLocaleString();
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">米の利益計算</h1>

      {/* データの表示 */}
      <h2 className="text-lg font-bold">生産データ</h2>
      <table className="table-auto w-full mb-4">
        <thead>
          <tr>
            <th className="px-4 py-2">品種</th>
            <th className="px-4 py-2">面積 (ha)</th>
            <th className="px-4 py-2">収穫量 (俵)</th>
            <th className="px-4 py-2">フレコン本数</th>
            <th className="px-4 py-2">ピンハネ後</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(riceData).map((riceType) => (
            <tr key={riceType}>
              <td className="border px-4 py-2">{riceType}</td>
              <td className="border px-4 py-2">{riceData[riceType].areaHa}</td>
              <td className="border px-4 py-2">{riceData[riceType].yieldBales}</td>
              <td className="border px-4 py-2">{riceData[riceType].flaconTotal || 'N/A'}</td>
              <td className="border px-4 py-2">{riceData[riceType].flaconAfterReduction || 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 出荷量の入力と利益計算 */}
      <h2 className="text-lg font-bold">出荷量の入力と利益計算</h2>
      <table className="table-auto w-full mb-6">
        <thead>
          <tr>
            <th className="px-4 py-2">品種</th>
            <th className="px-4 py-2">買取業者</th>
            <th className="px-4 py-2">出荷量（俵数）</th>
            <th className="px-4 py-2">利益 (円)</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(prices).map((company) =>
            Object.keys(prices[company]).map((riceType) => (
              <tr key={`${company}-${riceType}`}>
                <td className="border px-4 py-2">{riceType}</td>
                <td className="border px-4 py-2">{company}</td>
                <td className="border px-4 py-2">
                  <input
                    type="number"
                    value={quantities[company][riceType]}
                    onChange={(e) => handleInputChange(e, company, riceType)}
                    className="border p-2"
                    placeholder="俵数を入力"
                  />
                </td>
                <td className="border px-4 py-2">
                  {calculateProfit(company, riceType).toLocaleString()} 円
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <h2 className="text-lg font-bold">合計利益: {calculateTotalProfit()} 円</h2>
    </div>
  );
}

export default RiceProfitCalculator;
