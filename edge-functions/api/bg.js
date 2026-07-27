export async function onRequest(context) {
  const images = [
    "http://123.207.220.12/bg-images/bg1.jpg",
    "http://123.207.220.12/bg-images/bg2.jpg",
    "http://123.207.220.12/bg-images/bg3.jpg",
    "http://123.207.220.12/bg-images/bg4.jpg",
    "http://123.207.220.12/bg-images/bg5.jpg",
  ];
  
  const imgUrl = images[Math.floor(Math.random() * images.length)];
  const response = await fetch(imgUrl);
  
  if (!response.ok) {
    return new Response("Image fetch failed", { status: 500 });
  }
  
  const contentType = response.headers.get("Content-Type") || "image/jpeg";
  const body = await response.arrayBuffer();
  
  return new Response(body, {
    headers: {
      "Content-Type": contentType,
      "Cache-Control": "no-cache, no-store, must-revalidate",
      "Pragma": "no-cache",
      "Expires": "0",
    },
  });
}