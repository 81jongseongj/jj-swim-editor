import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { title, programType, level, schedule, capacity, equipment } = req.body;
      const client = await clientPromise;
      const db = client.db('jj-swim');
      const collection = db.collection('classes');

      await collection.insertOne({
        title,
        programType,
        level,
        schedule,
        capacity,
        equipment,
        enrolledMembers: [],
        createdAt: new Date(),
        updatedAt: new Date()
      });

      res.status(200).json({ message: '수업 등록 성공' });
    } catch (err) {
      console.error('❌ DB 오류:', err);
      res.status(500).json({ error: 'DB 오류 발생' });
    }
  } else {
    res.status(405).json({ message: '허용되지 않은 메서드' });
  }
}