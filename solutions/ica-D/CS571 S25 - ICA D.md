# **CS571 Spring 2025 – ICA D**

## Interaction Design

Please *make a copy* of this document by clicking **File \> Make a copy**. You may share and co-edit it with your fellow group members.  
---

In this in-class activity, you will explore the concept of **Interaction Design** in two steps: 

1. Analyzing for Metaphors, Idioms, and Hidden Affordances  
2. Using Navigation Aids and Models for Prototyping

Areas needing your response are clearly marked with **Your Turn\!** Be sure to complete all aspects of the assignment. Your Canvas submission will be a **pdf** version of this document.

You may complete this in groups of 1, 2, or 3 people\! :) Please be sure to assign yourself and your team member(s) to a group.

## **1\. Analyzing for Metaphors, Idioms, and Hidden Affordances**

In class, you just learned about interaction design concepts such as *interaction dimensions* and *paradigms*. Interaction designers make decisions on how they utilize these concepts to improve usability or achieve a goal by considering who uses this app and when. 

**Your Turn\!** Open an app or webpage that you recently used (e.g., message app, Canvas, or whatever\!), and analyze it by answering the following questions…

1. Find and describe a *metaphor* utilized by the application. **Please annotate a screenshot with your findings.**

![[image-1.png]]

2. Find and describe an *idiom* utilized by the interface. **Please annotate a screenshot with your findings.**

![[image-2.png]]

3. Do you know of any *hidden affordances* utilized by the application? If so, what are they?

![[image-3.png]]

## **2\. Using Navigation Aids and Models for Prototyping**

Having just learned navigation models and aids, it’s your turn to develop a prototype using [Figma](https://figma.com/)\! Figma is a tool used to turn a set of screens into an interactive prototype.

## **Your Turn\!** Develop a prototype, either for the desktop or a mobile device, [for the Madison Cat Project](https://www.madisoncatproject.org/browse-indoor) using [Figma](https://figma.com/). This prototype should allow users to (1) view available cats (2) see details about particular cats and (3) schedule an appointment to see a cat. You do not need to show every cat nor have details for every cat. However, your prototype should be developed enough to clearly get your idea and design across. I’d expect your prototype to have 4-6 interconnected screens. Following, answer the following questions…

1. Please paste a **public link** to your Figma drawing below *as well as* **a screenshot** of the overview of all the screens.  

This is a functional React web application (not a Figma mockup). You can interact with it directly in your browser. The prototype includes realistic cat data with images, full booking flow, and responsive design for both desktop and mobile.
[Public Link](https://comma-bobbin-58205706.figma.site/)
![[image-4.png]]

2. What kinds of navigation aids did you add to your prototype? How are they used?

- Persistent Header: Sticky navigation bar with logo that links back to home
- Back Buttons: Context-aware navigation with arrows and descriptive text
- Breadcrumb Context: Clear page titles showing current location
- Call-to-Action Buttons: Prominent buttons with icons guiding users forward
- Visual Feedback: Hover states, color coding, and confirmation indicators

3. Which navigation model(s) did you use? Why did you use them?  

- Primary: Hub & Spoke - Browse page serves as the central hub with cat details radiating from it. This keeps navigation simple and prevents users from getting lost.
- Secondary: Linear/Wizard Flow - The booking process follows a guided step-by-step flow (Browse → Details → Book → Confirm) that matches user intent and prevents errors.

After completing this document, please be sure to upload it as a PDF in Canvas\!  
