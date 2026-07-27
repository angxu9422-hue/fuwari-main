export async function onRequest(context) {
  const baseUrl = "http://123.207.220.12/bg-images/";
  
  try {
    const listRes = await fetch(baseUrl + "list.json", {
      headers: { "Cache-Control": "no-cache" }
    });
    
    if (!listRes.ok) {
      throw new Error("Failed to fetch image list");
    }
    
    const images = await listRes.json();
    
    if (!Array.isArray(images) || images.length === 0) {
      throw new Error("Empty image list");
    }
    
    const imgName = images[Math.floor(Math.random() * images.length)];
    const imgUrl = baseUrl + imgName;
    
    const imgRes = await fetch(imgUrl);
    
    if (!imgRes.ok) {
      throw new Error("Image fetch failed: " + imgUrl);
    }
    
    const contentType = imgRes.headers.get("Content-Type") || "image/jpeg";
    const body = await imgRes.arrayBuffer();
    
    return new Response(body, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "no-cache, no-store, must-revalidate",
        "Pragma": "no-cache",
        "Expires": "0",
      },
    });
  } catch (error) {
    return new Response("Error: " + error.message, { status: 500 });
  }
}