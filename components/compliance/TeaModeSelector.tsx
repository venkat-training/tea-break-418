import { Select } from '@/components/ui/select';

const modes = ['English Breakfast', 'Masala Chai', 'Earl Grey', 'Green Tea', 'Herbal Infusion'] as const;

export function TeaModeSelector({ value, onChange }: { value: string; onChange: (mode: string) => void }) {
  return (
    <label className='grid gap-2 text-sm'>
      Tea Mode
      <Select value={value} onChange={(e) => onChange(e.target.value)} aria-label='Tea mode'>
        {modes.map((mode) => (
          <option key={mode}>{mode}</option>
        ))}
      </Select>
    </label>
  );
}
