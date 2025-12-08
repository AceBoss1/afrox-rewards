// ============================================
// components/RulesTab.jsx
// ============================================

'use client';

export default function RulesTab() {
  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
      <h2 className="text-3xl font-bold mb-6 text-center">Official Rules</h2>
      <div className="max-w-4xl mx-auto">
        
        {/* Main Warning Banner */}
        <div className="bg-yellow-500/20 border-2 border-yellow-500/50 rounded-xl p-6 mb-8">
          <h3 className="text-2xl font-bold text-yellow-400 mb-3">
            ⚠️ NO PURCHASE NECESSARY TO ENTER OR WIN
          </h3>
          <p className="text-gray-300 text-lg">
            Free entry methods are always available and provide equal chances to win. 
            Purchasing subscriptions or spin tokens does NOT increase your giveaway odds.
          </p>
        </div>

        {/* Rules Content */}
        <div className="space-y-8">
          
          {/* Section 1 */}
          <section className="bg-white/5 rounded-xl p-6">
            <h3 className="text-xl font-bold mb-4 text-yellow-400">1. ELIGIBILITY</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-300">
              <li>Open to legal residents of countries where sweepstakes are legal</li>
              <li>Must be 18+ years old</li>
              <li>Employees and immediate family members of AfroX Community of Trust are ineligible</li>
              <li>Void where prohibited by law</li>
            </ul>
          </section>

          {/* Section 2 */}
          <section className="bg-white/5 rounded-xl p-6">
            <h3 className="text-xl font-bold mb-4 text-yellow-400">2. ENTRY PERIOD</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-300">
              <li>Ongoing draws every 4 hours (6 draws daily at 00:00, 04:00, 08:00, 12:00, 16:00, 20:00 UTC)</li>
              <li>Each draw is a separate promotion</li>
              <li>Entries reset after each draw</li>
              <li>Must be online and active to claim prizes</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="bg-white/5 rounded-xl p-6">
            <h3 className="text-xl font-bold mb-4 text-yellow-400">3. HOW TO ENTER (FREE METHODS)</h3>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-start gap-3">
                <span className="font-bold text-green-400">✓</span>
                <p><strong>Method 1:</strong> Automatic daily entry (1 per day) - no action required</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="font-bold text-green-400">✓</span>
                <p><strong>Method 2:</strong> Watch 3 advertisements (+1 entry)</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="font-bold text-green-400">✓</span>
                <p><strong>Method 3:</strong> Complete daily survey (+1 entry)</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="font-bold text-green-400">✓</span>
                <p><strong>Method 4:</strong> Social media share (+1 entry per day)</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="font-bold text-green-400">✓</span>
                <p><strong>Method 5:</strong> Referral program (+1 entry per active referral, one-time)</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="font-bold text-green-400">✓</span>
                <p><strong>Method 6:</strong> 7-day login streak (+3 bonus entries)</p>
              </div>
              <div className="mt-4 p-4 bg-red-500/20 border border-red-400 rounded-lg">
                <p className="font-bold text-red-400">
                  ⚠️ IMPORTANT: Maximum 10 entries per user per draw. NO PURCHASE INCREASES YOUR CHANCES OF WINNING.
                </p>
              </div>
            </div>
          </section>

          {/* Section 4 */}
          <section className="bg-white/5 rounded-xl p-6">
            <h3 className="text-xl font-bold mb-4 text-yellow-400">4. PRIZE DETAILS</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-300">
              <li>Prize per draw: 1,000,000,000 AfroX tokens (1 Billion)</li>
              <li>Approximate Retail Value (ARV): ~$10 USD (based on current market rate)</li>
              <li>Prize distribution per draw:
                <ul className="list-circle pl-6 mt-2 space-y-1">
                  <li>1st place: 500,000,000 AfroX (~$5 USD)</li>
                  <li>2nd place: 300,000,000 AfroX (~$3 USD)</li>
                  <li>3rd place: 200,000,000 AfroX (~$2 USD)</li>
                </ul>
              </li>
              <li>Prizes awarded as AfroX tokens to platform wallet</li>
              <li>Winners must convert tokens before withdrawal (5-10% conversion fee applies)</li>
              <li>Token value may fluctuate based on market conditions</li>
            </ul>
          </section>

          {/* Section 5 */}
          <section className="bg-white/5 rounded-xl p-6">
            <h3 className="text-xl font-bold mb-4 text-yellow-400">5. WINNER SELECTION</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-300">
              <li>Random drawing from all eligible entries using provably fair random number generation</li>
              <li>Winners must be online and active within 10 minutes of draw announcement</li>
              <li>10-minute claim window - unclaimed prizes trigger automatic redraw</li>
              <li>Multiple wins allowed (no limit on winning frequency)</li>
              <li>Winners verified for eligibility before prize distribution</li>
            </ul>
          </section>

          {/* Section 6 */}
          <section className="bg-white/5 rounded-xl p-6">
            <h3 className="text-xl font-bold mb-4 text-yellow-400">6. ODDS OF WINNING</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-300">
              <li>Odds depend on total number of entries received per draw</li>
              <li>Your odds = (Your entries ÷ Total entries) × 100%</li>
              <li>Live odds calculator available at the Giveaway page</li>
              <li>All eligible entries have equal probability of winning</li>
            </ul>
          </section>

          {/* Section 7 */}
          <section className="bg-white/5 rounded-xl p-6">
            <h3 className="text-xl font-bold mb-4 text-yellow-400">7. CONDITIONS</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-300">
              <li>Winners announced publicly (usernames only, no real names disclosed)</li>
              <li>Winners responsible for any applicable taxes on prizes</li>
              <li>AfroX reserves right to verify eligibility and request documentation</li>
              <li>Prizes non-transferable until after withdrawal from platform</li>
              <li>AfroX reserves right to disqualify any participant for violation of rules</li>
              <li>Decision of AfroX is final and binding</li>
            </ul>
          </section>

          {/* Section 8 */}
          <section className="bg-white/5 rounded-xl p-6">
            <h3 className="text-xl font-bold mb-4 text-yellow-400">8. SUBSCRIPTION SERVICES</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-300">
              <li>Premium and VIP subscriptions are separate from giveaway entry</li>
              <li>Subscriptions provide:
                <ul className="list-circle pl-6 mt-2 space-y-1">
                  <li>Enhanced spin frequency and multipliers</li>
                  <li>Ad reduction or removal</li>
                  <li>Tournament access (VIP only)</li>
                  <li>Cosmetic features (badges, avatars)</li>
                </ul>
              </li>
              <li className="font-bold text-yellow-400">
                SUBSCRIPTIONS DO NOT INCREASE GIVEAWAY ODDS OR ENTRY CHANCES
              </li>
            </ul>
          </section>

          {/* Section 9 */}
          <section className="bg-white/5 rounded-xl p-6">
            <h3 className="text-xl font-bold mb-4 text-yellow-400">9. TOKEN & PLATFORM DISCLAIMER</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-300">
              <li>AfroX is a utility token for platform engagement</li>
              <li>Tradeable on decentralized exchanges (UniSwap, AfroSwap)</li>
              <li>Platform does not guarantee token value or liquidity</li>
              <li>Platform is an entertainment and engagement service, NOT a gambling site</li>
              <li>AfroX has utility beyond giveaways (governance, staking, DeFi)</li>
              <li>Users responsible for understanding and complying with local laws</li>
            </ul>
          </section>

          {/* Section 10 */}
          <section className="bg-white/5 rounded-xl p-6">
            <h3 className="text-xl font-bold mb-4 text-yellow-400">10. DISPUTES</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-300">
              <li>Governed by the laws of the Community of Trust Decentralized Autonomous Organization (DAO)</li>
              <li>Any disputes subject to binding arbitration</li>
              <li>Arbitration proceedings conducted in accordance with DAO governance rules</li>
              <li>All decisions of the arbitration panel are final and binding</li>
            </ul>
          </section>

          {/* Section 11 */}
          <section className="bg-white/5 rounded-xl p-6">
            <h3 className="text-xl font-bold mb-4 text-yellow-400">11. CONTACT INFORMATION</h3>
            <div className="text-gray-300 space-y-2">
              <p><strong>Sponsor:</strong> AfroX DAO Community of Trust</p>
              <p><strong>Email:</strong> <a href="mailto:cot@afrox.one" className="text-yellow-400 hover:underline">cot@afrox.one</a></p>
              <p><strong>Website:</strong> <a href="https://rewards.afrox.one" className="text-yellow-400 hover:underline">rewards.afrox.one</a></p>
              <p><strong>Smart Contract:</strong> <code className="bg-black/30 px-2 py-1 rounded text-xs">0x08130635368aa28b217a4dfb68e1bf8dc525621c</code></p>
            </div>
          </section>

        </div>

        {/* Geographic Restrictions */}
        <div className="mt-8 bg-red-500/20 border-2 border-red-500/50 rounded-xl p-6">
          <h3 className="text-xl font-bold text-red-400 mb-4">🚫 GEOGRAPHIC RESTRICTIONS</h3>
          <div className="space-y-3 text-gray-300">
            <p><strong className="text-red-400">NOT AVAILABLE IN:</strong></p>
            <ul className="list-disc pl-6 space-y-1">
              <li>United States (all 50 states and territories)</li>
              <li>China, North Korea</li>
              <li>Iran, Syria, Cuba (OFAC sanctioned countries)</li>
              <li>United Arab Emirates, Qatar, Saudi Arabia</li>
              <li>Any jurisdiction where sweepstakes or online gaming is prohibited</li>
            </ul>
            <p className="mt-4 text-sm">
              Use of VPN or proxy services to bypass geographic restrictions is strictly prohibited and will result in immediate account termination and forfeiture of all balances.
            </p>
          </div>
        </div>

        {/* Age Verification */}
        <div className="mt-6 bg-orange-500/20 border-2 border-orange-500/50 rounded-xl p-6">
          <h3 className="text-xl font-bold text-orange-400 mb-3">🔞 AGE REQUIREMENT</h3>
          <p className="text-gray-300">
            You must be 18 years or older to participate. Age verification may be required before first withdrawal. 
            False age information will result in permanent ban and forfeiture of prizes.
          </p>
        </div>

        {/* Last Updated */}
        <div className="mt-6 text-center text-gray-500 text-sm">
          <p>Last Updated: December 8, 2024</p>
          <p>Version 1.0</p>
        </div>

      </div>
    </div>
  );
}
