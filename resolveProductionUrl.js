const baseURL =
  process.env.NODE_ENV === "production"
    ? "https://medina-blog.netlify.app"
    : "http://localhost:8000";

const isDraft = (id) => id.includes("drafts");

const previewDocuments = ["category"];

export default function resolveProductionUrl(document) {
  // First, we select a specific type of document
  if (previewDocuments.includes(document._type)) {
    let id = document._id;
    // if it's a draft, we split its _id with the "drafts." substring, which will return an array,
    // and get the second item in it, which will be the isolated _id without "drafts."
    if (isDraft(id)) {
      id = document._id.split("drafts.")[1];
    }
    // And return a template string reflecting the URL structure we want. In this case, we're doing a
    // simple conditional to return '&isDraft=true' as a param for drafts as we'll query them
    return `${baseURL}/preview/${id}${
      isDraft(document._id) ? "?isDraft=true" : ""
    }`;
  }
  return undefined;
}
