export const slugCreate = (productTitle) => {
  // Convert the product title to lowercase
  let slug = productTitle.toLowerCase();

  // Remove special characters and replace spaces with hyphens
  slug = slug
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

  return slug;
};
