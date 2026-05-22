'use client';
import { motion } from 'framer-motion';
import { CropResult } from '@/types/crop.types';
import { Badge } from '@/components/ui/Badge';

interface CropCardProps {
  crop: CropResult;
  rank: number;
}

export const CropCard = ({ crop, rank }: CropCardProps) => {
  const confidenceColor = crop.confidence >= 85 ? 'green' : crop.confidence >= 70 ? 'yellow' : 'red';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: rank * 0.1 }}
      className="glass-card p-5 hover:border-green-500/30 transition-colors"
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl font-bold gradient-text">#{rank}</span>
            <h3 className="text-lg font-bold">{crop.crop}</h3>
            {crop.cropHindi && (
              <span className="text-sm" style={{ color: 'var(--text-muted)' }}>({crop.cropHindi})</span>
            )}
          </div>
          <div className="flex gap-2 flex-wrap">
            <Badge variant={confidenceColor as 'green' | 'yellow' | 'red'}>
              ✅ {crop.confidence}% match
            </Badge>
            <Badge variant="blue">
              💰 ₹{crop.marketPrice?.toLocaleString()}/qtl
            </Badge>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-3 text-sm">
        {[
          { label: 'Yield', value: crop.expectedYield },
          { label: 'Duration', value: crop.growthDuration },
          { label: 'Water', value: crop.waterRequirement },
          { label: 'Profit', value: `₹${crop.profitEstimate?.toLocaleString()}/acre`, highlight: true },
        ].map((item) => (
          <div key={item.label} className="p-2 rounded-lg" style={{ background: 'var(--bg-muted)' }}>
            <span style={{ color: 'var(--text-muted)' }}>{item.label}: </span>
            <span className={`font-medium ${item.highlight ? 'text-green-400' : ''}`}>{item.value}</span>
          </div>
        ))}
      </div>

      {crop.tips?.length > 0 && (
        <div>
          <p className="text-xs font-semibold mb-1" style={{ color: 'var(--text-muted)' }}>💡 Key Tips:</p>
          <ul className="space-y-1">
            {crop.tips.slice(0, 2).map((tip, i) => (
              <li key={i} className="text-xs" style={{ color: 'var(--text-secondary)' }}>• {tip}</li>
            ))}
          </ul>
        </div>
      )}
    </motion.div>
  );
};
