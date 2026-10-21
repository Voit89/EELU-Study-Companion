import type { Lesson, LessonPage } from '../types';

interface TeachingNotes {
  recognition?: string;
  trap?: string;
  analogy?: string;
}

function explainedPage(
  sourcePage: number,
  title: string,
  takeaway: string,
  explanation: string,
  terms?: string,
  note?: string,
  teaching?: TeachingNotes,
): LessonPage {
  const blocks: LessonPage['blocks'] = [{ type: 'zobda', text: takeaway }];
  if (terms) blocks.push({ type: 'recognition', title: 'Key words and labels', markdown: terms });
  if (teaching?.recognition) {
    blocks.push({ type: 'recognition', title: 'If you see this, think…', markdown: teaching.recognition });
  }
  blocks.push({ type: 'foundation', title: 'Step-by-step walkthrough', markdown: explanation });
  if (teaching?.trap) {
    blocks.push({ type: 'trap', title: 'Common trap to avoid', markdown: teaching.trap });
  }
  if (teaching?.analogy) {
    blocks.push({ type: 'alternate', title: 'A quick mental picture', markdown: teaching.analogy });
  }
  return { sourcePage, title, coverage: 'explained', blocks, ...(note ? { note } : {}) };
}

function visualPage(sourcePage: number, title: string, note: string): LessonPage {
  return { sourcePage, title, coverage: 'visual-only', blocks: [], note };
}

