/*
 * @Author: yeertesi
 * @Date: 2023-05-22 05:56:40
 * @LastEditTime: 2023-05-22 06:19:22
 * @LastEditors: yeertesi
 * @Description: 使用有状态的对话，可以用在model跟agents上
 * @FilePath: /langChain/src/2.chatBasedInteracts/6.useHistory(memory).ts
 */
import { ChatOpenAI } from "langchain/chat_models/openai";
import {
  SystemMessagePromptTemplate,
  HumanMessagePromptTemplate,
  ChatPromptTemplate,
  MessagesPlaceholder,
} from "langchain/prompts";
import "dotenv/config";
import { ConversationChain } from "langchain/chains";
import { BufferMemory } from "langchain/memory";

// 1. 创建一个聊天模型实例
const chat = new ChatOpenAI({ openAIApiKey: process.env.OPENAI_API_KEY, temperature: 0.9, modelName: "gpt-3.5-turbo" });


const chatPrompt = ChatPromptTemplate.fromPromptMessages([
  // 系统消息
  SystemMessagePromptTemplate.fromTemplate(
    "下面进行的对话是一段人类与ai进行的对话，期间ai会记住对话的历史，同时，当ai遇到自己不知道的问题的时候会简单的说不知道而不是试图创造其他答案"
  ),
  // MessagesPlaceholder是一个特殊的提示模板，它在每次调用时将被传递的消息替换掉
  new MessagesPlaceholder("history"),
  // 人类消息
  HumanMessagePromptTemplate.fromTemplate("{input}"),
]);

// 3. 创建一个对话链，其中memory是一个BufferMemory，它将在每次调用时将消息存储在内存中
const chain = new ConversationChain({
  memory: new BufferMemory({ returnMessages: true, memoryKey: "history" }),
  prompt: chatPrompt,
  llm: chat,
});

const responseA = await chain.call({
  input: "你好吗，我来自北京，你呢？",
});

console.log(responseA);
// { response: '我是一个AI，没有感情，所以不会有好不好这种情况。但是我很愿意与您交流，您有什么需要我帮忙的吗？' }


setTimeout(async () => {
  const responseB = await chain.call({
    input: "你好，你知道我来自哪里吗？",
  });

  console.log(responseB);
  // { response: '是的，您之前告诉过我，您来自北京。我的记忆很好，我可以记住我们之前的对话历史。' }
}, 1000 * 5);
