'use client';
import { motion } from 'framer-motion';
import { MandiPrice } from '@/types/mandi.types';

interface PriceTableProps {
  prices: MandiPrice[];
  loading?: boolean;
}

export const PriceTable = ({ prices, loading }: PriceTableProps) => {
  if (loading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3, 4, 5].map((i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.1 }}
            className="skeleton h-14 rounded-xl"
          />
        ))}
      </div>
    );
  }

  if (prices.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card p-12 text-center"
      >
        <div className="text-5xl mb-4">📊</div>
        <h3 className="text-xl font-bold mb-2">No Price Data Found</h3>
        <p style={{ color: 'var(--text-secondary)' }}>
          Try adjusting your filters or check back later for updated prices.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="glass-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr style={{ background: 'var(--bg-muted)', borderBottom: '1px solid var(--bg-border)' }}>
              {['Commodity', 'Market', 'State / District', 'Min ₹', 'Max ₹', 'Modal ₹', 'Date'].map((h) => (
                <th key={h} className="px-4 py-3 text-left font-semibold whitespace-nowrap" style={{ color: 'var(--text-secondary)' }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {prices.map((price, i) => (
              <motion.tr
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                key={price._id || i}
                style={{ borderBottom: '1px solid var(--bg-border)' }}
                className="hover:bg-green-500/5 transition-colors"
              >
                <td className="px-4 py-3">
                  <div className="font-semibold">{price.commodity}</div>
                  {price.commodityHindi && (
                    <div className="text-xs" style={{ color: 'var(--text-muted)' }}>{price.commodityHindi}</div>
                  )}
                </td>
                <td className="px-4 py-3 whitespace-nowrap">{price.market}</td>
                <td className="px-4 py-3">
                  <div>{price.state}</div>
                  <div className="text-xs" style={{ color: 'var(--text-muted)' }}>{price.district}</div>
                </td>
                <td className="px-4 py-3 text-red-400 font-medium">₹{price.minPrice?.toLocaleString()}</td>
                <td className="px-4 py-3 text-green-400 font-medium">₹{price.maxPrice?.toLocaleString()}</td>
                <td className="px-4 py-3 font-bold gradient-text">₹{price.modalPrice?.toLocaleString()}</td>
                <td className="px-4 py-3 text-xs whitespace-nowrap" style={{ color: 'var(--text-muted)' }}>
                  {new Date(price.arrivalDate).toLocaleDateString('en-IN')}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="px-4 py-3 text-xs" style={{ color: 'var(--text-muted)', borderTop: '1px solid var(--bg-border)' }}>
        Showing {prices.length} records • Price per quintal • Source: data.gov.in Agmarknet
      </div>
    </div>
  );
};
