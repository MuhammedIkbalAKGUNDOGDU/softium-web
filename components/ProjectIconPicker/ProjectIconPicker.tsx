'use client';

const AVAILABLE_ICONS = [
  { code: 'hub', label: 'Network / Hub', category: 'Infrastructure' },
  { code: 'neurology', label: 'AI / Brain', category: 'Intelligence' },
  { code: 'security', label: 'Shield / Security', category: 'Safety' },
  { code: 'cloud_sync', label: 'Cloud / Sync', category: 'Cloud' },
  { code: 'developer_board', label: 'Platform / Board', category: 'Engineering' },
  { code: 'query_stats', label: 'Analytics / Stats', category: 'Data' },
  { code: 'rocket_launch', label: 'Launch / Start', category: 'Action' },
  { code: 'database', label: 'Database', category: 'Data' },
  { code: 'monitoring', label: 'Monitoring', category: 'Infrastructure' },
  { code: 'api', label: 'API Connection', category: 'Integration' },
  { code: 'auto_awesome', label: 'Automation / Sparkle', category: 'Intelligence' },
  { code: 'shield_lock', label: 'Secure Lock', category: 'Safety' },
  { code: 'terminal', label: 'Terminal / CLI', category: 'Engineering' },
  { code: 'memory', label: 'Memory / CPU', category: 'Engineering' },
  { code: 'layers', label: 'Layers / Stack', category: 'Infrastructure' },
];

interface IconPickerProps {
  value: string;
  onChange: (code: string) => void;
}

export default function ProjectIconPicker({ value, onChange }: IconPickerProps) {
  return (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(5, 1fr)', 
      gap: '0.5rem', 
      padding: '1rem', 
      background: '#fff', 
      border: '1px solid #e2e8f0', 
      borderRadius: '0.75rem' 
    }}>
      {AVAILABLE_ICONS.map((icon) => (
        <button
          key={icon.code}
          type="button"
          onClick={() => onChange(icon.code)}
          title={icon.label}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0.75rem 0.5rem',
            border: '2px solid',
            borderColor: value === icon.code ? 'var(--primary)' : 'transparent',
            borderRadius: '0.5rem',
            background: value === icon.code ? 'rgba(19, 91, 236, 0.05)' : 'transparent',
            cursor: 'pointer',
            transition: 'all 0.2s',
            gap: '0.25rem'
          }}
        >
          <span className="material-symbols-outlined" style={{ 
            fontSize: '24px', 
            color: value === icon.code ? 'var(--primary)' : '#64748b' 
          }}>
            {icon.code}
          </span>
          <span style={{ 
            fontSize: '10px', 
            color: '#94a3b8',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            width: '100%'
          }}>
            {icon.label.split(' / ')[0]}
          </span>
        </button>
      ))}
    </div>
  );
}
