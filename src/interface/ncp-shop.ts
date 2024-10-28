export type INpcName =
  | "델"
  | "델렌"
  | "상인 라누"
  | "상인 피루"
  | "모락"
  | "상인 아루"
  | "리나"
  | "상인 누누"
  | "상인 메루"
  | "켄"
  | "귀넥"
  | "얼리"
  | "데위"
  | "테일로"
  | "상인 세누"
  | "상인 베루"
  | "상인 에루"
  | "상인 네루"
  | "카디"
  | "인장 상인"
  | "피오나트";

export type IServerName = "류트" | "만돌린" | "하프" | "울프";

export interface INpcShopRequestParams {
  server_name: IServerName;
  channel: number;
  npc_name: INpcName;
}

export interface INpcShopParams {
  channel?: number;
  server_name?: IServerName;
  npc_name?: INpcName;
}

export type Shop = {
  tab_name: string;
  item: Item[];
}

export type Item = {
  item_display_name: string;
  item_count: number;
  limit_type: string | null;
  limit_value: number | null;
  image_url: string;
  price: Price[];
  item_option: ItemOption[];
}

export type Price = {
  price_type: string;
  price_value: number;
}

export type ItemOption = {
  option_desc: string | null;
  option_sub_type: string | null;
  option_type: string;
  option_value: string | null;
  option_value2: string | null;
}

export interface INpcShopResponse {
  date_inquire: string;
  date_shop_next_update: string;
  shop: Shop[];
  shop_tab_count: number;
}