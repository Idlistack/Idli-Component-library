import { Avatar, AvatarGroup } from "@idlistack/ui";

export default function AvatarDefault() {
  return (
    <div className="flex flex-wrap items-center gap-6">
      <div className="flex items-end gap-3">
        <Avatar name="Asha Rao" size="xs" />
        <Avatar name="Asha Rao" size="sm" />
        <Avatar name="Asha Rao" size="md" />
        <Avatar name="Asha Rao" size="lg" />
      </div>
      <Avatar name="Vidhi Centre" shape="square" size="lg" />
      <AvatarGroup>
        <Avatar name="Asha Rao" size="sm" />
        <Avatar name="Rahul Menon" size="sm" />
        <Avatar name="Fatima Shaikh" size="sm" />
        <Avatar name="Karan Gill" size="sm" />
      </AvatarGroup>
    </div>
  );
}
