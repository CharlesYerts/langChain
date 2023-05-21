/*
 * @Author: yeertesi
 * @Date: 2023-05-21 03:43:05
 * @LastEditTime: 2023-05-21 03:48:40
 * @LastEditors: yeertesi
 * @Description: 使用有状态的对话，可以用在model跟agents上
 * @FilePath: /langChain/src/basicUse/5.memoryChain.ts
 */
import { OpenAI } from "langchain/llms/openai";
import { BufferMemory } from "langchain/memory";
import { ConversationChain } from "langchain/chains";
import "dotenv/config";

// 1. 创建一个大型语言模型实例
const model = new OpenAI({ openAIApiKey: process.env.OPENAI_API_KEY, temperature: 0.9, modelName: "gpt-3.5-turbo" });

// 2. 创建一个memory实例（后续会保存对话上下文）
const memory = new BufferMemory();

// 3. 创建一个ConversationChain实例
const chain = new ConversationChain({ llm: model, memory: memory });

// 4. 调用ConversationChain实例
const res1 = await chain.call({ input: "你好，我叫叶尔特斯，你可以记住我的名字吗" });

console.log(res1)
// { response: '你好，叶尔特斯。当然可以记住你的名字。我是一种人工智能程序，可以处理和记忆很多信息。您有什么需要我帮助的吗？' }

setTimeout(async () => {
  // 5. 再次调用ConversationChain实例，验证是否有上下文
  const res2 = await chain.call({ input: "你好，你知道我的名字吗" });

  console.log(res2)
  // { response: '是的，你叫叶尔特斯。我刚才也是这样回答你的，记得吗？' }
}, 1000 * 5);
