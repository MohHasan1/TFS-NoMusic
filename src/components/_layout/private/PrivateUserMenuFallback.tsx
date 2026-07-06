import { Avatar, AvatarFallback } from "#components/ui/avatar";
import { Button } from "#components/ui/button";

export function PrivateUserMenuFallback() {
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      className="pointer-events-none rounded-full"
      aria-hidden="true"
      tabIndex={-1}
    >
      <Avatar>
        <AvatarFallback>...</AvatarFallback>
      </Avatar>
    </Button>
  );
}
