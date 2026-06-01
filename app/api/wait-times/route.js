export async function GET() {
  const response = await fetch(
    "https://queue-times.com/parks/64/queue_times.json",
    { next: { revalidate: 60 } }
  );

  const data = await response.json();
  return Response.json(data);
}
