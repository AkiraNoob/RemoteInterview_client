import { province } from "~/data/province_data";

export function formatCurrency(price: number) {
  return price
    .toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    })
    .replace("₫", "VNĐ");
}

export function concatAddress(
  provinceId: string,
  districtId: string,
  address: string
) {
  return (
    address +
    `, ${
      province
        .find((item) => item.code.toString() === provinceId)
        ?.districts.find((item) => item.code.toString() === districtId)?.name
    }, ${province.find((item) => item.code.toString() === provinceId)?.name}`
  );
}
