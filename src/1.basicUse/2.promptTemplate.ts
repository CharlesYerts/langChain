/*
 * @Author: yeertesi
 * @Date: 2023-05-21 03:00:17
 * @LastEditTime: 2023-05-21 03:27:41
 * @LastEditors: yeertesi
 * @Description: 提示语模版的用法
 * @FilePath: /langChain/src/basicUse/2.promptTemplate.ts
 */
import { PromptTemplate } from "langchain/prompts";

// 1. 创建一个prompt模板，这里的模板是一个字符串，其中的变量用花括号包裹
const template = "帮我给一个做{product}的公司起10个好听的名字，用汉语回答";

// 2. 创建一个PromptTemplate实例，后续可以用这个实例来生成prompt
const prompt = new PromptTemplate({
  template: template,
  inputVariables: ["product"],
});

// 3. 生成prompt
const res = await prompt.format({ product: "铅笔" });

console.log(res);
// 帮我给一个做铅笔的公司起10个好听的名字