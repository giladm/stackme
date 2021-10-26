// StackJsonInterface Stackoverflow json structure
export interface Stackoverflow {
  items?: (ItemsEntity)[] | null;
  has_more: boolean;
  quota_max: number;
  quota_remaining: number;
}
export interface ItemsEntity {
  tags?: (string)[] | null;
  owner: Owner;
  is_answered: boolean;
  view_count: number;
  answer_count: number;
  score: number;
  last_activity_date: number;
  creation_date: number;
  question_id: number;
  content_license: string;
  link: string;
  title: string;
  last_edit_date?: number | null;
  accepted_answer_id?: number | null;
}
export interface Owner {
  account_id: number;
  reputation: number;
  user_id: number;
  user_type: string;
  accept_rate: number;
  profile_image: string;
  display_name: string;
  link: string;
}
export interface QuestionsDisplay {
  title: string;
  link: string;
  view_count: number;
  is_answered: boolean;
  creation_date: number;
  answer_count: number;
}