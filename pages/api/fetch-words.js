import _ from "lodash";
import axios from "axios";
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
  try {
    const fetchedWord = await axios.get(process.env.WORD_API);

    const fetchedDef = await axios.get(
      `${process.env.DESC_API}${fetchedWord.data[0]}`
    );
    return res.status(200).json({
      definition: _.get(
        fetchedDef,
        "data[0].meanings[0].definitions[0].definition",
        "A short note serving as a reminder.A short note serving as a reminder.A short note serving as a reminder.A short note serving as a reminder."
      ),
      word: fetchedWord?.data[0] ?? "memoranda",
    });
  } catch (err) {
    return res
      .status(err.statusCode ?? 400)
      .json({ definition: null, word: null });
  }
}
