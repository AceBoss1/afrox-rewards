'use client';

import { useState } from 'react';
import { Camera, Edit3, Award, TrendingUp, Calendar } from 'lucide-react';

export default function ProfileTab({ userData, updateUserData, userTier }) {
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [newUsername, setNewUsername] = useState(userData.username);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [accountId] = useState(`AFX-${Math.floor(Math.random() * 100000)}`); // Static ID

  const canChangeUsername = userTier === 'premium' || userTier === 'vip';
  const canChangeImage = userTier === 'vip';
  const unlimitedUsernameChanges = userTier === 'vip';

  const handleUsernameChange = () => {
    // Validate username
    if (newUsername.length < 3 || newUsername.length > 15) {
      alert('Username must be 3-15 characters');
      return;
    }

    if (!/^[a-zA-Z0-9_]+$/.test(newUsername)) {
      alert('Username can only contain letters, numbers, and underscores');
      return;
    }

    updateUserData({ username: newUsername });
    setIsEditingUsername(false);
    alert('Username updated successfully!');
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file
    if (file.size > 2 * 1024 * 1024) {
      alert('Image must be less than 2MB');
      return;
    }

    if (!['image/jpeg', 'image/png'].includes(file.type)) {
      alert('Only JPG and PNG images are allowed');
      return;
    }

    setUploadingImage(true);

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
      updateUserData({ winningBadge: reader.result });
      setUploadingImage(false);
      alert('Profile image updated!');
    };
    reader.readAsDataURL(file);
  };

  const formatNumber = (num) => {
    return num.toLocaleString();
  };

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="bg-gradient-to-br from-purple-500/20 to-blue-500/20 backdrop-blur-sm rounded-xl p-8 border border-white/10">
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Profile Image */}
          <div className="relative">
            <div className="w-32 h-32 rounded-full border-4 border-yellow-400 overflow-hidden bg-slate-800">
              <img 
                src={imagePreview || userData.winningBadge || '/afrodex_token.png'} 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            </div>
            
            {canChangeImage && (
              <label className="absolute bottom-0 right-0 bg-yellow-500 text-black p-2 rounded-full cursor-pointer hover:bg-yellow-400 transition">
                <Camera className="w-5 h-5" />
                <input 
                  type="file" 
                  accept="image/jpeg,image/png" 
                  onChange={handleImageUpload}
                  className="hidden"
                  disabled={uploadingImage}
                />
              </label>
            )}
            
            {!canChangeImage && (
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-gray-700 px-3 py-1 rounded-full text-xs whitespace-nowrap">
                {userTier === 'premium' ? 'VIP Only' : 'Upgrade to VIP'}
              </div>
            )}
          </div>

          {/* User Info */}
          <div className="flex-1 text-center md:text-left">
            {/* Username Display/Edit */}
            {!isEditingUsername ? (
              <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                <h2 className="text-3xl font-bold">{userData.username}</h2>
                {canChangeUsername && (
                  <button 
                    onClick={() => setIsEditingUsername(true)}
                    className="text-yellow-400 hover:text-yellow-300 transition"
                  >
                    <Edit3 className="w-5 h-5" />
                  </button>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2 mb-2">
                <input 
                  type="text"
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                  className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white"
                  placeholder="New username"
                  maxLength={15}
                />
                <button 
                  onClick={handleUsernameChange}
                  className="bg-green-500 hover:bg-green-400 px-4 py-2 rounded-lg font-bold transition"
                >
                  Save
                </button>
                <button 
                  onClick={() => {
                    setIsEditingUsername(false);
                    setNewUsername(userData.username);
                  }}
                  className="bg-gray-600 hover:bg-gray-500 px-4 py-2 rounded-lg font-bold transition"
                >
                  Cancel
                </button>
              </div>
            )}

            {!canChangeUsername && (
              <p className="text-sm text-gray-400 mb-2">
                {userTier === 'free' ? '🔒 Upgrade to Premium to change username' : ''}
              </p>
            )}

            {canChangeUsername && !unlimitedUsernameChanges && (
              <p className="text-sm text-orange-400 mb-2">
                ⚠️ Username changes: 1 per month
              </p>
            )}

            {unlimitedUsernameChanges && (
              <p className="text-sm text-green-400 mb-2">
                ✨ Unlimited username changes
              </p>
            )}

            {/* Tier Badge */}
            <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
              <span className={`px-4 py-1 rounded-full font-bold text-sm ${
                userTier === 'vip' ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-black' :
                userTier === 'premium' ? 'bg-gradient-to-r from-green-400 to-green-600 text-black' :
                'bg-gradient-to-r from-blue-400 to-blue-600 text-white'
              }`}>
                {userTier === 'vip' ? '👑 VIP' : userTier === 'premium' ? '⭐ PREMIUM' : '🆓 FREE'}
              </span>
              
              {userData.badges.includes('pro-spinner') && (
                <span className="px-3 py-1 bg-purple-500/20 border border-purple-400 rounded-full text-xs font-bold">
                  🏅 Pro-Spinner
                </span>
              )}
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-yellow-400">{formatNumber(userData.leaderboardPoints)}</p>
                <p className="text-xs text-gray-400">Points</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-400">#{userData.leaderboardRank}</p>
                <p className="text-xs text-gray-400">Rank</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-400">{userData.entries}</p>
                <p className="text-xs text-gray-400">Entries</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Activity Stats */}
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="w-6 h-6 text-green-400" />
            <h3 className="font-bold text-lg">Activity Stats</h3>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
              <span className="text-gray-400">Total Spins</span>
              <span className="font-bold text-xl">1,247</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
              <span className="text-gray-400">Total Wins</span>
              <span className="font-bold text-xl text-green-400">892</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
              <span className="text-gray-400">Win Rate</span>
              <span className="font-bold text-xl text-yellow-400">71.5%</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
              <span className="text-gray-400">Biggest Win</span>
              <span className="font-bold text-xl text-purple-400">1B AfroX</span>
            </div>
          </div>
        </div>

        {/* Account Info */}
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <Calendar className="w-6 h-6 text-blue-400" />
            <h3 className="font-bold text-lg">Account Info</h3>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
              <span className="text-gray-400">Member Since</span>
              <span className="font-bold">Dec 2024</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
              <span className="text-gray-400">Login Streak</span>
              <span className="font-bold text-orange-400">🔥 7 Days</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
              <span className="text-gray-400">Referrals</span>
              <span className="font-bold text-green-400">23</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
              <span className="text-gray-400">Account ID</span>
              <span className="font-mono text-xs text-gray-500">{accountId}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
        <div className="flex items-center gap-3 mb-4">
          <Award className="w-6 h-6 text-yellow-400" />
          <h3 className="font-bold text-lg">Achievements</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/5 p-4 rounded-lg text-center border border-yellow-400">
            <div className="text-3xl mb-2">🎯</div>
            <p className="text-sm font-bold">First Spin</p>
            <p className="text-xs text-gray-400">Completed</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg text-center border border-purple-400">
            <div className="text-3xl mb-2">💯</div>
            <p className="text-sm font-bold">100 Spins</p>
            <p className="text-xs text-gray-400">Completed</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg text-center border border-green-400">
            <div className="text-3xl mb-2">🏆</div>
            <p className="text-sm font-bold">Giveaway Winner</p>
            <p className="text-xs text-gray-400">Completed</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg text-center border border-white/20 opacity-50">
            <div className="text-3xl mb-2">👑</div>
            <p className="text-sm font-bold">Top 10</p>
            <p className="text-xs text-gray-400">Locked</p>
          </div>
        </div>
      </div>

      {/* Upgrade Prompt */}
      {userTier !== 'vip' && (
        <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/50 rounded-xl p-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h3 className="text-xl font-bold mb-2">
                🍀 Feeling lucky? Upgrade now!
              </h3>
              <p className="text-gray-300">
                Compare tiers and choose the best plan for you
              </p>
            </div>
            <button 
              onClick={() => setShowUpgradeModal(true)}
              className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-8 py-3 rounded-xl font-bold hover:from-yellow-500 hover:to-orange-600 transition"
            >
              Compare Tiers
            </button>
          </div>
        </div>
      )}

      {/* Upgrade Comparison Modal */}
      {showUpgradeModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-gradient-to-br from-slate-900 to-purple-900 rounded-2xl p-8 max-w-5xl w-full border-4 border-yellow-400 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold">Choose Your Tier</h2>
              <button 
                onClick={() => setShowUpgradeModal(false)}
                className="text-gray-400 hover:text-white text-2xl"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* FREE Tier */}
              <div className="bg-white/5 rounded-xl p-6 border-2 border-blue-400">
                <div className="text-center mb-4">
                  <h3 className="text-2xl font-bold text-blue-400">FREE</h3>
                  <p className="text-4xl font-bold mt-2">$0</p>
                  <p className="text-sm text-gray-400">forever</p>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2">
                    <span className="text-green-400">✓</span>
                    <span>1 spin per hour (168 spins/week)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400">✓</span>
                    <span>1x multiplier</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400">✓</span>
                    <span>Auto-generated username</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400">✓</span>
                    <span>Default profile image</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400">✓</span>
                    <span>Free hourly giveaway entries</span>
                  </li>
                </ul>
                {userTier === 'free' && (
                  <div className="bg-blue-500/20 text-center py-2 rounded-lg font-bold">
                    Current Plan
                  </div>
                )}
              </div>

              {/* PREMIUM Tier */}
              <div className="bg-white/5 rounded-xl p-6 border-2 border-green-400">
                <div className="text-center mb-4">
                  <h3 className="text-2xl font-bold text-green-400">PREMIUM</h3>
                  <p className="text-4xl font-bold mt-2">$7.20</p>
                  <p className="text-sm text-gray-400">per week</p>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2">
                    <span className="text-green-400">✓</span>
                    <span>1,008 spins/week</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400">✓</span>
                    <span>2x multiplier</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400">✓</span>
                    <span>Change username (1x/month)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400">✓</span>
                    <span>50% fewer ads</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400">✓</span>
                    <span>Priority support</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400">✓</span>
                    <span>Exclusive badge</span>
                  </li>
                </ul>
                {userTier === 'premium' ? (
                  <div className="bg-green-500/20 text-center py-2 rounded-lg font-bold">
                    Current Plan
                  </div>
                ) : (
                  <button className="w-full bg-green-500 hover:bg-green-400 text-white py-3 rounded-lg font-bold transition">
                    Upgrade to Premium
                  </button>
                )}
              </div>

              {/* VIP Tier */}
              <div className="bg-white/5 rounded-xl p-6 border-2 border-yellow-400 relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-yellow-400 text-black px-3 py-1 text-xs font-bold">
                  BEST VALUE
                </div>
                <div className="text-center mb-4">
                  <h3 className="text-2xl font-bold text-yellow-400">VIP</h3>
                  <p className="text-4xl font-bold mt-2">$20</p>
                  <p className="text-sm text-gray-400">per week</p>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2">
                    <span className="text-green-400">✓</span>
                    <span>3,500 spins/week</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400">✓</span>
                    <span>5x multiplier</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400">✓</span>
                    <span>Unlimited username changes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400">✓</span>
                    <span>Custom profile image</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400">✓</span>
                    <span>Zero ads</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400">✓</span>
                    <span>VIP tournaments</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400">✓</span>
                    <span>Yearly exclusive NFT</span>
                  </li>
                </ul>
                {userTier === 'vip' ? (
                  <div className="bg-yellow-500/20 text-center py-2 rounded-lg font-bold">
                    Current Plan
                  </div>
                ) : (
                  <button className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black py-3 rounded-lg font-bold transition">
                    Upgrade to VIP
                  </button>
                )}
              </div>
            </div>

            <div className="mt-6 text-center text-sm text-gray-400">
              <p>All tiers include free hourly giveaway entries. No purchase necessary to win.</p>
            </div>
          </div>
        </div>
      )}

      {/* Username Requirements */}
      {canChangeUsername && (
        <div className="bg-blue-500/10 border border-blue-400/30 rounded-xl p-4">
          <h4 className="font-bold mb-2">Username Requirements:</h4>
          <ul className="text-sm text-gray-300 space-y-1">
            <li>• 3-15 characters</li>
            <li>• Letters, numbers, and underscores only</li>
            <li>• No spaces or special characters</li>
            {!unlimitedUsernameChanges && <li>• Can change once per month (Premium)</li>}
            {unlimitedUsernameChanges && <li>• Unlimited changes (VIP)</li>}
          </ul>
        </div>
      )}

      {/* Image Requirements */}
      {canChangeImage && (
        <div className="bg-purple-500/10 border border-purple-400/30 rounded-xl p-4">
          <h4 className="font-bold mb-2">Profile Image Requirements:</h4>
          <ul className="text-sm text-gray-300 space-y-1">
            <li>• Maximum size: 2MB</li>
            <li>• Formats: JPG, PNG</li>
            <li>• Recommended: 512x512 pixels</li>
            <li>• Will be shown in win flash messages</li>
          </ul>
        </div>
      )}
    </div>
  );
}
