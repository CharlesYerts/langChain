/*
 * @Author: yeertesi
 * @Date: 2023-05-22 06:53:33
 * @LastEditTime: 2023-05-22 07:00:08
 * @LastEditors: yeertesi
 * @Description: 目前支持的用户角色有系统（System）、人类（Human）和人工智能（AI）
 * @FilePath: /langChain/src/3.schema/1.chatMessages.ts
 */
import { SystemChatMessage,HumanChatMessage,AIChatMessage } from "langchain/schema";

// 对大型语言模型提出一些指导性的建议，比如“你是一个翻译助手”，“你是一个聊天机器人”，“你是一个翻译助手，你的工作是把汉语内容从汉语翻译为英文，或者将英文内容从英文翻译为汉语。”等等
const systemChatMessage = new SystemChatMessage("你是一个翻译助手");
// 人类的聊天消息，交互内容
const humanChatMessage = new HumanChatMessage("你好，我叫叶尔特斯");
// 大型语言模型返回的消息内容
const aiChatMessage = new AIChatMessage("你好，我是翻译助手");

console.log(systemChatMessage);
console.log(humanChatMessage);
console.log(aiChatMessage);

// 可以看到会有类型标注出当前 的消息是什么消息，这样可以方便系统后续的判断处理
// SystemChatMessage { text: '你是一个翻译助手', name: undefined }
// HumanChatMessage { text: '你好，我叫叶尔特斯', name: undefined }
// AIChatMessage { text: '你好，我是翻译助手', name: undefined }