/*
 * @Author: yeertesi
 * @Date: 2023-05-21 03:23:50
 * @LastEditTime: 2023-05-21 03:27:59
 * @LastEditors: yeertesi
 * @Description: 使用llmChain调用大型语言模型
 * @FilePath: /langChain/src/basicUse/3.llmChain.ts
 */
import { OpenAI } from "langchain/llms/openai";
import { PromptTemplate } from "langchain/prompts";
import { LLMChain } from "langchain/chains";
// 初始化环境变量，后续会用到环境变量
import "dotenv/config";

// 1. 创建一个大型语言模型实例
const model = new OpenAI({ openAIApiKey: process.env.OPENAI_API_KEY, temperature: 0.9, modelName: "gpt-3.5-turbo" });

// 2. 创建一个prompt模板，这里的模板是一个字符串，其中的变量用花括号包裹
const template = "帮我给一个做{product}的公司起10个好听的名字，用汉语回答";

// 3. 创建一个PromptTemplate实例，后续可以用这个实例来生成prompt
const prompt = new PromptTemplate({
  template: template,
  inputVariables: ["product"],
});

// 4. 创建一个LLMChain实例
const chain = new LLMChain({ llm: model, prompt: prompt });

// 5. 调用LLMChain实例
const res = await chain.call({ product: "铅笔" });

console.log(res);
// {
//   text: '1. 梦启铅笔\n' +
//     '2. 雅致铅笔\n' +
//     '3. 星耀铅笔\n' +
//     '4. 名品铅笔\n' +
//     '5. 紫禁铅笔\n' +
//     '6. 典雅铅笔\n' +
//     '7. 乐博铅笔\n' +
//     '8. 恒源铅笔\n' +
//     '9. 安定铅笔\n' +
//     '10. 海角铅笔'
// }
