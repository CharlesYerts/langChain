/*
 * @Author: yeertesi
 * @Date: 2023-05-21 04:09:30
 * @LastEditTime: 2023-05-21 04:12:23
 * @LastEditors: yeertesi
 * @Description: 多个角色的聊天模式
 * @FilePath: /langChain/src/2.chatBasedInteracts/2.multipleMessages.ts
 */

import { ChatOpenAI } from "langchain/chat_models/openai";
import { HumanChatMessage, SystemChatMessage } from "langchain/schema";
import "dotenv/config";

// 1. 创建一个聊天模型实例
const chat = new ChatOpenAI({ openAIApiKey: process.env.OPENAI_API_KEY, temperature: 0.9, modelName: "gpt-3.5-turbo" });

// 2. 调用多个身份聊天模型
const responseB = await chat.call([
  new SystemChatMessage(
    "你是一个翻译助手。你的工作是把汉语内容从汉语翻译为英文，或者将英文内容从英文翻译为汉语。"
  ),
  new HumanChatMessage("Translate: I love programming."),
]);

console.log(responseB);
// AIChatMessage { text: '我爱编程。', name: undefined }