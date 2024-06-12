import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const connect = () => MongoClient.connect(process.env.MONGO_URL);

const startBattle = async () => {
  try {
    const connection = await connect();

    const collection = connection.db('AI-BATTLE').collection('Battles');
    const result = await collection.insertOne({
      round_1: {
        model_a: null,
        model_b: null,
        winner: null,
        judge: 'user',
        prompt: null,
        model_a_answer: null,
        model_b_answer: null,
      },
      round_2: {
        model_a: null,
        model_b: null,
        winner: null,
        judge: 'user',
        prompt: null,
        model_a_answer: null,
        model_b_answer: null,
      },
      round_3: {
        model_a: null,
        model_b: null,
        winner: null,
        judge: 'user',
        prompt: null,
        model_a_answer: null,
        model_b_answer: null,
      },
      round_4: {
        model_a: null,
        model_b: null,
        winner: null,
        judge: 'user',
        prompt: null,
        model_a_answer: null,
        model_b_answer: null,
      },
    });

    connection.close();

    return result.insertedId;
  } catch (error) {
    console.error(error);
    throw new Error('DB error');
  }
};

export default startBattle;
