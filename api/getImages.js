export default async function handler(req, res) {
  const { keyword = "", page = 0 } = req.query;

  const client_id = process.env.NAVER_CLIENT_ID;
  const client_secret = process.env.NAVER_CLIENT_SECRET;

  const response = await fetch(`https://openapi.naver.com/v1/search/image?query=${keyword}&display=16&start=${1+16*page}&sort=sim&filter=large`, {
    headers: {
      'X-Naver-Client-Id': client_id,
      'X-Naver-Client-Secret': client_secret
    }
  });

  const data = await response.json();
  res.status(200).json(data);
}