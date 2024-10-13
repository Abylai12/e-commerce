type comments = [
  {
    userName: string;
    description: string;
    rating: number;
  }
];

export const average = (arr: comments) => {
  let sum = 0;
  let num = 0;
  arr?.forEach(({ rating }) => {
    if (rating > 0) {
      sum += rating;
      num += 1;
    }
  });

  const ratingAVG = Math.ceil(sum / num);
  return ratingAVG;
};
