'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { DiseaseReport, SEVERITY_CONFIG } from '@/types/disease.types';
import { Badge } from '@/components/ui/Badge';

interface DetectionResultProps {
  report: DiseaseReport;
}

export const DetectionResult = ({ report }: DetectionResultProps) => {
  const { diagnosis } = report;
  const severityConfig = SEVERITY_CONFIG[diagnosis.severity];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="glass-card p-6 space-y-4"
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-xl font-bold">{diagnosis.disease}</h2>
          {diagnosis.diseaseHindi && (
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{diagnosis.diseaseHindi}</p>
          )}
        </div>
        <Badge variant={diagnosis.isHealthy ? 'green' : diagnosis.severity === 'high' ? 'red' : 'yellow'}>
          {diagnosis.isHealthy ? '✅ Healthy' : `⚠️ ${severityConfig.label}`}
        </Badge>
      </div>

      {/* Confidence */}
      <div>
        <div className="flex justify-between text-sm mb-1">
          <span style={{ color: 'var(--text-secondary)' }}>AI Confidence</span>
          <span className="font-bold">{diagnosis.confidence}%</span>
        </div>
        <div className="h-2 rounded-full overflow-hidden" style={{ background: 'var(--bg-muted)' }}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${diagnosis.confidence}%` }}
            transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
            className="h-full rounded-full"
            style={{
              background: 'linear-gradient(90deg, var(--color-primary), var(--color-accent))',
            }}
          />
        </div>
      </div>

      {/* Image */}
      {report.imageUrl && (
        <div className="relative h-40 rounded-xl overflow-hidden">
          <Image src={report.imageUrl} alt="Crop" fill className="object-cover" />
        </div>
      )}

      {!diagnosis.isHealthy && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="space-y-4">
          {/* Symptoms */}
          {diagnosis.symptoms?.length > 0 && (
            <div>
              <h3 className="font-semibold text-sm mb-2">🔍 Symptoms</h3>
              <ul className="space-y-1">
                {diagnosis.symptoms.map((s, i) => (
                  <li key={i} className="text-sm" style={{ color: 'var(--text-secondary)' }}>• {s}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Treatment */}
          {diagnosis.treatment?.length > 0 && (
            <div className="p-4 rounded-xl" style={{ background: 'rgba(34,197,94,0.05)', border: '1px solid rgba(34,197,94,0.15)' }}>
              <h3 className="font-semibold text-sm mb-2 text-green-400">💊 Treatment Steps</h3>
              <ul className="space-y-1">
                {diagnosis.treatment.map((t, i) => (
                  <li key={i} className="text-sm" style={{ color: 'var(--text-secondary)' }}>• {t}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Organic */}
          {diagnosis.organicRemedies?.length > 0 && (
            <div className="p-4 rounded-xl" style={{ background: 'rgba(245,158,11,0.05)', border: '1px solid rgba(245,158,11,0.15)' }}>
              <h3 className="font-semibold text-sm mb-2 text-amber-400">🌿 Organic Remedies</h3>
              <ul className="space-y-1">
                {diagnosis.organicRemedies.map((r, i) => (
                  <li key={i} className="text-sm" style={{ color: 'var(--text-secondary)' }}>• {r}</li>
                ))}
              </ul>
            </div>
          )}
        </motion.div>
      )}

      {diagnosis.isHealthy && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="p-4 rounded-xl text-center" style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)' }}>
          <p className="text-green-400 font-bold text-lg">🌱 Your crop is healthy!</p>
          <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>Continue your current care routine.</p>
        </motion.div>
      )}

      <p className="text-xs text-center" style={{ color: 'var(--text-muted)' }}>
        Crop: {report.cropType} • Analyzed by {report.aiModel} • {new Date(report.createdAt).toLocaleDateString('en-IN')}
      </p>
    </motion.div>
  );
};
