/*
 * @Author: yeertesi
 * @Date: 2023-05-23 00:37:21
 * @LastEditTime: 2023-05-23 00:53:36
 * @LastEditors: yeertesi
 * @Description: 介绍简单实用chat模型的用法
 * @FilePath: /langChain/src/4.model/1.ChatModels.ts
 */

import { ChatOpenAI } from "langchain/chat_models/openai";
import { HumanChatMessage } from "langchain/schema";
import "dotenv/config";

export const run = async () => {
  // 1. 创建一个chat模型实例
  const chat = new ChatOpenAI({ openAIApiKey: process.env.OPENAI_API_KEY, temperature: 0.9, modelName: "gpt-3.5-turbo" });
  // 2. 调用chat模型
  const response = await chat.call([
    new HumanChatMessage(
      "可以给一个做手机壳的公司起一个好听的名字吗?，用汉语回答"
    ),
  ]);

  console.log(response.text);
// 当然可以，以下是几个建议：
// 1. 造壳阁
// 2. 手机颜艺
// 3. 明纹壳
// 4. 壳咚咚
// 5. 源壳
// 6. 艺壳屋
// 7. 爱壳宝
// 8. 壳创意
// 9. 美壳商城
// 10. 壳世界
// 希望能对你有帮助。
};

run();