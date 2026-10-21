import type { Lesson, LessonPage } from '../types';

function explainedPage(
  sourcePage: number,
  title: string,
  takeaway: string,
  explanation: string,
  terms?: string,
  recognition?: string,
  trap?: string,
  note?: string,
): LessonPage {
  const blocks: LessonPage['blocks'] = [{ type: 'zobda', text: takeaway }];
  if (terms) blocks.push({ type: 'recognition', title: 'Key words and labels', markdown: terms });
  blocks.push({ type: 'foundation', title: 'Step-by-step walkthrough', markdown: explanation });
  if (recognition) blocks.push({ type: 'recognition', title: 'If you see this, think…', markdown: recognition });
  if (trap) blocks.push({ type: 'trap', title: 'Common trap to avoid', markdown: trap });
  return { sourcePage, title, coverage: 'explained', blocks, ...(note ? { note } : {}) };
}

function visualPage(sourcePage: number, title: string, note: string): LessonPage {
  return { sourcePage, title, coverage: 'visual-only', blocks: [], note };
}

const pages: LessonPage[] = [
  visualPage(
    1,
    `Technical Report Writing — course cover`,
    `Cover page naming Technical Report Writing and Dr. Yasser Mohammed. The visible design says Fall Semester 2025–2026. The PDF text layer also contains “2022–2023,” which is not visible in the rendered cover and may be leftover hidden text; do not treat it as a second confirmed semester date.`,
  ),
  visualPage(
    2,
    `Chapter 1 — Introduction to report writing`,
    `Chapter title page. It introduces the chapter but does not yet explain a writing concept.`,
  ),
  explainedPage(
    3,
    `Learning objectives — what this chapter is meant to teach`,
    `This chapter aims to teach communication and why we write, business communication categories and message types, the writing process, and effective business writing.`,
    `Read this as a map of the chapter rather than a set of definitions. The first two objectives concern communication and business messages. The last two point ahead to planning, drafting, and improving writing. This Unit 1 Part 1 file develops the first communication topics and an introduction to business writing; seeing an objective here does not mean every part is explained in this file.`,
    `**Objective** — a skill or understanding the course aims for.  
**Business message** — a communication used for a work or business purpose.`,
    `When a slide lists objectives, use them to predict the chapter’s direction; wait for later slides for the detailed explanations.`,
  ),
  explainedPage(
    4,
    `List of topics — lessons in Chapter 1`,
    `The chapter is organized into lessons on communication, business writing, the writing process, and fundamentals of business writing.`,
    `The readable titles are: **Lesson 1**, the communication process and reasons for writing; **Lesson 2**, introduction to business writing; **Lesson 3**, the writing process; and **Lesson 4**, fundamentals of business writing. This file covers lessons 1 and 2, ending with business-message questions. The fifth listed title is rendered as garbled Arabic/characters, so its wording cannot be identified confidently from this source.`,
    `**Writing process** — the stages a writer follows to plan, compose, and improve a message.  
**Fundamentals** — the basic principles of a subject.`,
    undefined,
    undefined,
    `The fifth lesson title is unreadable in the source rendering and text extraction. It is left unidentified rather than guessed.`,
  ),
  explainedPage(
    5,
    `Communication — sharing a message clearly`,
    `Communication is how people share meaning. It can use spoken words, written words, or other written symbols; it is effective when the intended people can understand the message.`,
    `The slide starts with an everyday point: communication matters in personal life and at work. Its forms include **spoken communication** and **written communication** (the slide awkwardly says “word written”), as well as written symbols. The goal is not merely to send something; effective communication means conveying the message clearly to other people.

The final quotation says that many jobs depend heavily on a person’s ability to express ideas. Its practical point is that writing and speaking become especially important when work requires coordinating with people or working in a larger organization.`,
    `**Communication** — sending and understanding information or ideas.  
**Effective** — successful at producing the intended understanding.  
**Sender** — the person who creates and sends the message.  
**Recipient** — the person who receives a message.`,
    `Ask: “Did the recipient understand what I meant?” Sending a message alone does not prove that communication was effective.`,
    `Do not read the slide’s quotation as saying that manual workers never need communication. Its point is that communication demands tend to grow as work relies more on coordination and written or spoken decisions.`,
  ),
  explainedPage(
    6,
    `Communication process — notice the need, understand it, choose a strategy`,
    `Before composing a message, first recognize that communication is needed, understand the situation, and consider ways to reach the goal.`,
    `The lecture’s first three steps are:

1. **Sense a need:** notice a problem or goal for which a message may help.
2. **Define the situation:** gather enough information to understand what is happening.
3. **Consider communication strategies:** think through possible ways to communicate, who needs the message, and what result you want.

The order matters: choosing words before understanding the situation can lead to a message that solves the wrong problem.`,
    `**Strategy** — a planned way to reach a goal.  
**Situation** — the facts and circumstances around the issue.`,
    `If a question asks what comes before choosing a channel or writing, look for recognizing the need and defining the situation.`,
    `“I need to send an email” is not yet a full strategy. First be clear about the problem, the recipient, and the result you want.`,
  ),
  explainedPage(
    7,
    `Communication process — choose the action and compose`,
    `After considering options, decide what the message will contain, how it will be organized and presented, which channel to use, and then prepare it.`,
    `Steps 4 and 5 turn the plan into a message:

4. **Select a course of action:** make preliminary decisions about the message’s **content** (what it says), **structure** (how ideas are ordered), **type and visual format** (how it is presented), and **channel** (how it is delivered).
5. **Compose:** prepare the message. For an oral presentation, the slide says to make notes or write the whole presentation. For a written message, use strategies that help you compose it effectively.

The channel is chosen as part of the action plan; composing is the act of preparing the actual words or presentation.`,
    `**Content** — the information or ideas in the message.  
**Structure** — the order and arrangement of those ideas.  
**Channel** — the route used to deliver a message, such as speech or writing.`,
    `If the question mentions selecting the channel, content, structure, or format, it is step 4. Preparing the actual message is step 5.`,
  ),
  explainedPage(
    8,
    `Communication process — send, receive, interpret`,
    `Sending, receiving, and interpreting are three different events: delivery, arrival, and understanding.`,
    `The lecture’s steps 6–8 are:

6. **Send:** deliver the prepared message through the chosen channel to its intended recipients.
7. **Receive:** the recipient gets the message and chooses to read or listen to it.
8. **Interpret:** the recipient works out what the message means and its purpose. The slide also notes that recipients may make judgments about the sender and what the sender represents.

So, a message can be sent but not yet received; it can be received but misunderstood. These are separate stages in the lecture’s process.`,
    `**Intended recipient** — the person or group the sender means to reach.  
**Interpret** — work out the meaning of something.`,
    `If the prompt says “gets the message,” think **receive**. If it says “works out what it means,” think **interpret**.`,
    `Do not treat “sent” and “understood” as synonyms. Delivery does not guarantee understanding.`,
  ),
  explainedPage(
    9,
    `Communication process — decide on a response and reply`,
    `Communication continues after the first message: the recipient decides how to respond and may send a reply, becoming a communicator in turn.`,
    `The final two steps are:

9. **Decide on a response:** after interpreting the message, the recipient chooses whether and how to respond. The slide says a message adapted carefully to its recipient has a better chance of producing the desired response.
10. **Reply:** when the recipient responds, that person becomes the communicator and follows the same process to create a reply.

This makes communication a cycle rather than a one-way delivery. A response may show what the recipient understood, though the slide does not say every message must receive a reply.`,
    `**Adapted to the recipient** — shaped for the person who will read or hear it.  
**Response** — what the recipient decides to do after receiving and interpreting a message.`,
    `If the receiver creates a reply, the roles switch: the original receiver becomes the new sender.`,
  ),
  explainedPage(
    10,
    `Why write? — intellectual and practical reasons`,
    `The lecture groups reasons for writing into two broad families: writing helps thinking and managing information, and it serves practical tasks in education, jobs, business, government, and the web.`,
    `Use the two headings as a sorting rule. **Intellectual reasons** concern what writing helps you do with ideas and information. **Practical reasons** concern tasks that require writing. The next slides unpack the examples: organizing and remembering ideas; education and scientific papers; job applications; web writing; business communication; and government forms.`,
    `**Intellectual** — related to thinking and understanding.  
**Practical** — useful for carrying out a real task.`,
    `If the reason is “to organize my thoughts,” it belongs under intellectual. If it is “to apply for a job,” it belongs under practical.`,
  ),
  explainedPage(
    11,
    `Intellectual reason 1 — writing helps you think`,
    `Writing can make thinking clearer by organizing ideas, helping you remember, exposing weak logic, and making you compare pros and cons.`,
    `The slide gives four ways writing supports thinking:

- **Organize and filter ideas:** put thoughts in order and decide which ones matter.
- **Remember:** notes leave a reminder you can return to.
- **Find logical faults:** when an idea is written down, a missing step or contradiction may become easier to notice.
- **Compare pros and cons:** list reasons on both sides, then use the comparison to decide where you stand.

Here, writing is a tool for reasoning, not just a way to show a finished answer to someone else.`,
    `**Filter ideas** — keep what is relevant and set aside what is not.  
**Logical fault** — a gap or contradiction in the reasoning.  
**Pros and cons** — reasons in favor and reasons against.`,
    `When asked how writing helps thought, connect the action (notes, list, outline) to its effect (memory, order, checking logic, or decision).`,
  ),
  explainedPage(
    12,
    `Intellectual reason 2 — create and organize information`,
    `Writing lets you label ideas with concepts and terms, think about them more generally, and save summaries for future use.`,
    `The slide’s phrase **“Create Large Amounts of Information”** is explained with two actions. First, use **concepts and terms** to label ideas; a useful label helps you think about a topic as a general idea rather than only as one isolated case. Second, summarize what you read so you can refer to the key points later.

The point is not that writing invents facts. In this context, writing helps you shape, organize, and preserve information.`,
    `**Concept** — a general idea used to understand examples.  
**Term** — a word or label used for a particular idea.  
**Summary** — a shorter account of the main points.`,
    `If a prompt mentions labeling ideas or summarizing reading for later, it is this second intellectual reason.`,
    `Do not interpret “create information” as permission to add facts that were not in your reading. The slide’s examples are labeling and summarizing.`,
  ),
  explainedPage(
    13,
    `Practical reason — education and scientific papers`,
    `Writing is used throughout education: to demonstrate learning in exams and to produce coursework and more advanced academic work.`,
    `The slide traces writing across education: students learn writing in school and college; exams give them a chance to demonstrate those skills; undergraduate students write term papers, reports, and theories; and later study may involve papers, articles, and master’s or PhD theses.

The shared point is that education asks students both to learn through writing and to communicate what they have learned in written work.`,
    `**Scientific paper** — academic writing that reports or discusses research.  
**Term paper** — a longer assignment about a course topic.  
**Thesis** — a substantial piece of academic writing, often required for an advanced degree.`,
    `When the example is an exam, report, paper, or thesis, the lecture classifies it as a practical reason for writing.`,
  ),
  explainedPage(
    14,
    `Practical reason — applying for a job`,
    `A job application uses writing to present a candidate’s qualifications clearly and make a professional impression.`,
    `The slide says recruiters screen applications, so a candidate needs content that helps them be noticed. It also says credentials should be arranged systematically and presented elegantly to make a positive impression. In practical terms, the applicant is using writing to explain who they are and what qualifications they offer.

This is the lecture’s example of writing for a practical purpose. It does not provide a specific CV format or promise that polished writing guarantees a job.`,
    `**Recruiter** — a person who helps find or select candidates for a job.  
**Credential** — a qualification or experience presented as evidence of suitability.`,
    `A CV or job application belongs under **practical reasons** because it is used to complete a real application task.`,
    `The slide’s statement about recruiters receiving “thousands” is a general course claim, not a current statistic supplied with evidence here.`,
  ),
  explainedPage(
    15,
    `Practical reason — writing for the web`,
    `Web writing matters because people rely on online information, but information online can contain technical or language mistakes.`,
    `The slide makes two points. First, people often use the Internet to find information for tasks, so the quality of web content matters. Second, online information is not automatically reliable: it may contain errors in the subject matter (**technical errors**) or in language (**linguistic errors**).

The lecture’s practical lesson is to treat web writing and web information carefully, not to assume that anything online is correct.`,
    `**Technical error** — a mistake in the subject matter or facts.  
**Linguistic error** — a mistake in wording, grammar, or language.`,
    `If the prompt mentions online information and possible mistakes, connect it to the slide’s reason for treating web writing as important.`,
  ),
  explainedPage(
    16,
    `Practical reasons — business communication and government`,
    `Writing is needed to present business proposals and to complete government forms and applications.`,
    `The slide gives two examples. In **business communication**, a written proposal presents a project or opportunity; poor writing may give the wrong impression and contribute to rejection. In **government**, people fill in forms and applications to carry out different activities.

Both are practical reasons because the writing is used to accomplish a task. The slide does not claim that writing quality alone decides whether a proposal succeeds.`,
    `**Proposal** — a written plan or suggestion asking others to consider a project or opportunity.  
**Application** — a formal request made using a form or document.`,
    `Proposal or project at work → business communication. Form or application for a government activity → government use.`,
  ),
  explainedPage(
    17,
    `True or False — check your understanding`,
    `This page asks you to apply the previous slides: classify writing a CV, judge whether technology makes writing less important, and identify why strategy and research still matter.`,
    `The four statements test the material just covered:

1. A CV is connected to the job-application example on page 14.
2. The claim that technology makes writing less important should be checked against the page 15 point that web information and its quality matter.
3. Different situations may call for different communication strategies; compare with step 3 on page 6.
4. The claim that online scientific papers make writing skills unnecessary should be compared with page 13, which treats writing as part of education and assessment.

Try marking each statement before moving to the next source page, which supplies the answer key.`,
    `**True/False statement** — decide whether the whole sentence agrees with the lecture, not just one phrase.`,
    `For each item, find the earlier slide that supports or contradicts the full statement. Page 18 gives the lecture’s answer key.`,
  ),
  explainedPage(
    18,
    `True or False — answer key and reasons`,
    `The source answer key is: 1 True, 2 False, 3 True, 4 False.`,
    `Check each answer against the source:

1. **True:** page 14 uses applying for a job as a practical reason to learn writing.
2. **False:** page 15 says web information is important and may contain mistakes; technology does not make writing unimportant.
3. **True:** page 6 says to consider possible communication strategies after defining the situation.
4. **False:** page 13 lists writing in exams and academic papers, so online access to research does not remove the need for writing skills.

The slide prints only the answers; the short reasons above connect them to the lecture’s earlier explanations.`,
    `**Answer key** — the answers supplied by the lecture.  
**Practical reason** — a writing task used to accomplish something, such as applying for a job.`,
    `The word **False** means the entire statement conflicts with the lecture. For example, technology may make information easier to access while writing skills still remain useful.`,
  ),
  explainedPage(
    19,
    `Business communication — three core categories`,
    `The lecture groups an organization’s communication into internal operational, external operational, and personal communication.`,
    `Learn the three labels as a set:

1. **Internal operational** — work communication inside the organization.
2. **External operational** — work communication with people or groups outside it.
3. **Personal** — exchanges of information and feelings that help people build and maintain relationships.

The slide’s list says “external operating communication”; the following slides consistently call the category **external operational communication**, so that is the label used in these notes.`,
    `**Internal** — within the organization.  
**External** — outside the organization.  
**Operational** — connected with carrying out the organization’s work.`,
    `First ask who is communicating: coworkers inside the organization, people outside it, or people exchanging information and feelings to sustain relationships.`,
    `Do not confuse “personal communication” with a message sent to a friend outside work. The lecture defines it by exchanging information and feelings and maintaining relationships; see page 22.`,
    `The category list uses “external operating,” while pages 20–21 use “external operational.” The explanation follows the latter repeated term.`,
  ),
  explainedPage(
    20,
    `Internal operational communication — work inside the organization`,
    `Internal operational communication is communication among people inside a business that helps carry out its work and procedures.`,
    `The slide defines this category by both **where** it happens (inside the business) and **what it supports** (doing the work). Its examples are setting organizational goals, supervisors giving orders or instructions, workers preparing reports, and workers writing emails. So the medium does not determine the category: an email can be internal operational when it supports work among people inside the organization.`,
    `**Procedure** — an established way of carrying out a task.  
**Supervisor** — a person who oversees or directs work.  
**Internal operational communication** — work-related communication within the organization.`,
    `Coworkers or supervisors inside the same organization discussing goals, instructions, reports, or work emails → internal operational.`,
  ),
  explainedPage(
    21,
    `External operational communication — work with people outside`,
    `External operational communication supports business work by communicating with people or groups outside the organization.`,
    `The slide names government, the public, customers, agencies, and others as outside audiences. Its examples include advertising to customers through websites, newspapers, or magazines. It adds that external messages convey the organization’s image: each outward-facing message can shape how others view the organization.

For classification, focus on the relationship between sender and recipient, not on whether the message is an email, advertisement, or conversation.`,
    `**Agency** — an organization that carries out a service or function.  
**Organization’s image** — the impression people form of the organization.`,
    `When the recipient is outside the business (for example, a customer or supplier), the communication is external operational in the lecture’s framework.`,
    `An email is not automatically internal: an email to a customer or supplier is external because the recipient is outside the organization.`,
  ),
  explainedPage(
    22,
    `Personal communication — information, feelings, and relationships`,
    `Personal communication is an exchange of information and feelings that helps build and maintain relationships on which business depends.`,
    `The slide links relationships to the way people work together: it says employees’ attitudes directly affect productivity. Personal communication can occur between workmates in many settings—not only at a desk or in a formal meeting. The examples include a waiting room, an airplane, and the workplace.

The location alone does not classify the communication. The key idea in this slide is the exchange of information and feelings that helps sustain relationships.`,
    `**Attitude** — a person’s way of thinking or feeling about something.  
**Productivity** — how much useful work is produced.`,
    `If the description emphasizes sharing feelings or maintaining relationships among workmates, think personal communication.`,
    `Do not classify only by location. The slide says personal communication may happen at work or elsewhere.`,
  ),
  explainedPage(
    23,
    `Multiple choice — name the three categories`,
    `Choose the option that reproduces all three category names from page 19: internal operational, external operational, and personal.`,
    `Compare each option with the lecture’s three-item list. The correct set must include **both** operational categories—internal and external—and the personal category. Option **c** contains that exact set. The repeated slide on page 24 circles c, confirming the source’s marked answer.`,
    `**Broad category** — one of the main groups used to classify an organization’s communication.`,
    `For a “which list is correct?” question, check every item in the option against the source list; one misplaced or missing category makes the whole option incorrect.`,
  ),
  explainedPage(
    24,
    `Multiple choice — answer marked on the source slide`,
    `The source circles **c: internal operational, external operational, and personal**.`,
    `This is the same question as page 23, now with answer **c** circled. The reason is that it matches page 19’s complete three-category list. Options that substitute electronic or face-to-face communication mix communication methods with the lecture’s categories; those are not the three labels asked for here.`,
    `**Electronic** — using an electronic device or system.  
**Face-to-face** — people communicating in person.  
These describe ways or settings of communication, not the three category names in this question.`,
    `When options mix labels that answer different questions, return to the exact classification rule asked for: here, the organization’s three broad categories.`,
  ),
  explainedPage(
    25,
    `Multiple choice — identify the exception to external communication`,
    `Find the option that is not an outside audience. The slide’s next copy marks **d, colleagues**.`,
    `The question asks “all below except,” so three choices should fit external communication and one should not. Suppliers, service companies, and customers are outside audiences in this context. **Colleagues** refers to coworkers within the organization, so the source’s answer on page 26 is **d**.`,
    `**Except** — select the item that does not belong with the others.  
**Colleague** — a person who works with you, usually in the same organization or profession.`,
    `Circle the word **except** in your mind first: it changes the task from finding an example to finding the non-example.`,
  ),
  explainedPage(
    26,
    `Multiple choice — answer marked on the source slide`,
    `The source circles **d: colleagues** as the exception to the outside audiences.`,
    `The three other options—suppliers, service companies, and customers—are outside the business in the scenario. Colleagues are treated as people inside the organization, so they are the exception. This follows the internal/external boundary taught on pages 20 and 21.`,
    `**Supplier** — a person or business that provides goods or services to another business.`,
    `Use the organization boundary: outside contacts are external; coworkers are internal.`,
  ),
  explainedPage(
    27,
    `What is a business message?`,
    `A business message has focused content related to business, is directed to an internal or external audience, and uses an appropriate degree of formality to reach its purpose.`,
    `The slide gives three features. First, the content is **precise** (focused and specific) and business-related. Second, the audience can be **external** (such as clients, creditors, or service providers) or **internal** (such as employees or the board of directors). Third, the message is transmitted with a degree of formality so it can achieve its purpose with its recipients.

The important idea is to consider purpose and audience together: who needs the message, what business information it carries, and how formally it should be presented.`,
    `**Client** — a customer who receives a professional service.  
**Creditor** — a person or organization to whom money is owed.  
**Formality** — how official or professional the wording and presentation are.`,
    `Before writing, identify the business purpose and whether the recipients are inside or outside the organization.`,
    `The slide calls for “a degree of formality”; it does not say every business message must use the same level of formality.`,
  ),
  explainedPage(
    28,
    `Types of business messages — verbal and written`,
    `The lecture distinguishes verbal messages, often used for routine business activity, from written messages, useful when information needs to be filed or compiled.`,
    `The slide lists two forms:

1. **Verbal business message:** the slide calls verbal communication the primary mode of passing a message and says it is frequently used for routine business activities.
2. **Written business message:** used when information needs to be filed and compiled—that is, collected or kept as a record. The slide warns that errors in written business messages can have consequences, including financial loss.

The choice depends on the communication task and whether a written record is needed. **Study aid:** “Verbal/written” describe the form of a message, while “routine/positive/negative/persuasive” on the next slides describe its purpose. A message could be both written and persuasive; the slides do not say these labels are mutually exclusive.`,
    `**Verbal** — expressed in spoken words in this slide’s contrast with written messages.  
**File** — keep a document as a record.  
**Compile** — collect information into an organized whole.`,
    `If the question emphasizes keeping a record, filing, or compiling information, the lecture points to a written business message.`,
    `Do not read “verbal” as “anything communicated”: in this slide it is contrasted with written messages and means spoken communication.`,
  ),
  explainedPage(
    29,
    `Types of business messages — routine and positive`,
    `Routine messages pass ordinary information to an audience; positive messages express praise or appreciation to employees or clients.`,
    `The slide describes two purposes:

3. **Routine business message:** conveys details about an upcoming event or other routine information. Its example is an internal email confirming the date of the monthly staff meeting.
4. **Positive business message:** gives recognition to employees (for example, praising good work or reaching a sales quota) or shows a client appreciation for doing business with the company.

Both examples are classified by what the message is meant to do, not by whether it is spoken or written.`,
    `**Routine** — regular or ordinary, rather than unusual.  
**Quota** — a target amount of sales or work.  
**Appreciation** — an expression of thanks or recognition.`,
    `Meeting details or ordinary updates → routine. Praise or thanks → positive.`,
  ),
  explainedPage(
    30,
    `Types of business messages — negative and persuasive`,
    `A negative message communicates an unfavorable matter professionally; a persuasive message tries to influence the recipient to take an action.`,
    `The source gives two purposes:

5. **Negative business message:** communicates fear or frustration without rudeness and with professionalism. Its example is a notice to employees about lateness and a possible financial penalty.
6. **Persuasive business message:** aims to influence the recipient to act. The example is a sales letter encouraging the reader to buy a product or service.

The key difference is the aim: a negative message communicates an unfavorable matter; a persuasive message makes a case for a particular action.`,
    `**Professional** — suitable for a work setting.  
**Persuade** — try to influence someone’s decision or action.`,
    `If the message asks the recipient to do something because of reasons or an appeal, think persuasive. If it communicates an unfavorable matter, think negative.`,
    `The source’s description of a negative message is a course label and example; do not confuse “negative” here with rude or insulting language.`,
  ),
  explainedPage(
    31,
    `Multiple choice — recognize the listed message types`,
    `The options list verbal, written, and persuasive messages—all are types named in the lecture; the source’s next copy marks **d, all of the above**.`,
    `Check each listed item against the lecture: verbal and written messages appear on page 28; persuasive messages appear on page 30. Since all three are named types, the combined answer is **all of the above**. Page 32 shows the source’s circled answer.`,
    `**All of the above** — every listed option is included in the answer.`,
    `For “which are types?” questions, test each option separately before choosing the combined answer.`,
  ),
  explainedPage(
    32,
    `Multiple choice — answer marked on the source slide`,
    `The source circles **d: all of the above**.`,
    `The marked answer is supported because the lecture explicitly names verbal, written, and persuasive business messages on pages 28 and 30. “All of the above” is correct when every listed item fits the category asked about.`,
    `**Persuasive message** — a message intended to influence the recipient to take an action.`,
    `Before selecting “all,” make sure none of the individual options is an invented category or a mismatch.`,
  ),
  explainedPage(
    33,
    `Multiple choice — which option is not a listed type?`,
    `Among verbal, conceptual, positive, and persuasive, the source’s marked exception is **conceptual**.`,
    `The lecture names **verbal** messages (page 28), **positive** messages (page 29), and **persuasive** messages (page 30). It does not list “conceptual” as one of its business-message types. Page 34 circles **b**.

This question is about the categories taught in this lecture. It is not a claim that a business message can never discuss a concept.`,
    `**Conceptual** — relating to an idea or concept.  
**Listed type** — a category explicitly named in the lesson’s classification.`,
    `For questions asking what is “not” a type, compare each option with the lesson’s labels instead of judging whether the word could ever describe a message in ordinary life.`,
  ),
  explainedPage(
    34,
    `Multiple choice — answer marked on the source slide`,
    `The source circles **b: conceptual** as the option that is not one of the listed business-message types.`,
    `The other labels—verbal, positive, and persuasive—appear in the lecture’s classification. “Conceptual” is not one of the categories listed, so it is the intended answer. Keep the scope of the answer narrow: the question tests the lecture’s taxonomy, not every possible topic a business message might discuss.`,
    `**Taxonomy** — a system for grouping or classifying things.`,
    `Answer using the course’s named categories. This prevents a plausible everyday meaning from distracting you from what the question tests.`,
  ),
  visualPage(
    35,
    `Thank you — questions?`,
    `Closing slide with EELU branding and an invitation for questions. It adds no new lesson content.`,
  ),
];

export const technicalReportWritingUnit1Part1Lesson: Lesson = {
  id: 'technical-report-writing-unit-1-part-1-archive',
  courseId: 'technical-report-writing',
  sourceKey: 'archive:technical-report-writing:Unit1_part1.pdf',
  sourcePath: 'Technical Report Writing/Unit1_part1.pdf',
  title: 'Unit 1, Part 1: Communication and Business Writing',
  sourcePageCount: 35,
  pages,
  lastReviewed: '2026-10-14',
};
