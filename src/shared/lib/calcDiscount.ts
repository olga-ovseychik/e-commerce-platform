export const calcDiscount = (originalPrice: number | null, discount: number) => {
  if (originalPrice) {
    return (originalPrice - (originalPrice * discount)).toFixed(2);
  }
}