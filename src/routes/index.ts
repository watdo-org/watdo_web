export type Action = "set" | "end";
export type ScheduleEntry = [Action, string | null];

export interface BlockData {
  title: string;
  notes: string | null;
  tags: string[] | null;
  tasks: string[] | null;
  timezone: string | null;
  schedule: ScheduleEntry[];
}

export interface BlockJSON {
  id: string;
  owner_id: string;
  code: string;
  last_action: string | null;
  last_action_at: string | null;
  parsed: BlockData | null;
}
