import { db, initializeDB } from '../../database/mongodb';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    await initializeDB();
    console.log(req.body);
    const user = await db
      .collection('users')
      .find({ email: req.body.email })
      .toArray();

    if (user.length === 0) {
      res.json({
        status: 404,
        message: 'user not found',
      });
    } else {
      res.json({
        status: 302,
        message: 'user found',
        user: user[0],
      });
    }
  }
}
