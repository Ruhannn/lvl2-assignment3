// eslint-disable-next-line  @typescript-eslint/no-explicit-any
const handleNoDataFound = (data: any[], title: string) => {
  if (data && data.length === 0) {
    return {
      success: false,
      statusCode: 404,
      message: "No Data Found",
      data: [],
    };
  } else {
    return {
      success: true,
      statusCode: 200,
      message: `${title} retrieved successfully`,
      data: data,
    };
  }
};

export default handleNoDataFound;
