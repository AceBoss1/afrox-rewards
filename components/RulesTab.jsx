'use client';

export default function RulesTab() {
  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
      <h2 className="text-3xl font-bold mb-6">Official Rules</h2>
      <div className="prose prose-invert max-w-none">
        <div className="bg-yellow-500/20 border border-yellow-500/50 rounded-xl p-6 mb-6">
          <h3 className="text-2xl font-bold text-yellow-400 mb-4">⚠️ NO PURCHASE NECESSARY TO ENTER OR WIN</h3>
          <p className="text-gray-300">Free entry methods are always available and provide equal chances to win.</p>
        </div>

        <section className="mb-8">
          <h3 className="text-xl font-bold mb-3">1. ELIGIBILITY</h3>
          <ul className="list-disc pl-6 space-y-2 text-gray-300">
            <li>Open to legal residents of countries where sweepstakes are legal</li>
            <li>Must be 18+ years old</li>
            <li>Employees/family of AfroX Community of Trust ineligible</li>
            <li>Void where prohibited by law</li>
          </ul>
        </section>

        <section className="mb-8">
          <h3 className="text-xl font-bold mb-3">2. HOW TO ENTER (FREE METHODS)</h3>
          <ul className="list-disc pl-6 space-y-2 text-gray-300">
            <li>Method 1: Automatic daily entry (1 per day)</li>
            <li>Method 2: Watch 3 advertisements (+1 entry)</li>
            <li>Method 3: Complete daily survey (+1 entry)</li>
            <li>Method 4: Social media share (+1 entry daily)</li>
            <li>Method 5: Referral program (+1 per active referral)</li>
            <li>Method 6: 7-day login streak (+3 entries)</li>
            <li className="font-bold text-yellow-400">NO PURCHASE INCREASES YOUR CHANCES</li>
          </ul>
        </section>

        <div className="bg-red-500/20 border border-red-500/50 rounded-xl p-6 mt-8">
          <h3 className="text-xl font-bold text-red-400 mb-3">🚫 NOT AVAILABLE IN:</h3>
          <p className="text-gray-300">United States, China, UAE, and other restricted jurisdictions.</p>
        </div>
      </div>
    </div>
  );
}
