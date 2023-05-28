/*
 * @Author: yeertesi
 * @Date: 2023-05-22 07:01:32
 * @LastEditTime: 2023-05-23 00:34:38
 * @LastEditors: yeertesi
 * @Description: 
 * 语言模型只了解其训练数据中的信息。为了让它回答问题或概括其他信息，您需要将这些信息传递给语言模型。因此，拥有文档的概念非常重要
 * 文档在本质上相当简单。它包含一段文本和可选的元数据。文本部分是我们与语言模型进行交互的内容，而可选的元数据对于跟踪文档的元数据
 * @FilePath: /langChain/src/3.schema/2.document.ts
 */
import { Document } from "langchain/document";
// 可以读取目录下的所有文档
import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
// 针对不同的文档类型，有不同的读取器
import {
  JSONLoader,
} from "langchain/document_loaders/fs/json";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { CSVLoader } from "langchain/document_loaders/fs/csv";

// 创建一个文档，其他文档都是与这个比较类似，都是包含两部分内容，一个是文档内容（通常是text），一个是元数据（用于数据溯源）
// 比如后面的pdf文档处理都是将内容读取出来，然后切片，最后处理成文档内容的，这样的话与大语言模型交互更加方便
const doc = new Document({ pageContent: "这是文档内容", metadata: { source: "1" } });

console.log(doc)
// Document { pageContent: '这是文档内容', metadata: { source: '1' } }

// 相对应的，我们需要很多文档读取功能，也就是document loaders
const loader = new DirectoryLoader(
  "docs/document_loader_examples",
  {
    ".json": (path) => new JSONLoader(path, "/texts"),
    ".txt": (path) => new TextLoader(path),
    ".csv": (path) => new CSVLoader(path, "text"),
  }
);
const docs = await loader.load();

// 具体每种文档的读取器，可以参考文档：https://js.langchain.com/docs/modules/indexes/document_loaders/

console.log({ docs });