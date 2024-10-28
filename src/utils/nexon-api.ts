import { INpcShopRequestParams } from "@/interface/ncp-shop";
import axios from "axios";
import { Endpoint } from "@/interface/api-endpoint";
import { IAuctionRequestParams } from "@/interface/auction-list";

export default class NexonAPI {
  private readonly key = process.env.NEXT_PUBLIC_API_KEY;
  private readonly baseUrl = process.env.NEXT_PUBLIC_API_URL;
  private instance;

  constructor() {
    this.instance = axios.create({
      baseURL: this.baseUrl,
      headers: {
        "x-nxopen-api-key": this.key,
      },
    });
  }

  /**
   *
   * @param params
   * @returns
   */
  async getNpcShopList(params: INpcShopRequestParams) {
    const response = await this.instance.get(Endpoint.NPC_SHOP_LIST, {
      params: params,
    });
    return response.data;
  }

  /**
   * 
   * @param params 
   * @returns 
   */
  async getAuctionSearch(params: IAuctionRequestParams | undefined) {
    const response = await this.instance.get(Endpoint.AUCTION_LIST, {
        params: params,
    })
    return response.data;
  }
}
