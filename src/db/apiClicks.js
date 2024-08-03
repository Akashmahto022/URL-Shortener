import supabase from "./supaBase";

export async function getClicksOfUrls(urlsIds) {
  const { data, error } = await supabase.from("clicks").select("*").in("url_id", urlsIds)


  if (error) {
    console.error(error.message);
    throw new Error("unable to load clicks");
  }
  return data;
}
