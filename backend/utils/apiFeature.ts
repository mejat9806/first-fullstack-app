import { Request } from "express";

function applyFieldSelection(query: any, fieldsQuery: any) {
  if (fieldsQuery) {
    const fields = fieldsQuery.split(",").join(" ");
    // (fields, 'fields');
    return query.select(fields);
  }
  return query.select("-__v");
}
function applySorting(query: any, sortQuery: any) {
  // (sortQuery, 'sort');
  //sortQuery is the req.query.sort
  if (sortQuery) {
    console.log(sortQuery);
    const sortBy = sortQuery.split(",").join(" ");
    return query.sort(sortBy); //to get accending or descending use fieldname or -fieldname
  }
  return query.sort("createAt");
}
function applyPagination(query: any, pageQuery: any, limitQuery: any) {
  const page = pageQuery * 1 || 1;
  const limit = limitQuery * 1 || 5;
  const skip = (page - 1) * limit; //this used to get the previous page to skip
  return query.skip(skip).limit(limit);
}

export async function apiFeatures(
  query: any,
  req: Request,
  author: string,
  select: string,
) {
  const queryObject = { ...req.query };
  const excludedFields = ["page", "sort", "limit", "fields"];
  excludedFields.forEach((el) => delete queryObject[el]); //this will remove excludedFields from the query object because it will effect the find result
  let queryStr = JSON.stringify(queryObject);
  queryStr = queryStr.replace(/\b(gte|gte|lte|lt)\b/g, (match) => `$${match}`); //this is used to change normal gte/lte to mongoDB one with $
  query = query
    .find(JSON.parse(queryStr))
    .populate({
      path: author,
      select: select,
    })
    .lean();
  query = applyFieldSelection(query, req.query.fields);
  query = applySorting(query, req.query.sort);
  query = applyPagination(query, req.query.page, req.query.limit);

  return query;
}
