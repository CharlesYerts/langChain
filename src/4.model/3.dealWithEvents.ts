/*
 * @Author: yeertesi
 * @Date: 2023-05-23 01:07:53
 * @LastEditTime: 2023-05-28 14:57:21
 * @LastEditors: yeertesi
 * @Description: 文件描述
 * @FilePath: /langChain/src/4.model/3.dealwithevents.ts
 */
import { HumanChatMessage, LLMResult, SystemChatMessage } from "langchain/schema";
import { ChatOpenAI } from "langchain/chat_models/openai";
import "dotenv/config";

// We can pass in a list of CallbackHandlers to the LLM constructor to get callbacks for various events.
const model = new ChatOpenAI({
  callbacks: [
    {
      handleLLMStart: async (llm: { name: string }, prompts: string[]) => {
        console.log(JSON.stringify(llm, null, 2));
        console.log(JSON.stringify(prompts, null, 2));
      },
      handleLLMEnd: async (output: LLMResult) => {
        console.log(JSON.stringify(output, null, 2));
      },
      handleLLMError: async (err: Error) => {
        console.error(err);
      },
    },
  ],
  openAIApiKey: process.env.OPENAI_API_KEY,
  temperature: 1,
  modelName: "gpt-3.5-turbo",
});

await model.call([
  new HumanChatMessage(
    "What is a good name for a company that makes colorful socks?"
  ),
  new SystemChatMessage("你回答的问题都应该用汉语回答"),
]);

// {
//   "name": "openai"
// }
// [
//   "Human: What is a good name for a company that makes colorful socks?\nSystem: 你回答的问题都应该用汉语回答"
// ]
// {
//   "generations": [
//     [
//       {
//         "text": "制造彩色袜子的公司的好名字是：彩色袜坊。",
//         "message": {
//           "type": "ai",
//           "data": {
//             "content": "制造彩色袜子的公司的好名字是：彩色袜坊。"
//           }
//         }
//       }
//     ]
//   ],
//   "llmOutput": {
//     "tokenUsage": {
//       "completionTokens": 24,
//       "promptTokens": 42,
//       "totalTokens": 66
//     }
//   }
// }