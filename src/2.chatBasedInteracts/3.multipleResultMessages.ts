/*
 * @Author: yeertesi
 * @Date: 2023-05-21 04:13:54
 * @LastEditTime: 2023-05-21 04:18:35
 * @LastEditors: yeertesi
 * @Description: 多组消息结果的聊天模式
 * @FilePath: /langChain/src/2.chatBasedInteracts/3.multipleResultMessages.ts
 */
import { ChatOpenAI } from "langchain/chat_models/openai";
import { HumanChatMessage, SystemChatMessage } from "langchain/schema";
import "dotenv/config";

// 1. 创建一个聊天模型实例
const chat = new ChatOpenAI({ openAIApiKey: process.env.OPENAI_API_KEY, temperature: 0.9, modelName: "gpt-3.5-turbo" });

// 2. 调用多个消息组聊天模型
const responseC = await chat.generate([
  [
    new SystemChatMessage(
      "你是一个翻译助手。你的工作是把汉语内容从汉语翻译为英文，或者将英文内容从英文翻译为汉语。"
    ),
    new HumanChatMessage(
      "Translate: I love programming."
    ),
  ],
  [
    new SystemChatMessage(
      "你是一个翻译助手。你的工作是把汉语内容从汉语翻译为英文，或者将英文内容从英文翻译为汉语。"
    ),
    new HumanChatMessage(
      "翻译：我爱编程。"
    ),
  ],
]);

console.log(responseC);
// {
//   generations: [ [ [Object] ], [ [Object] ] ],
//   llmOutput: {
//     tokenUsage: { completionTokens: 14, promptTokens: 154, totalTokens: 168 }
//   }
// }

console.log(responseC.generations);
// [
//   [ { text: '我喜爱编程。', message: [AIChatMessage] } ],
//   [ { text: 'Translation: I love coding.', message: [AIChatMessage] } ]
// ]

console.log(responseC.generations[0]);
// [
//   {
//     text: '我喜爱编程。',
//     message: AIChatMessage { text: '我喜爱编程。', name: undefined }
//   }
// ]