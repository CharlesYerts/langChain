/*
 * @Author: yeertesi
 * @Date: 2023-05-21 03:29:24
 * @LastEditTime: 2023-05-21 03:41:06
 * @LastEditors: yeertesi
 * @Description: 使用Agents完成复杂任务，原理讲解 https://zhuanlan.zhihu.com/p/619344042
 * @FilePath: /langChain/src/basicUse/4.langChainAgents.ts
 */
import { OpenAI } from "langchain/llms/openai";
import { initializeAgentExecutorWithOptions } from "langchain/agents";
import { SerpAPI } from "langchain/tools";
import { Calculator } from "langchain/tools/calculator";
import "dotenv/config"

// 1. 创建一个大型语言模型实例
const model = new OpenAI({ openAIApiKey: process.env.OPENAI_API_KEY, temperature: 0.9, modelName: "gpt-3.5-turbo" });

// 2. 创建一个tools数组，这里我们使用了两个工具，一个是SerpAPI，一个是Calculator
const tools = [
  new SerpAPI(process.env.SERPAPI_API_KEY, {
    location: "Austin,Texas,United States",
    hl: "en",
    gl: "us",
  }),
  new Calculator(),
];

// 3. 创建一个agent执行器
const executor = await initializeAgentExecutorWithOptions(tools, model, {
  agentType: "zero-shot-react-description",
});
console.log("Loaded agent.");

// 4. 我们向agents提供了一个问题，agents会自动调用tools和大型语言模型来完成任务，在agents内部会根据问题的不同，自动选择合适的工具和大型语言模型
const input =
  "Who is Olivia Wilde's boyfriend?" + " What is his current age raised to the 0.23 power?";
console.log(`Executing with input "${input}"...`);

// 5. 调用agents
const result = await executor.call({ input });

console.log(`Got output ${result.output}`);
// Got output Harry Styles' current age raised to the 0.23 power is approximately 2.9157.