const pages: LessonPage[] = [
  visualPage(
    1,
    'Introduction to Computer and Information Systems — course cover',
    'The cover identifies the course, semester, academic year, and course coordinator. It has no lesson explanation. Some coordinator text is overlapped by the inserted design, so rely on the readable source text rather than the image overlay.',
  ),
  visualPage(
    2,
    'About the course — code, credit hours, and textbook',
    'Course information slide: IT110, three credit hours, and the listed textbook by O’Leary and colleagues (2021), *Computing Essentials: Making IT Work for You*, 28th edition, McGraw Hill. This is course administration rather than a computer concept lesson.',
  ),
  visualPage(
    3,
    'Course professors and learning centers',
    'Administrative slide listing course professors and learning centers; it introduces no computer-system concept.',
  ),
  visualPage(
    4,
    'Assessment plan and question formats',
    'The slide lists participation 10%, two quizzes 20%, midterm 20%, and final 50% (the weights total 100%). It also lists multiple-choice, true/false, and essay questions. The phrase “Essay 50%” does not clearly state which assessment or scope it refers to, so this lesson does not infer that relationship.',
  ),
  visualPage(
    5,
    'Grade-point scale',
    'The slide’s printed grade bands leave exactly 90 unassigned: A+ is “more than 90,” while A is 85 to less than 90. This lesson preserves the printed boundaries and does not guess how a score of exactly 90 is handled.',
  ),
  visualPage(
    6,
    'Course outline — topics covered in the semester',
    'The outline lists introduction to computers and information systems, the Internet, application and system software, hardware, networking, databases, and systems analysis/design/algorithm development. It is a course map, not a detailed explanation of these topics.',
  ),
  visualPage(
    7,
    'Course objectives',
    'The slide states goals such as becoming computer-savvy, understanding computer capabilities and harms, knowing when to solve a problem or seek help, and making better purchasing decisions based on component quality and usefulness.',
  ),
  visualPage(
    8,
    'Prerequisites for later courses',
    'Administrative progression slide: Programming Techniques is listed for the first year, second semester; Computer Networks Technology for the second year, first semester.',
  ),
  visualPage(
    9,
    'Module 1 — Introduction to Computer and Information Systems',
    'Module title slide. The topic outline follows on source slide 10.',
  ),
  visualPage(
    10,
    'Module outline — introduction to computers',
    'The outline lists introduction, basic computer-system components, computer types, personal-computer hardware, and data/connectivity/forces of technology. “Introduction” is highlighted in the source image; the explanation starts on slide 11.',
  ),
  explainedPage(
    11,
    'What is a computer? — data in, information out',
    'A computer is a programmable electronic device that takes in raw facts (data), processes them, and produces useful results (information) that can be displayed or stored for later retrieval.',
    `Follow the diagram from left to right: **Data → Processing → Information**. Data means raw facts, such as individual values. Processing means the computer works on those facts according to instructions. Information is the useful result, such as a summary, total, or report. The result can be displayed or saved so it can be retrieved later.

The slide says computers help solve problems faster and increase productivity. Those are the stated purposes; the basic input-process-output sequence explains how the computer turns data into something useful.`,
    `**Programmable** — able to follow a set of instructions.  
**Data** — raw facts supplied to the computer.  
**Processing** — work performed on the data.  
**Information** — the processed, useful output.  
**Retrieve** — get saved information back when it is needed.`,
    'The inserted diagram overlaps part of the slide’s purpose sentence in the visual rendering. The definition and data-to-processing-to-information flow are readable; the full purpose wording is available in extracted slide text.',
    {
      recognition: 'When you see raw facts being changed into a summary, total, or report, identify the raw facts as data and the useful result as information.',
      analogy: 'As a mental picture, data are ingredients, processing is the preparation, and information is the finished dish. This helps remember the flow but is not the lecture’s formal definition.',
    },
  ),
  explainedPage(
    12,
    'Computer programs — instructions written as code',
    'A computer program is a set of instructions that tells the computer what to do next; programmers write code to make the computer carry out a task or solve a problem.',
    `The code example calculates the area of a circle for a radius of 20 and prints the result. Read it in this order:

1. \`radius = 20\` stores the value 20 under the name \`radius\`.
2. \`area = 3.14 * radius * radius\` multiplies 3.14 by the radius twice. Substituting the value gives \`3.14 × 20 × 20\`.
3. First, \`20 × 20 = 400\`; then \`3.14 × 400 = 1256\`. So the stored value of \`area\` is 1256.
4. The final print instruction displays the words “The Area of circle :” and the calculated value.

The lines beginning with \`#\` are comments for a human reader; they describe the next instruction and are not the calculation itself. The source code is Python-style, but the slide’s point is what program instructions do.`,
    `**Code** — instructions written in a form a computer can execute.  
**Variable** — a named place for a value; here, \`radius\` and \`area\` are names.  
**Comment** — explanatory text in the example that starts with \`#\`.  
**\`*\`** — multiplication in the displayed code.`,
    'The source code screenshot appears to spell the comment “Calculat Area of circle” without the final e. It does not affect the calculation. The code uses 3.14 as an approximation for π; the numeric result shown by this example is 1256.',
    {
      recognition: 'If a slide or question shows a sequence of computer instructions, variables, and a final output command, it is illustrating a program: the instructions specify the steps the computer performs.',
      trap: 'Do not mistake the comment for an instruction that calculates anything. The actual calculation is the assignment to `area`; the print line displays the value.',
    },
  ),
  explainedPage(
    13,
    'Information technology (IT)',
    'Information technology is the broad term for technology used to produce, manipulate, store, communicate, or distribute information.',
    'The slide defines IT by the kinds of work the technology helps with. **Produce** information, **manipulate** it by changing or organizing it, **store** it for later, **communicate** it to others, or **disseminate** it by distributing it. The term covers technology that supports any of these information-related activities.',
    `**IT** — information technology.  
**Manipulate** — work with or change information.  
**Disseminate** — distribute or share information with others.`,
    undefined,
    {
      recognition: 'If a description is about technology helping create, change, save, communicate, or distribute information, the slide’s broad term is IT.',
    },
  ),
  explainedPage(
    14,
    'Information and communication technologies (ICT)',
    'ICT combines information technology with communication technology so information can be represented and communicated more effectively.',
    'The slide expands **ICT** as “Information and Communication Technologies.” It describes ICT as the combination of information and communication technologies and says this combination supports more effective representation of information. In short, the communication side is made explicit alongside the information-handling side.',
    `**ICT** — Information and Communication Technologies.  
**Represent information** — express or present information in a form people or systems can use.`,
    undefined,
    {
      recognition: 'If the prompt emphasizes information technology together with communication technology, use the combined term ICT.',
      trap: 'The slide distinguishes the terms by what their names emphasize: IT is the broad information-technology term; ICT explicitly includes communication technologies too.',
    },
  ),
  explainedPage(
    15,
    'Information systems (IS) — connected parts working for a purpose',
    'An information system combines people, procedures, software, hardware, data, and the Internet to collect and process data and to store, analyze, and share information for a specific purpose.',
    `The slide describes an information system as a combination of six elements: people, procedures, software, hardware, data, and the Internet. Together, they collect and process data, then store, analyze, and disseminate the resulting information to meet a purpose.

An effective information system provides information that is **accurate**, **timely**, and **relevant**. These mean correct, available when needed, and useful for the task. The slide warns that poorly organized or maintained data can produce poor information and therefore poor decisions. So the quality of decisions depends in part on the quality and care of the data and system.`,
    `**Information system (IS)** — the combination of elements that handles information for a purpose.  
**Accurate** — correct.  
**Timely** — available when it is needed.  
**Relevant** — connected to the task or decision.  
**Disseminate** — distribute or share.`,
    'The source lists the Internet as one of the six elements in its definition. The small keyboard illustration is decorative and does not add a seventh element.',
    {
      recognition: 'If a question asks what combines people, procedures, programs, equipment, data, and Internet access to provide useful information for a purpose, it is describing an information system.',
      trap: 'Do not define an information system as hardware or software alone. The lecture treats it as a combination of six elements, including people and procedures.',
      analogy: 'A useful mental picture is a team: people follow procedures and use tools and data together to produce information for a goal. The analogy helps show why no single component is the whole system.',
    },
  ),
  visualPage(
    16,
    'Module outline — basic computer-system components',
    'Transition slide in the module outline. “Computer System Basic Components” is highlighted; the six components are listed on source slide 17.',
  ),
  explainedPage(
    17,
    'Information-system components — six elements',
    'The lecture’s six components are people, software, hardware, database, network, and procedures.',
    'This slide is the component map for the pages that follow. **People** use the system; **software** provides programs and instructions; **hardware** is the physical equipment; a **database** organizes related data; a **network** connects computers to share resources; and **procedures** tell people how to combine the parts to process information and produce the needed output. Each following slide explains one or more of these parts.',
    `**Database** — an organized collection of related data.  
**Network** — a connection system that allows computers to communicate or share resources.  
**Procedure** — an instruction for how to perform part of the information-processing work.`,
    undefined,
    {
      recognition: 'When asked to name the information-system components from this lecture, recall all six: people, software, hardware, database, network, procedures.',
    },
  ),
  explainedPage(
    18,
    'People — end users and other system users',
    'People are the people who work with the system, interact with it, or use what it produces; the slide calls them the most important part of an information system.',
    'The slide uses **end users** for people who work with or use the computer system’s output. This can include someone entering information into a program or someone reading the report it produces. The lecture stresses that people are the most important component, even though the other system elements are also needed.',
    '**End user** — a person who uses or interacts with the system, including someone who uses its output.',
    undefined,
    {
      recognition: 'If the description is about entering data, working with the system, or using its reports, it refers to people/end users.',
      trap: 'Do not treat the computer as the whole information system. A person using it or relying on its output is one of the system’s elements.',
    },
  ),
  explainedPage(
    19,
    'Software — programs that tell hardware what to do',
    'Software is the set of programs and instructions that tells hardware how to process data into the form users need.',
    `The slide says **software** is another name for programs, and these words are often used interchangeably. Programs are instructions for the hardware. They should be developed carefully and tested thoroughly.

The page introduces two categories:

- **System software** is used by the computer to manage and operate the system.
- **Application software** is used by an end user to do a task.

The next two slides explain those categories in more detail.`,
    `**Program** — a set of instructions for a computer.  
**System software** — software that operates or manages the computer system.  
**Application software** — software an end user uses to perform a task.`,
    undefined,
    {
      recognition: 'If the software manages the computer itself, think system software. If a person uses it to do a task, think application software.',
      trap: 'Software is not the physical device. The programs are instructions; hardware is the equipment that carries them out.',
    },
  ),
  explainedPage(
    20,
    'System software — operating systems and utilities',
    'System software helps application software interact with hardware; it includes the operating system and utilities.',
    `The slide first describes system software as the software that lets applications interact with hardware and manages computer resources in the background.

1. **Operating system (OS):** coordinates computer resources, provides a user interface, and runs applications. The slide names Windows 10 and Apple’s Mac OS as examples.
2. **Utilities:** manage computer resources. The slide identifies antivirus software as an especially essential utility because viruses or malicious programs can damage a computer or compromise privacy and security.

These roles explain why system software can work in the background while supporting the applications a person opens.`,
    `**Resource** — a part of the computer system that software can manage or use.  
**Operating system (OS)** — system software that coordinates resources, provides the user interface, and runs applications.  
**Utility** — system software for managing or maintaining resources.  
**Antivirus** — a utility intended to protect against viruses and other malicious programs.`,
    'The rendered slide clips the lower part of the antivirus paragraph. The extracted text identifies the stated risk as damage to the computer and compromise of privacy/security; any unseen visual detail is not inferred. Windows 10 is retained as the historical example named in this source, not as a claim about a current release.',
    {
      recognition: 'If software coordinates resources, provides the interface, and starts applications, identify it as the operating system. If it protects or maintains the system, it is a utility.',
      trap: 'Do not confuse the operating system with an application such as Word or Excel. The OS supports the computer and its applications; an application is used for a user task.',
    },
  ),
  explainedPage(
    21,
    'Application software — programs for user tasks',
    'Application software is used by the end user; the slide groups it into general-purpose, specialized, and mobile applications.',
    `The slide names three application-software types:

1. **General-purpose or off-the-shelf applications** handle common tasks. Examples listed are Word, Excel, Access, and PowerPoint.
2. **Specialized applications** serve narrower fields or tasks, such as graphics or Web authoring.
3. **Mobile applications (apps)** are programs designed for phones or tablets; the slide gives social networking, games, music, and video as examples.

Classify an application by the kind of task or user the slide describes.`,
    `**Off-the-shelf** — ready-made software intended for common tasks.  
**Specialized** — designed for a narrower task or field.  
**Mobile app** — an application for a phone or tablet.`,
    undefined,
    {
      recognition: 'Common office tasks suggest general-purpose software; a narrow field such as graphics suggests specialized software; a phone or tablet app suggests mobile software.',
      trap: 'A program does not become system software just because it is installed on the computer. The deciding clue is its role: managing the computer or helping the user do a task.',
    },
  ),
  explainedPage(
    22,
    'Hardware and databases — physical devices and organized data',
    'Hardware is the physical equipment that accepts, processes, or presents data; a database is a collection of related files or tables that organizes data and lets related items be associated.',
    `The slide names a processor, monitor, keyboard, and printer as hardware examples. It describes hardware collectively as accepting data or information, processing it, and displaying results. It should be reliable and capable of handling its expected workload.

The slide then defines a **database** as a collection of related files or tables. The relationships let the system associate related data rather than treat every fact as unrelated. For example, a table can hold one kind of record and another table related records; the source does not give a specific database schema.`,
    `**Hardware** — the physical parts of a computer system.  
**Processor** — the hardware that performs processing.  
**Database** — an organized collection of related files or tables.  
**Workload** — the amount and kind of work the equipment is expected to handle.`,
    undefined,
    {
      recognition: 'If it is a tangible device such as a keyboard or monitor, it is hardware. If the description emphasizes related records organized in files or tables, it is a database.',
      trap: 'A database stores and organizes data; it is not itself the physical hardware that runs the computer.',
    },
  ),
  explainedPage(
    23,
    'Networks and procedures — sharing resources and producing output',
    'A network connects computers so they can share resources; procedures are the instructions for combining system components to process information and produce the desired output.',
    `The slide gives two definitions:

- A **network** is a connection system that allows resource sharing among computers. A shared resource could be something computers access through the connection; the key idea on this slide is sharing.
- **Procedures** are instructions that explain how to combine the information-system components to process information and produce the desired output.

Software gives instructions to the computer, while procedures describe how the system’s components are to be used in the work process.`,
    `**Network** — a system connecting computers for communication or resource sharing.  
**Procedure** — an instruction describing how to carry out a process.  
**Output** — the result produced by processing.`,
    undefined,
    {
      recognition: 'Resource sharing between connected computers signals a network. Instructions describing how people and components carry out a task signal procedures.',
      trap: 'A network is the connection; a procedure is the set of instructions for the work. They are different kinds of information-system components.',
    },
  ),
  explainedPage(
    24,
    'How information-system elements interact — customer checks example',
    'The four-step diagram shows people, procedures, data, software, and hardware working together to process customer checks and print statements.',
    `Follow the numbered flow in the diagram:

1. IT staff (**people**) develop the **procedures** for recording checks received from customers. A check is the incoming **data** in this example.
2. Employees in accounts receivable (**people**) use a program (**software**) to enter the check data into the computer.
3. The computer (**hardware**) calculates the accounts-receivable data and stores the results on a storage medium, such as a hard disk (**hardware**).
4. Customer statements (**information**) are printed on the company’s printer (**hardware**).

The example connects components rather than describing one component in isolation: people follow procedures, use software, enter data, let hardware process and store it, and receive information as printed output.`,
    `**Accounts receivable** — in this example, the records of money customers owe or have paid.  
**Storage medium** — a device or material used to save data; the slide gives a hard disk.  
**Statement** — the printed information sent to a customer.`,
    undefined,
    {
      recognition: 'When reading a system diagram, trace the arrows or numbered steps and label each role: who acts, which procedure they follow, what data enters, what software/hardware processes it, where results are stored, and what information comes out.',
      trap: 'Do not call the customer check the output: it is data entered at step 2. The printed customer statement is the information output at step 4.',
    },
  ),
  explainedPage(
    25,
    'Review — true or false',
    'The printed answers are F, T, T, F. Each statement can be checked against the definitions on slides 13, 12, 23, and 15.',
    `**1. “A computer is a general term that describes any technology that helps to produce, manipulate, store, communicate, and/or disseminate information.” — False.** That wording describes **information technology (IT)** on slide 13; slide 11 defines a computer as a programmable electronic device that processes data into information.

**2. “A computer program is a set of instructions that tells the computer what to do next.” — True.** This matches the program definition on slide 12.

**3. “A network is a communication system connecting two or more computers.” — True.** This matches the network idea on slide 23.

**4. “ICT collects, processes, stores, analyzes, and disseminates information for a specific purpose.” — False.** That description is the information-system definition on slide 15, not the ICT definition on slide 14.`,
    `**True/false** — judge the complete statement. A statement can contain a correct definition but assign it to the wrong term.  
**Printed key** — F, T, T, F.`,
    undefined,
    {
      recognition: 'For each item, identify the defined term first, then compare the wording to the lecture: computer, program, network, or information system.',
      trap: 'Do not mark a statement true merely because its description sounds familiar. Question 1 uses the IT definition but calls it a computer; question 4 uses the IS definition but calls it ICT.',
    },
  ),
  explainedPage(
    26,
    'Review — multiple choice',
    'The concepts are clear: a network enables resource sharing, and people are identified as the most important part of an information system. The printed option letter for the second answer is inconsistent with the visible option layout.',
    `**Question 1:** Which item is a connection system that permits resource sharing? The options are Database, Procedures, Networks, and Hardware. The key marks **c) Networks**, which matches the definition on slide 23.

**Question 2:** Which is described as the most important part of an information system? The concept answer is **People**, as stated on slide 18. The slide’s answer key prints **d**, but the option lettering in the rendered page continues through extra letters and places “People” below the visible crop. Because the printed option letter and rendered layout do not align clearly, use the concept answer “People” rather than relying on the letter.`,
    `**Resource sharing** — allowing connected computers to use or access shared resources.  
**People** — the component the lecture calls most important in an information system.`,
    'The source slide’s second question has a layout/key mismatch: the visible option labels continue past d, the “People” choice is partly below the rendered slide boundary, and the printed key says d. The concept is corroborated by slide 18; the intended letter cannot be safely recovered from this rendering.',
    {
      recognition: 'For question 1, look for the component whose definition mentions connecting computers for sharing: network. For question 2, recall the lecture’s explicit statement that people are the most important IS component.',
      trap: 'When an answer key letter conflicts with the visible option labels, do not memorize the letter. Check the term itself against the earlier definition.',
    },
  ),
  {
    sourcePage: 27,
    title: 'Thank you — closing slide',
    coverage: 'visual-only',
    blocks: [],
    note: 'Closing slide; it contains no additional lesson content.',
  },
];

export const introductionToComputersLecture1Lesson: Lesson = {
  id: 'introduction-to-computers-lecture-1-current',
  courseId: 'introduction-to-computers',
  sourceKey: 'current:introduction-to-computers:Lec 1 (Introduction to computer and information systems).pptx',
  sourcePath: 'Lec 1 (Introduction to computer and information systems).pptx',
  title: 'Lecture 1: Introduction to Computers and Information Systems',
  sourcePageCount: 27,
  pages,
  lastReviewed: '2026-10-14',
};
