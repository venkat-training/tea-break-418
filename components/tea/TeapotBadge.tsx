import { Badge } from '@/components/ui/badge';

export function TeapotBadge() {
  return (
    <div className='flex items-center gap-3'>
      <Badge className='teapot-pulse'>
        🫖 HTTP 418 Governance Active
      </Badge>
      <span className='font-mono text-xs text-muted'>
        RFC 2324 · HTCPCP/1.0 · Tea-first architecture
      </span>
    </div>
  );
}