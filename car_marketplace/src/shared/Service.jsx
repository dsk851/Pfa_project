const FormatResult = (resp) => {
  let result = [];
  let finalResult = [];

  resp.forEach((item) => {
    const listingId = item.car_listing?.id;
    if (!result[listingId]) {
      result[listingId] = {
        car: item.car_listing,
        images: [],
      };
    }

    if (item.car_images) {
      result[listingId].images.push(item.car_images);
    }
  });

  result.forEach((item) => {
    finalResult.push({
      ...item.car,
      images: item.images,
    });
  });

  return finalResult;
};

export default FormatResult;
