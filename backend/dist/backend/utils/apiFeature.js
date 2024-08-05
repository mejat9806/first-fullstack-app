function applyFieldSelection(query, fieldsQuery) {
  if (fieldsQuery) {
    const fields = fieldsQuery.split(",").join(" ");
    // (fields, 'fields');
    return query.select(fields);
  }
  return query.select("-__v");
}
function applySorting(query, sortQuery) {
  // (sortQuery, 'sort');
  //sortQuery is the req.query.sort
  if (sortQuery) {
    console.log(sortQuery);
    const sortBy = sortQuery.split(",").join(" ");
    return query.sort(sortBy); //to get accending or descending use fieldname or -fieldname
  }
  return query.sort("-createAt"); //this will sort descending order
}
function applyPagination(query, pageQuery, limitQuery) {
  const page = pageQuery * 1 || 1;
  const limit = limitQuery * 1 || 20;
  const skip = (page - 1) * limit; //this used to get the previous page to skip
  return query.skip(skip).limit(limit);
}
export async function apiFeatures(
  query, // this is the Model we want to operate on
  req, // this is the request
  populateOption,
  select,
  followingID,
) {
  console.log(req.query, "req.query");
  const populateOptions = populateOption.split(" ");
  const queryObject = { ...req.query };
  const excludedFields = ["page", "sort", "limit", "fields", "search"]; // need to exclude because it will interfere with mongo query
  excludedFields.forEach((el) => delete queryObject[el]); // this will remove excludedFields from the query object because it will affect the find result of the find operation
  console.log(queryObject);
  let queryStr = JSON.stringify(queryObject);
  queryStr = queryStr.replace(/\b(gte|gte|lte|lt)\b/g, (match) => `$${match}`); // this is used to change normal gte/lte to mongoDB one with $
  let mongoQuery = { ...JSON.parse(queryStr) };
  if (followingID) {
    console.log(followingID, "following here");
    mongoQuery = { ...mongoQuery, author: { $in: followingID } };
  }
  query = query.find(mongoQuery).populate({
    path: populateOptions[0],
    select: select,
  });
  if (populateOptions[1]) {
    query = query.populate({
      path: populateOptions[1],
    });
  }
  query = applyFieldSelection(query, req.query.fields);
  query = applySorting(query, req.query.sort);
  query = applyPagination(query, req.query.page, req.query.limit);
  return query;
}
