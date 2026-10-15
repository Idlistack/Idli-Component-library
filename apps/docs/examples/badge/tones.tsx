import { Badge } from "@idlistack/ui";

export default function BadgeTones() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Badge tone="brand">Fundraising</Badge>
      <Badge tone="neutral">Open source</Badge>
      <Badge tone="info">Beta</Badge>
      <Badge tone="success" dot>
        Running
      </Badge>
      <Badge tone="warning" dot>
        Updating
      </Badge>
      <Badge tone="danger" dot>
        Down
      </Badge>
      <Badge tone="solid">New</Badge>
      <Badge tone="brand" size="sm">
        Small
      </Badge>
    </div>
  );
}
