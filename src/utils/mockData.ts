
export const generateRandomMerchants = (count: number) => {
  const merchants = [];
  for (let i = 0; i < count; i++) {
    const totalDeposit = Math.floor(Math.random() * 1000000);
    const monthlyDeposit = Math.floor(Math.random() * 100000);
    const feeRate = (Math.random() * 0.1).toFixed(3);
    const totalCommission = Math.floor(totalDeposit * Number(feeRate));
    const monthlyCommission = Math.floor(monthlyDeposit * Number(feeRate));

    merchants.push({
      id: `M${String(i + 1).padStart(3, '0')}`,
      username: `merchant${i + 1}`,
      telegramId: `@merchant${i + 1}`,
      role: "merchant" as const,
      email: `merchant${i + 1}@example.com`,
      status: "active" as const,
      createdAt: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
      agentId: "A001",
      agentName: "agent1",
      gamePoints: Math.floor(Math.random() * 100000),
      usdtBalance: Math.floor(Math.random() * 10000),
      feeRate: Number(feeRate),
      featured: Math.random() > 0.5,
      totalDeposit,
      monthlyDeposit,
      totalCommission,
      monthlyCommission,
    });
  }
  return merchants;
};
