import { db, initializeDB } from '../database/mongodb';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    await initializeDB();
    console.log('upload Artist', req.body);
    const artist_name = req.body.artistIds.artistName;
    const artist_profile = req.body.artistIds.artistProfileUrl;

    const isArtistExist = async () => {
      const artist = await db
        .collection('artists')
        .find({ artist_name: artist_name })
        .toArray();

      if (artist.length === 0) return false;
      return true;
    };

    if (!(await isArtistExist())) {
      await db.collection('artists').insertOne({
        id: req.body.id,
        artist_name: artist_name,
        artist_profile: artist_profile,
        likes: 0,
      });

      res.status(200).json('succefully added');
    } else {
      res.status(500).json('server error');
    }
  }
}
