import { Address } from "react-daum-postcode";

declare global {
  export namespace kakao.maps.services {
    export class Geocoder {
      constructor();
      addressSearch(
        address: string,
        callback: (
          result: {
            address: {
              address_name: string;
              b_code: string;
              h_code: string;
              main_address_no: string;
              mountain_yn: string;
              region_1depth_name: string;
              region_2depth_name: string;
              region_3depth_h_name: string;
              region_3depth_name: string;
              sub_address_no: string;
              x: string;
              y: string;
            };
            address_name: string;
            address_type: "ROAD_ADDR" | "REGION_ADDR" | "REGION" | "ROAD";
            road_address: {
              address_name: string;
              building_name: string;
              main_building_no: string;
              region_1depth_name: string;
              region_2depth_name: string;
              region_3depth_name: string;
              road_name: string;
              sub_building_no: string;
              underground_yn: string;
              x: string;
              y: string;
              zone_no: string;
            };
            x: string;
            y: string;
          }[],
          status: keyof typeof Status
        ) => void
      ): void;
    }
    export const Status = {
      OK: "OK",
      ZERO_RESULT: "ZERO_RESULT",
      ERROR: "ERROR",
    } as const;
  }
}
