/*
 * @Author: yeertesi
 * @Date: 2023-05-23 00:56:06
 * @LastEditTime: 2023-05-23 01:09:29
 * @LastEditors: yeertesi
 * @Description: 文件描述
 * @FilePath: /langChain/src/4.model/2.streaming.ts
 */
import { ChatOpenAI } from "langchain/chat_models/openai";
import { HumanChatMessage, SystemChatMessage } from "langchain/schema";
import "dotenv/config";

const chat = new ChatOpenAI({
  maxTokens: 25,
  openAIApiKey: process.env.OPENAI_API_KEY,
  temperature:1,
  modelName: "gpt-3.5-turbo",
});

const response = await chat.call(
  [new HumanChatMessage("Tell me a joke."),new SystemChatMessage('你回答的问题都应该用汉语回答')],
  undefined ,
  [
    {
      handleLLMNewToken(token: string) {
        console.log({ token });
      },
    },
  ]
);

console.log(response);