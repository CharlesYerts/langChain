/*
 * @Author: yeertesi
 * @Date: 2023-05-21 03:58:40
 * @LastEditTime: 2023-05-21 04:09:50
 * @LastEditors: yeertesi
 * @Description: 使用聊天式交互模式（不同身份）
 * 聊天模型是语言模型的一种变体。尽管聊天模型在内部使用语言模型，但它们提供的接口略有不同。
 * 与“输入文本，输出文本”API不同，聊天模型提供的接口是基于“聊天消息”的输入和输出。
 * @FilePath: /langChain/src/2.chatBasedInteracts/1.roleBasedMessages.ts
 */
import { ChatOpenAI } from "langchain/chat_models/openai";
import { HumanChatMessage, SystemChatMessage } from "langchain/schema";
import "dotenv/config";

// 1. 创建一个聊天模型实例
const chat = new ChatOpenAI({ openAIApiKey: process.env.OPENAI_API_KEY, temperature: 0.9, modelName: "gpt-3.5-turbo" });

// 2. 调用聊天模型
const response = await chat.call([
  new HumanChatMessage(
    "把这个汉语内容从汉语翻译为英文。 我爱编程。"
  ),
]);

console.log(response);
// 可以看到会把AIChatMessage标注出来
// AIChatMessage { text: 'I love programming.', name: undefined }