/*
 * @Author: yeertesi
 * @Date: 2023-05-21 23:56:08
 * @LastEditTime: 2023-05-22 05:52:59
 * @LastEditors: yeertesi
 * @Description: llmChain的用法
 * @FilePath: /langChain/src/2.chatBasedInteracts/5.LLMChain.ts
 */
import { ChatOpenAI } from "langchain/chat_models/openai";
import {
  SystemMessagePromptTemplate,
  HumanMessagePromptTemplate,
  ChatPromptTemplate,
} from "langchain/prompts";
import "dotenv/config";
import { LLMChain } from "langchain/chains";
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

// 3. 创建一个chatChain
const chain = new LLMChain({
  prompt: translationPrompt,
  llm: chat,
});

// 4. 调用chatChain
const responseB = await chain.call({
  input_language: "汉语",
  output_language: "法语",
  text: "我喜欢编程",
});

console.log(responseB);
// { text: "J'aime programmer." }