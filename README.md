Developing an Intelligent Document Assistance Chatbot for USDA Rural Development

As part of the Challenge X Hackathon — a nine-week innovation program hosted by George Mason University — our team collaborated with the U.S. Department of Agriculture (USDA) Rural Development Department to design and develop an AI-driven chatbot capable of assisting users in identifying and accessing USDA resources.

Project Overview

The USDA offers a wide array of grants, loans, and development programs targeting rural communities. However, users frequently encounter difficulties navigating the USDA website and completing required forms due to complex documentation and unclear eligibility processes. Our project aimed to address this issue by creating a Large Language Model (LLM)-powered conversational interface that simplifies resource discovery and form completion.

System Architecture

The chatbot system was built around three core components:

Natural Language Understanding (NLU):
We utilized an LLM to interpret user queries and extract intent, enabling contextual understanding of requests related to USDA programs, eligibility criteria, and application procedures. The model was integrated with domain-specific fine-tuning using datasets provided by the USDA to ensure accuracy and reliability in government-related information retrieval.

Document Parsing and Assistance:
To extend usability, we implemented a document-processing module capable of accepting image or PDF uploads. Using a combination of OCR (Optical Character Recognition) and semantic parsing, the system identifies key fields within USDA forms and provides contextual guidance for each section. This allows users to receive real-time feedback and clarification while completing paperwork.

Knowledge Retrieval and Response Generation:
The chatbot leverages a hybrid information retrieval pipeline, combining vector-based semantic search with structured query mapping to cross-reference user intent against USDA’s resource database. This ensures that recommendations and document links are both contextually relevant and officially sourced.
