/**
 * ShopPage - ML Coins Shop
 *
 * Features:
 * - Shop items grid (cosmetics, power-ups, premium content)
 * - Categories/filters
 * - Item details modal
 * - Purchase confirmation
 * - ML Coins balance display
 * - Transaction history
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  ShoppingCart,
  Search,
  Filter,
  Star,
  Sparkles,
  Crown,
  Palette,
  Users,
  Zap,
  Package,
  TrendingUp,
  Coins,
  Check,
  X,
  ShoppingBag,
} from 'lucide-react';

// Components
import { GamifiedHeader } from '@shared/components/layout/GamifiedHeader';
import { DetectiveCard } from '@shared/components/base/DetectiveCard';
import { Modal } from '@shared/components/common/Modal';

// Hooks
import { useShop } from '@/features/gamification/economy/hooks/useShop';
import { useCoins } from '@/features/gamification/economy/hooks/useCoins';
import type { ShopItem, ShopCategory, ItemRarity } from '@/features/gamification/economy/types/economyTypes';

// Utils
import { cn } from '@shared/utils/cn';

// Mock items for demonstration
const mockShopItems: ShopItem[] = [
  {
    id: '1',
    name: 'Golden Detective Badge',
    description: 'Show off your detective skills with this premium badge',
    category: 'cosmetics',
    price: 500,
    icon: '🏅',
    rarity: 'legendary',
    tags: ['badge', 'premium', 'golden'],
    isOwned: false,
    isPurchasable: true,
    metadata: {
      effectDescription: 'Displays a golden badge on your profile',
      stackable: false,
      tradeable: false,
    },
  },
  {
    id: '2',
    name: 'XP Booster',
    description: 'Double XP for 24 hours',
    category: 'premium',
    price: 300,
    icon: '⚡',
    rarity: 'epic',
    tags: ['booster', 'xp', 'powerup'],
    isOwned: false,
    isPurchasable: true,
    metadata: {
      effectDescription: '2x XP for 24 hours',
      duration: 1,
      stackable: true,
    },
  },
  // Add more mock items as needed
];

export default function ShopPage() {
  const navigate = useNavigate();

  // Hooks
  const { balance } = useCoins();

  // State
  const [selectedCategory, setSelectedCategory] = useState<ShopCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'price_asc' | 'price_desc' | 'rarity'>('rarity');
  const [selectedItem, setSelectedItem] = useState<ShopItem | null>(null);
  const [showItemModal, setShowItemModal] = useState(false);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [cart, setCart] = useState<ShopItem[]>([]);

  // Mock user data
  const user = {
    email: 'detective@glit.com',
    full_name: 'Marie Curie',
    id: 'user-1',
  };

  // Categories
  const categories: { value: ShopCategory | 'all'; label: string; icon: React.ElementType; color: string }[] = [
    { value: 'all', label: 'All Items', icon: Package, color: 'from-gray-500 to-gray-600' },
    { value: 'cosmetics', label: 'Cosmetics', icon: Palette, color: 'from-pink-500 to-purple-500' },
    { value: 'profile', label: 'Profile', icon: Users, color: 'from-blue-500 to-cyan-500' },
    { value: 'guild', label: 'Guild', icon: Crown, color: 'from-yellow-500 to-orange-500' },
    { value: 'premium', label: 'Premium', icon: Sparkles, color: 'from-purple-500 to-indigo-500' },
    { value: 'social', label: 'Social', icon: Star, color: 'from-green-500 to-emerald-500' },
  ];

  // Filter items
  const filteredItems = mockShopItems.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  }).sort((a, b) => {
    if (sortBy === 'price_asc') return a.price - b.price;
    if (sortBy === 'price_desc') return b.price - a.price;
    // Rarity sort
    const rarityOrder = { legendary: 0, epic: 1, rare: 2, common: 3 };
    return rarityOrder[a.rarity] - rarityOrder[b.rarity];
  });

  // Get rarity color
  const getRarityColor = (rarity: ItemRarity) => {
    const colors = {
      common: 'from-gray-400 to-gray-500',
      rare: 'from-blue-400 to-blue-600',
      epic: 'from-purple-400 to-purple-600',
      legendary: 'from-yellow-400 to-orange-500',
    };
    return colors[rarity];
  };

  // Handle purchase
  const handlePurchase = (item: ShopItem) => {
    setSelectedItem(item);
    setShowPurchaseModal(true);
  };

  const confirmPurchase = async () => {
    if (!selectedItem) return;

    if (balance.current < selectedItem.price) {
      alert('Insufficient ML Coins!');
      return;
    }

    // Simulate purchase
    await new Promise(resolve => setTimeout(resolve, 500));

    setShowPurchaseModal(false);
    setSelectedItem(null);
    // Show success message
    alert(`Successfully purchased ${selectedItem.name}!`);
  };

  // Handle add to cart
  const addToCart = (item: ShopItem) => {
    if (!cart.find(i => i.id === item.id)) {
      setCart([...cart, item]);
    }
  };

  const removeFromCart = (itemId: string) => {
    setCart(cart.filter(i => i.id !== itemId));
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-detective-bg to-detective-bg-secondary">
      <GamifiedHeader user={user} onLogout={() => navigate('/login')} />

      <main className="detective-container py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-detective-text mb-2 flex items-center gap-3">
                <ShoppingBag className="w-10 h-10 text-detective-orange" />
                ML Coins Shop
              </h1>
              <p className="text-detective-text-secondary">
                Purchase items, power-ups, and premium content with your ML Coins
              </p>
            </div>

            {/* Balance Display */}
            <DetectiveCard hoverable={false} padding="sm">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-detective-gold to-yellow-500 rounded-full flex items-center justify-center">
                  <Coins className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-xs text-detective-text-secondary">Your Balance</p>
                  <p className="text-2xl font-bold text-detective-gold">{balance.current.toLocaleString()}</p>
                </div>
              </div>
            </DetectiveCard>
          </div>
        </div>

        {/* Categories */}
        <div className="mb-6 overflow-x-auto">
          <div className="flex gap-2">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = selectedCategory === cat.value;

              return (
                <motion.button
                  key={cat.value}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedCategory(cat.value)}
                  className={cn(
                    'flex items-center gap-2 px-4 py-3 rounded-lg font-semibold transition-all whitespace-nowrap',
                    isActive
                      ? `bg-gradient-to-r ${cat.color} text-white shadow-lg`
                      : 'bg-white text-detective-text hover:bg-detective-bg'
                  )}
                >
                  <Icon className="w-5 h-5" />
                  <span>{cat.label}</span>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Search and Sort */}
        <DetectiveCard hoverable={false} className="mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-detective-text-secondary" />
              <input
                type="text"
                placeholder="Search items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border-2 border-detective-orange/30 rounded-lg focus:outline-none focus:border-detective-orange"
              />
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-4 py-2 border-2 border-detective-orange/30 rounded-lg focus:outline-none focus:border-detective-orange"
            >
              <option value="rarity">Sort by Rarity</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
            </select>
            <button
              onClick={() => {/* Show cart */}}
              className="px-4 py-2 bg-detective-orange text-white rounded-lg hover:bg-detective-orange-dark transition-colors font-medium flex items-center gap-2"
            >
              <ShoppingCart className="w-5 h-5" />
              Cart ({cart.length})
            </button>
          </div>
        </DetectiveCard>

        {/* Items Grid */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <DetectiveCard className="h-full">
                  <div className="space-y-4">
                    {/* Item Header */}
                    <div className="flex items-start justify-between">
                      <div className={cn(
                        'w-16 h-16 bg-gradient-to-br rounded-lg flex items-center justify-center text-3xl',
                        getRarityColor(item.rarity)
                      )}>
                        {item.icon}
                      </div>
                      <span className={cn(
                        'px-2 py-1 rounded-full text-xs font-bold text-white',
                        getRarityColor(item.rarity).replace('from-', 'bg-').split(' ')[0]
                      )}>
                        {item.rarity.toUpperCase()}
                      </span>
                    </div>

                    {/* Item Info */}
                    <div>
                      <h3 className="font-bold text-detective-text text-lg mb-1">{item.name}</h3>
                      <p className="text-sm text-detective-text-secondary line-clamp-2">
                        {item.description}
                      </p>
                    </div>

                    {/* Price */}
                    <div className="flex items-center justify-between pt-2 border-t border-detective-bg">
                      <div className="flex items-center gap-1">
                        <Coins className="w-5 h-5 text-detective-gold" />
                        <span className="text-xl font-bold text-detective-text">{item.price}</span>
                      </div>

                      {item.isOwned ? (
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-sm font-medium flex items-center gap-1">
                          <Check className="w-4 h-4" />
                          Owned
                        </span>
                      ) : (
                        <button
                          onClick={() => handlePurchase(item)}
                          disabled={!item.isPurchasable || balance.current < item.price}
                          className={cn(
                            'px-4 py-2 rounded-lg font-medium transition-colors',
                            item.isPurchasable && balance.current >= item.price
                              ? 'bg-detective-orange text-white hover:bg-detective-orange-dark'
                              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                          )}
                        >
                          Buy Now
                        </button>
                      )}
                    </div>
                  </div>
                </DetectiveCard>
              </motion.div>
            ))}
          </div>
        ) : (
          <DetectiveCard hoverable={false}>
            <div className="text-center py-12">
              <Package className="w-16 h-16 text-detective-text-secondary/30 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-detective-text mb-2">No Items Found</h3>
              <p className="text-detective-text-secondary">
                Try adjusting your search or filters
              </p>
            </div>
          </DetectiveCard>
        )}

        {/* Purchase Modal */}
        <Modal
          isOpen={showPurchaseModal}
          onClose={() => setShowPurchaseModal(false)}
          title="Confirm Purchase"
        >
          {selectedItem && (
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-detective-bg rounded-lg">
                <div className={cn(
                  'w-16 h-16 bg-gradient-to-br rounded-lg flex items-center justify-center text-3xl flex-shrink-0',
                  getRarityColor(selectedItem.rarity)
                )}>
                  {selectedItem.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-detective-text text-lg">{selectedItem.name}</h3>
                  <p className="text-sm text-detective-text-secondary">{selectedItem.description}</p>
                </div>
              </div>

              {/* Price Summary */}
              <div className="space-y-2 p-4 bg-detective-bg rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-detective-text">Price:</span>
                  <span className="font-bold text-detective-text flex items-center gap-1">
                    <Coins className="w-4 h-4 text-detective-gold" />
                    {selectedItem.price}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-detective-text">Current Balance:</span>
                  <span className="font-bold text-detective-text flex items-center gap-1">
                    <Coins className="w-4 h-4 text-detective-gold" />
                    {balance.current}
                  </span>
                </div>
                <hr className="border-detective-bg" />
                <div className="flex items-center justify-between">
                  <span className="text-detective-text font-bold">Balance After:</span>
                  <span className={cn(
                    'font-bold flex items-center gap-1',
                    balance.current - selectedItem.price >= 0 ? 'text-green-600' : 'text-red-600'
                  )}>
                    <Coins className="w-4 h-4 text-detective-gold" />
                    {balance.current - selectedItem.price}
                  </span>
                </div>
              </div>

              {balance.current < selectedItem.price && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-800">
                  Insufficient ML Coins. Complete more exercises to earn coins!
                </div>
              )}

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowPurchaseModal(false)}
                  className="flex-1 px-4 py-2 bg-gray-200 text-detective-text rounded-lg hover:bg-gray-300 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmPurchase}
                  disabled={balance.current < selectedItem.price}
                  className={cn(
                    'flex-1 px-4 py-2 rounded-lg font-medium transition-colors',
                    balance.current >= selectedItem.price
                      ? 'bg-detective-orange text-white hover:bg-detective-orange-dark'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  )}
                >
                  Purchase
                </button>
              </div>
            </div>
          )}
        </Modal>
      </main>
    </div>
  );
}
