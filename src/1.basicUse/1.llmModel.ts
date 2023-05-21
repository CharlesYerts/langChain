/*
 * @Author: yeertesi
 * @Date: 2023-05-21 03:14:37
 * @LastEditTime: 2023-05-21 03:27:46
 * @LastEditors: yeertesi
 * @Description: 大型语言模型的调用
 * @FilePath: /langChain/src/basicUse/1.llmModel.ts
 */
// 1. 导入大型语言模型
import { OpenAI } from "langchain/llms/openai";
// 初始化环境变量，后续会用到环境变量
import "dotenv/config";

// 2. 创建一个大型语言模型实例
const model = new OpenAI({ openAIApiKey: process.env.OPENAI_API_KEY, temperature: 0.9, modelName: "gpt-3.5-turbo" });

// 3. 直接调用大型语言模型
const res = await model.call(
  "帮我给一个做铅笔的公司起10个好听的名字，用汉语回答"
);

console.log(res);
// 1. 艺术铅笔
// 2. 时尚铅笔
// 3. 全能铅笔
// 4. 贴心铅笔
// 5. 知识铅笔
// 6. 创意铅笔
// 7. 经典铅笔
// 8. 美好铅笔
// 9. 手写铅笔
// 10. 自然铅笔