# **CS571 Spring 2025 – ICA K**

## User Evaluation

Please *make a copy* of this document by clicking **File \> Make a copy**. You may share and co-edit it with your fellow group members.  
---

In this in-class activity, you will explore the concept of **User Evaluation** by designing and executing a usability test to evaluate on one of your past HWS (1-11) in three steps: 

1. Prepare the Usability Test  
2. Execute the Test Plan  
3. Analyzing and Report Findings

Areas needing your response are clearly marked with **Your Turn\!** Be sure to complete all aspects of the assignment. Your Canvas submission will be a **pdf** version of this document.

You may complete this in groups of 1, 2, or 3 people\! :) Please be sure to assign yourself and your team member(s) to a group.

## **1\. Prepare the Usability Test**

## In this part, you will develop a brief *formative* usability test plan by defining and characterizing three dimensions: ***why, how,*** and ***what***.

**Your Turn\!** Design a usability test to evaluate one of your group’s HWs (1-11) by using the criteria below.

	For this usability test, we will be evaluating BadgerChat.

1. ***Why:*** Define the test goal by identifying two desired outcomes for your study. You can choose from the five Es, the three dimensions of the ISO definition of usability, or related concepts or outcomes (e.g., desirability, learnability, discoverability) that best fit what you would like to evaluate. 

* Outcome 1: Learnability — Evaluate whether new users can quickly understand how to start a conversation, switch personas, and send messages.  
* Outcome 2: Efficiency — Evaluate how quickly and smoothly users can complete core tasks such as sending messages, switching personas, and starting a new chat.


2. ***How:*** Determine the measurements you will use for the testing. You should consider metrics/measures from both qualitative and quantitative.  
     
* Qualitative: 
  * Think-aloud protocol during tasks
  * Post-test interview feedback on ease of use, clarity, and satisfaction   
* Quantitative:  
  * Task completion time
  * Task success rate
  * Number of errors
  * Number of hints or help requests
    
3. ***What:*** Based on the outcomes, define 2 *scenarios* that will guide your usability test. Make sure that your scenarios are *goal-oriented, contextual,* and *task-specific.* For each scenario, explicitly state which *outcome* you are attempting to evaluate.  
     
* Scenario 1: You are a new user who has just opened BadgerChat for the first time. Start a conversation, send a message, and change the assistant persona. Describe what you expect to happen and whether the interface behaves as expected.  
* Scenario 2: You are using BadgerChat to ask multiple questions. Start a new chat, switch personas, and continue the conversation. Complete these actions as quickly and accurately as possible while explaining your thought process.

## **2\. Execute the Test Plan**

In this part, you will execute the test plan you just made. To do this, you will identify two volunteers to help you test your product. These could be classmates, friends, or family members. However, they ***cannot*** be yourself or someone from your own group. If we have time during class, you may turn to groups around you\!

You can capture measures in real-time or perform this later by recording the sessions (with the participant’s consent). If you are using self-report measures, be sure to provide the participant with a paper or electronic copy.

During and following the test, be sure to make qualitative observations by asking questions, e.g., “You seemed surprised by that response, what were you expecting?” where appropriate. 

**Your Turn\!** Conduct your usability study and report your findings below. This should include your raw data and observations. This will be later organized in the next step.

Here is a complete, well-written **English response** you can submit for Part 2:

---

## **2. Execute the Test Plan**

We conducted usability testing on **BadgerChat** with two volunteers who were not part of our group. Both participants gave consent to participate and allowed us to observe their interactions.

### 👤 Participants

* **Participant 1:** Undergraduate student, frequent chatbot user
* **Participant 2:** Graduate student, limited chatbot experience

---

### 📋 Raw Data & Observations

#### 🔹 Participant 1

* **Tasks Completed:**

  * Started a conversation
  * Sent multiple messages
  * Switched personas
  * Started a new chat

* **Quantitative Data:**

  * Task completion time: 2 minutes 10 seconds
  * Task success rate: 100%
  * Errors: 0
  * Hints needed: 0

* **Qualitative Observations:**

  * Quickly understood how to start chatting.
  * Expressed surprise when switching personas reset the conversation, stating:

    > “I didn’t realize switching personas would clear the chat — I thought it would just change the tone.”
  * Found the interface “clean and easy to use.”

---

#### 🔹 Participant 2

* **Tasks Completed:**

  * Started a conversation
  * Sent a message
  * Attempted to switch personas
  * Started a new chat

* **Quantitative Data:**

  * Task completion time: 3 minutes 30 seconds
  * Task success rate: 100%
  * Errors: 1 (initially clicked New Chat instead of Personas)
  * Hints needed: 1

* **Qualitative Observations:**

  * Hesitated before switching personas and asked what would happen to the chat history.
  * After switching, said:

    > “I wasn’t expecting the chat to reset — I thought it would keep the same conversation.”
  * Reported that the layout was “simple but could use more labels.”

---

### 🧠 General Observations

* Both users were able to complete all tasks successfully.
* Both participants were surprised by the conversation reset when switching personas.
* Users appreciated the simplicity but suggested clearer feedback or confirmation when actions affect chat history.

---
 

## **3\. Analyzing and Report Findings**

Finally, you will analyze your results and translate them into design insight.

* For your *quantitative* data, calculate averages, variances, or other relevant statistics from your metrics and report your findings.  
* For your *qualitative* data, categorize your notes and observations into a minimum of two high-level findings. Affinity diagramming may be helpful for this\!

If the quantitative data or the qualitative comments from your two participants vary significantly, you can also comment on these differing views.

**Your Turn\!** Report your findings in narrative form and end your report with high-level design insight and recommendations for how your agent might be improved.

1. **Quantitative Summary**  
   \<Calculate averages, variances, or other relevant statistics and summarize\>  

Across both participants, the average task completion time was **2 minutes 50 seconds**, with a variance of approximately **0.47 minutes²**, indicating moderate variation in task efficiency. Both participants successfully completed all required tasks, resulting in a **100% task success rate**. The average number of errors was **0.5 per participant**, and the average number of hints required was **0.5**, suggesting that while the interface is generally intuitive, minor confusion still occurred.

2. **Qualitative Summary**

\<Categorize your notes and report a minimum of two findings\>

After categorizing participant feedback, two major themes emerged:

**Finding 1: Confusion about Persona Switching Behavior**
Both participants were surprised that switching personas cleared the conversation history. They expected the persona change to affect only the assistant’s tone, not reset the chat. This indicates a mismatch between user expectations and system behavior.

**Finding 2: Overall Interface Clarity with Minor Discoverability Issues**
Participants described the interface as clean and easy to use. However, one participant hesitated when choosing between “New Chat” and “Personas,” suggesting that some controls could benefit from clearer labeling or tooltips.

3. **Conclusions**

\<Report high-level insight and recommendations for how to improve the project\>

Overall, BadgerChat demonstrates strong learnability and efficiency, as users were able to complete tasks quickly and successfully. However, the system behavior when switching personas does not align with user expectations, which could reduce trust or satisfaction.

**Design Recommendations:**

* Add a confirmation dialog when switching personas to explain that the conversation will reset.
* Provide clearer labels or brief tooltips for navigation options like “New Chat” and “Personas.”
* Consider allowing users to switch personas without clearing the conversation to better match user mental models.

After completing this document, please be sure to upload it as a PDF in Canvas\!
