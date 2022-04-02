// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { db } from './database/mongodb';

export default async function handler(req, res) {
  console.log(typeof req.body, req.body);
  switch (req.method) {
    case 'POST':
      const body = req.body.song;
      const song = {
        streamId: body.songId,
        likes: body.likes,
        streamNumber: body.streamNumber,
        streamHours: body.streamHours,
        isBestStreamed: body.isBestStreamed,
      };

      console.log('user name', body.user);

      await db.collection('users').updateOne(
        { user: body.user },
        {
          $push: { songs: song },
        },
      );
      res.status(200).json({ successFullyUploaded: true });

      break;
    case 'GET':
      res.status(200).json({ name: 'John Doe' });
      break;
  }
}