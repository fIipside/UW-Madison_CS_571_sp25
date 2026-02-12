# CS571 — User Interface Development（课程资源 / Course Resources）

> 选择语言： **[中文](#中文)** | **[English](#english)**

---

## 中文

### 课程介绍

本课程围绕现代主流软件（如 Facebook 等）所采用的技术栈与设计理念，系统讲解用户界面（UI）软件开发。课程以 Web 为起点，逐步扩展至移动端与 AI 驱动的智能交互，涵盖从前端开发到全栈部署的完整路径。

课程内容包括：

* 在 Web 端从基础开始：HTML、CSS、JavaScript；
* 使用 React 构建组件化、状态驱动的现代前端应用；
* 使用 Bootstrap 等 UI 设计库实现响应式布局与规范化视觉设计；
* 在移动端使用 React Native 与 Expo 构建跨平台移动应用；
* 引入人工智能交互：从基于 wit.ai 的简单 AI agent 识别系统开始；
* 探索先进的生成式 AI 技术在用户界面中的应用；
* 在课程最后介绍 Full Stack 开发的整体架构，并推荐使用 Docker 进行容器化部署。

通过本课程，你将学习构建现代用户界面的核心技术、设计原则与工程实践，掌握从 Web 到 Mobile，再到 AI 驱动交互与部署的完整开发流程，并最终形成一个具有系统性的 UI 开发作品集（portfolio）。

---

### 课程学习目标（Course Learning Outcomes, CLOs）

* 熟练使用 HTML、CSS、JavaScript、React 等主流前端技术开发用户界面。
* 使用 Bootstrap 等设计库实现响应式布局与规范化视觉设计。
* 使用 React Native 与 Expo 构建跨平台移动应用。
* 理解并实现基于 wit.ai 的基础 AI 交互系统，并了解生成式 AI 在 UI 中的应用方式。
* 掌握现代 Web 应用的整体架构，并理解 Docker 在 Full Stack 开发与部署中的作用。
* 运用以用户为中心的设计原则，构建结构清晰、交互流畅、视觉统一的用户界面。

---

### 相关网址 / Relevant Links

1. 🎥 **授课视频与每节课对应资源（课程官网）**： [https://cs571.org/](https://cs571.org/)
2. 🧠 **关于 intent 训练问题 — 致谢 chat-witai 的模型实现**：我在使用 wit.ai 时遇到 intent 训练问题，后来借鉴并使用了 parthataraf 的实现，特此表示感谢： [https://github.com/parthataraf/chat-witai/tree/main](https://github.com/parthataraf/chat-witai/tree/main)
3. 🔐 **关于 HW11（生成式 AI）与 Gemini 构建 — 致谢**：HW11 及其对应的生成式 AI API 因使用成本在 cs571.org 中不可用，感谢 P-mandevillei 提供的 Gemini 服务端构建示例仓库： [https://github.com/P-mandevillei/CS571-hw11-server](https://github.com/P-mandevillei/CS571-hw11-server) 。你可以在 Gemini 官方网站免费注册 API Key 并使用该 API 完成 HW11 和 ice-voicedev2.

> 注：第三条中提到可注册 Gemini API key（免费选项），请根据官方说明完成注册与密钥管理；使用第三方示例服务器时注意隐私与安全配置。

---

### 课程学习建议

1. 老师讲解非常认真且细致，但对我这种完全没有 Java / JavaScript / Web 基础的同学来说节奏可能略快。Slides 上有时表述不够详细，建议结合课程视频与幻灯片一起学习以加深理解。
2. 11 次 Homework 非常重要：大部分作业在课堂练习（in-class exercises）基础上进行扩展，复杂度更高。作业之间存在一定的“表面重合”，但其覆盖的知识点完整且互补。课堂上可能不会对某些组件的具体用法做详尽讲解，这时需要查阅官方文档或借助 AI 协助完成。
3. 课程中的若干 design lecture（设计类讲座）也很有价值，虽然部分 in-class activity (ICA) 没什么用，但 lecture 中蕴含许多设计理念与 UI 概念，建议在闲暇时学习。

---

## English

### Course Description

This course follows the modern technology stack and design principles adopted by mainstream software systems (e.g., Facebook). It provides a systematic introduction to user interface (UI) development, starting from web fundamentals and extending to mobile platforms and AI-driven interaction, ultimately covering full-stack architecture concepts.

The course progression includes:

* Web fundamentals: HTML, CSS, and JavaScript;
* Component-based and state-driven development using React;
* UI design and responsive layout using Bootstrap and similar UI libraries;
* Cross-platform mobile development using React Native and Expo;
* Introduction to AI-driven interaction through basic intent recognition using wit.ai;
* Exploration of advanced generative AI integration in user interfaces;
* A final introduction to full-stack architecture, with Docker recommended for containerized deployment.

By the end of this course, students will understand the core technologies, design principles, and engineering practices behind modern UI systems, and will be able to develop web and mobile interfaces integrated with AI capabilities, forming a comprehensive UI development portfolio.

---

### Course Learning Outcomes (CLOs)

* Develop user-facing applications using HTML, CSS, JavaScript, and React.
* Implement responsive and visually consistent designs using Bootstrap and other UI libraries.
* Build cross-platform mobile applications with React Native and Expo.
* Understand and implement basic AI interaction using wit.ai, and explore generative AI integration in UI systems.
* Gain foundational knowledge of full-stack architecture and Docker-based deployment.
* Apply user-centered design principles to create intuitive, structured, and visually coherent user interfaces.

---

### Relevant Links

1. 🎥 **Lecture videos and per-lecture resources (course site)**: [https://cs571.org/](https://cs571.org/)
2. 🧠 **Thanks / reference for intent training workaround**: I encountered intent-training issues with wit.ai and used the implementation by parthataraf — many thanks: [https://github.com/parthataraf/chat-witai/tree/main](https://github.com/parthataraf/chat-witai/tree/main)
3. 🔐 **HW11 (Generative AI) and Gemini server sample — thanks**: HW11 and its generative AI API are unavailable to cs571.org users due to cost. Thanks to P-mandevillei for the Gemini server/sample implementation: [https://github.com/P-mandevillei/CS571-hw11-server](https://github.com/P-mandevillei/CS571-hw11-server). You can register for a Gemini API key (there is a free option) on their official site and use that API to complete HW11 and ice-voicedev2.

> Note: When using third-party example servers or API keys, always follow best practices for API key security and data privacy.

---

### Study Suggestions

1. The instructor explains topics carefully, but if you have little to no background in Java, JavaScript, or Web development the pace may feel fast. Slides sometimes lack detail — pair them with lecture videos.
2. The 11 homework assignments are essential: they expand on in-class exercises and cover the course's core knowledge. Some component usage is not taught in depth during lectures, so consult official documentation or use AI/helpful community resources when needed.
3. Design lectures are highly informative — even if some in-class activities are useless, the slides and discussions teach important UI and design concepts worth learning in spare time.

---
