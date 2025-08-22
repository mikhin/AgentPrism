import { MessageSquare, Plus } from "lucide-react";

import { Button } from "./Button.tsx";
import { IconButton } from "./IconButton.tsx";

export const DetailsViewHeaderActions = () => (
  <div className="flex items-center gap-2">
    <Button size="xs" iconStart={<Plus className="size-4" />}>
      Primary
    </Button>

    <Button variant="ghost" size="xs" iconStart={<Plus className="size-4" />}>
      Secondary
    </Button>

    <IconButton
      aria-label="Open chat with AI assistant (feature coming soon)"
      size="md"
    >
      <MessageSquare className="size-3 text-gray-500" />
    </IconButton>
  </div>
);
