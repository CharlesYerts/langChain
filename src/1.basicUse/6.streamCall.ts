/*
 * @Author: yeertesi
 * @Date: 2023-05-21 03:49:19
 * @LastEditTime: 2023-05-21 03:57:41
 * @LastEditors: yeertesi
 * @Description: 流式调用并展示结果
 * @FilePath: /langChain/src/basicUse/6.streamCall.ts
 */
import { OpenAI } from "langchain/llms/openai";
import "dotenv/config";

// 创建一个大型语言模型实例
const chat = new OpenAI({
  openAIApiKey: process.env.OPENAI_API_KEY,
  temperature: 0.9,
  modelName: "gpt-3.5-turbo",
  // 开启流式调用
  streaming: true,
  // 传入回调函数
  callbacks: [
    {
      handleLLMNewToken(token: string) {
        process.stdout.write(token);
      },
    },
  ],
});

await chat.call("给我写一个关于狗的故事，不低于300个字，用汉语回答")