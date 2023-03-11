import jwt from "jsonwebtoken";

export async function getUser(token) {
  console.log(token);
  if (!token) {
    return null;
  }

  try {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);

    return decoded.user;
  } catch (err) {
    console.log(err);
    return null;
  }
}
