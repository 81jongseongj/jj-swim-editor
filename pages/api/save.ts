console.log("🔔 API /api/save 진입 성공");
import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { title, content, imageName } = req.body;
      const client = await clientPromise;
      const db = client.db('jj-swim');
      const collection = db.collection('contents');
      await collection.insertOne({ title, content, imageName, createdAt: new Date() });
      console.log('✅ DB 저장 성공');
      res.status(200).json({ message: '저장 성공' });
    } catch (error) {
      console.error('❌ DB 저장 오류:', error);
      res.status(500).json({ error: 'DB 저장 중 오류 발생' });
    }
  } else {
    res.status(405).json({ message: '허용되지 않은 메서드입니다.' });
  }
}
