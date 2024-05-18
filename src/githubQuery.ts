export default async function (query: string): Promise<any> {
  const res = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      Authorization: `bearer ${process.env.GH_TOKEN}`,
    },
    body: JSON.stringify({ query }).replace(/\\n/g, ''),
  });

  return res.json();
}
