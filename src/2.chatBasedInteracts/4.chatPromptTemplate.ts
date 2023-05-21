/*
 * @Author: yeertesi
 * @Date: 2023-05-21 23:45:21
 * @LastEditTime: 2023-05-21 23:55:35
 * @LastEditors: yeertesi
 * @Description: 基于chat的prompt模版
 * @FilePath: /langChain/src/2.chatBasedInteracts/4.chatPromptTemplate.ts
 */
import { ChatOpenAI } from "langchain/chat_models/openai";
import {
  SystemMessagePromptTemplate,
  HumanMessagePromptTemplate,
  ChatPromptTemplate,
} from "langchain/prompts";
import "dotenv/config";
// 1. 创建一个聊天模型实例
const chat = new ChatOpenAI({ openAIApiKey: process.env.OPENAI_API_KEY, temperature: 0.9, modelName: "gpt-3.5-turbo" });

// 2. 创建一个chatPrompt模版，用于翻译内容
const translationPrompt = ChatPromptTemplate.fromPromptMessages([
  // 系统消息模版
  SystemMessagePromptTemplate.fromTemplate(
    "你是一个语言翻译小助手，可以将{input_language}翻译成{output_language}。"
  ),
  // 人类消息模版
  HumanMessagePromptTemplate.fromTemplate("{text}"),
]);

// 3. 生成prompt，并调用聊天模型
const responseA = await chat.generatePrompt([
  await translationPrompt.formatPromptValue({
    input_language: "汉语",
    output_language: "法语",
    text: "我喜欢编程",
  }),
]);

console.log(responseA);
// {
//   generations: [ [ [Object] ] ],
//   llmOutput: {
//     tokenUsage: { completionTokens: 7, promptTokens: 49, totalTokens: 56 }
//   }
// }
console.log(responseA.generations);
// [ [ { text: "J'aime programmer.", message: [AIChatMessage] } ] ]
console.log(responseA.generations[0]);
// [
//   {
//     text: "J'aime programmer.",
//     message: AIChatMessage { text: "J'aime programmer.", name: undefined }
//   }
// ]