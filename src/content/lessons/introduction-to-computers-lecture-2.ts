import type { Lesson, LessonPage } from '../types';

interface PageTeachingNotes {
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
  teaching?: PageTeachingNotes,
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

const pages: LessonPage[] = [
  {
    sourcePage: 1,
    title: 'Introduction to Computers — course cover',
    coverage: 'visual-only',
    blocks: [],
    note: 'The cover identifies the course, coordinator, semester, and academic year. It contains no computer lesson content.',
  },
  {
    sourcePage: 2,
    title: 'Module 1 — Introduction to Computer and Information Systems',
    coverage: 'visual-only',
    blocks: [],
    note: 'Module title slide. The lesson outline begins on source slide 3.',
  },
  {
    sourcePage: 3,
    title: 'Module outline — topic sequence',
    coverage: 'visual-only',
    blocks: [],
    note: 'The outline lists introduction, basic computer-system components, computer types, personal-computer hardware, and data, connectivity, and forces of technology. It highlights “Types of Computers” before the lesson moves to the next outline item on slide 15.',
  },
  explainedPage(
    4,
    'Types of computers — classification dimensions',
    'The lecture groups computers by size, speed, processing power, and price, then introduces four broad classes.',
    'The slide names four categories: supercomputers, mainframe computers, minicomputers or midrange computers, and microcomputers or personal computers. The following slides compare these groups. In the order presented, the categories generally move from the largest and most powerful toward smaller personal computers.\n\nUse the specific clues on the later slides to identify a category: supercomputers are described as the most powerful and expensive; mainframes handle very large data-heavy jobs; minicomputers support multiple users; and microcomputers are the common single-user personal computers.',
    '**Processing power** — how much computing work a computer can perform.  \n**Capacity** — the amount of data or work a system can handle or store, as the context requires.  \n**Midrange** — the alternate name paired with minicomputer in this lecture.',
    undefined,
    {
      recognition: 'When a question compares a computer by size, speed, processing power, or price, first identify which of the four course categories it is describing.',
    },
  ),
  explainedPage(
    5,
    'Supercomputers — the highest-capacity class in this lecture',
    'The slide describes supercomputers as the largest, fastest, most powerful, and most expensive class, used for very large data and computing jobs.',
    'The lecture says a supercomputer can process and store very large amounts of data and can perform “hundreds of millions of instructions per second.” An instruction is a computer command; instructions per second is a measure of processing speed.\n\nThe slide gives NASA and weather forecasting as examples of where this special high-capacity computing is used. Its picture shows a room of large computer systems, matching the scale described in the text.',
    '**Instruction** — a command the processor can carry out.  \n**Instructions per second** — a count of how many such commands are performed in one second.  \n**High-capacity** — able to handle large computing or data demands.',
    'The speed phrase is reported as written on the supplied slide, not as a current benchmark for every supercomputer.',
    {
      recognition: 'If the clue is “largest, fastest, most powerful, and most expensive,” choose supercomputer. NASA and weather forecasting are the examples on this slide.',
      trap: 'Do not confuse a supercomputer with a mainframe just because both are powerful. The lecture distinguishes supercomputers by the top size, speed, power, and price description.',
    },
  ),
  explainedPage(
    6,
    'Mainframe computers — large data-processing jobs',
    'A mainframe is below a supercomputer in the slide’s size, price, capacity, and speed comparison, but it still handles very large jobs with substantial storage and processing needs.',
    'The slide says mainframes are smaller, less expensive, and lower in capacity and processing speed than supercomputers. That comparison does not mean they are small or weak: the next bullet says they handle very large jobs requiring large data storage and high processing speed.\n\nThe example is an insurance company processing information about millions of policyholders. The picture shows large mainframe equipment.',
    '**Mainframe** — the course category associated here with large, data-heavy work.  \n**Policyholder** — a person or organization covered by an insurance policy.',
    undefined,
    {
      recognition: 'If the clue is a very large organization processing records for millions of people, match it to the mainframe example on this slide.',
      trap: '“Smaller than a supercomputer” is a relative comparison. Do not read it as saying a mainframe is a small desktop computer.',
    },
  ),
  explainedPage(
    7,
    'Minicomputers and midrange computers — multi-user systems',
    'The lecture describes minicomputers or midrange computers as less costly and less powerful than mainframes, with support for 10 to hundreds of simultaneous users.',
    'The slide compares this category with mainframes: minicomputers are smaller, have less capacity, cost less, and have lower processing speed. It calls them multi-user computers because they can support 10 to hundreds of users at the same time. The slide also refers to them as servers.\n\nIt says these systems were originally used by medium-sized companies or departments in large companies. It then describes their use in serving end users who need a particular service, such as retrieving data from a database or accessing application software. The image shows server-style equipment.',
    '**Multi-user** — able to support multiple people using the system at the same time.  \n**Server** — the term this slide uses for this category of computer.  \n**Database** — an organized collection of data.',
    'The “10 to hundreds” range and the server description are the wording and classification used by this supplied lecture.',
    {
      recognition: 'If a question emphasizes 10 to hundreds of users at once, database access, or serving application software, look for minicomputer or midrange computer.',
      trap: 'The source uses “minicomputer,” “midrange computer,” and “server” together. Follow that terminology when answering from this lecture.',
    },
  ),
  explainedPage(
    8,
    'Microcomputers and personal computers — common single-user systems',
    'The lecture calls microcomputers or personal computers the least powerful of the four classes, but the most frequently used and fastest-growing.',
    'Compared with minicomputers or midrange computers, the slide describes personal computers as smaller, less expensive, lower in capacity, and slower in processing speed. It also says they are single-user computers based on a microprocessor.\n\nThe image is titled “Types of Microcomputer” and illustrates personal devices, including a phone, tablet, laptop-style devices, and a desktop computer. The text gives the category and comparison; the image supplies examples rather than a new ranking.',
    '**Microcomputer / personal computer** — the paired category names used on the slide.  \n**Single-user** — intended for one user in the lecture’s classification.  \n**Microprocessor** — the processing component on which the computer is based.',
    undefined,
    {
      recognition: 'If the clues say common, single-user, and based on a microprocessor, choose microcomputer or personal computer.',
      trap: '“Most frequently used” does not mean “most powerful.” The same slide calls this the least powerful of the four broad classes.',
    },
  ),
  explainedPage(
    9,
    'Personal-computer types — five forms',
    'The slide divides personal computers into desktops, laptops, tablets, smartphones, and wearables.',
    'The diagram places a labeled category beside an example image: Desktop, Laptop (Notebook), Tablet, Smartphones, and Wearables. Read each label as one of the five personal-computer forms in the text. The nearby examples show a desktop setup, portable computers, a tablet, phones, and a smartwatch.\n\nThe later slides describe each type separately, so use this page as the category map rather than as a detailed comparison.',
    '**Desktop** — a personal computer that stays at a desk.  \n**Laptop / notebook** — a portable personal computer.  \n**Wearable** — a computing device worn on the body.',
    undefined,
    {
      recognition: 'If a question asks for the five personal-computer types, use the five labels in the diagram in this order: desktop, laptop, tablet, smartphone, wearable.',
    },
  ),
  explainedPage(
    10,
    'Desktop computers — designed to stay at a desk',
    'A desktop is small enough to sit on or beside a desk, but too large to carry around.',
    'The slide’s defining contrast is that a desktop fits in a desk setup but is not portable. The picture shows the components of one desktop arrangement: a display, a keyboard, and a separate tower or system unit.',
    '**Desktop computer** — the personal-computer type described by its desk-sized, non-portable form.',
    undefined,
    {
      recognition: 'If the description says the computer sits on or beside a desk and is too big to carry, choose desktop.',
      trap: 'The display by itself is not the full desktop computer shown in the picture; the image also includes the separate tower and keyboard.',
    },
  ),
  explainedPage(
    11,
    'Laptop and notebook computers — portable PCs',
    'A laptop or notebook is thin and lightweight enough to carry and use in different places.',
    'The slide gives portability as the main feature: users can carry the computer and use it in a variety of locations. It says these computers are often designed to fit on the user’s lap. The laptop image supports the portable form shown in the text.',
    '**Portable** — designed to be carried and used in different places.  \n**Laptop / notebook** — the two names paired for this personal-computer type.',
    undefined,
    {
      recognition: 'If the description emphasizes thin, lightweight, and usable in multiple locations, choose laptop or notebook.',
      trap: 'A laptop is distinct from the desktop description on slide 10: the key clue here is that it can be carried around.',
    },
  ),
  explainedPage(
    12,
    'Tablet computers — touch-screen portable devices',
    'The lecture describes tablets as smaller, lighter, and generally less powerful than laptops, with a touch-sensitive screen instead of a standard keyboard.',
    'The slide groups a tablet as a special type of laptop computer. It explains that the user can write or draw with a digital pen because the screen is touch-sensitive. A virtual keyboard can also appear on the screen for typing. The image shows a tablet with its screen and no attached standard keyboard.',
    '**Touch-sensitive** — responds when the user touches the screen.  \n**Digital pen** — a pen-shaped tool for writing or drawing on the screen.  \n**Virtual keyboard** — an on-screen keyboard.',
    '“Special type of laptop computer” is the grouping used on this slide.',
    {
      recognition: 'If the device is smaller and lighter than a laptop and uses a touch screen, digital pen, or on-screen keyboard, choose tablet.',
      trap: 'The slide says the tablet does not have a standard keyboard. A virtual keyboard can still appear on its touch screen.',
    },
  ),
  explainedPage(
    13,
    'Smartphones — handheld computers with phone service',
    'A smartphone combines phone service with an operating system and apps for tasks such as browsing, videos, e-books, and games.',
    'The slide calls smartphones the most widely used handheld computers. They connect wirelessly through Wi-Fi or mobile phone networks such as 3G, 4G, or 5G. In addition to phone service, they run applications for web browsing, video, e-books, games, and other tasks. The slide names iOS and Android as operating-system examples.\n\nThe picture shows several phones. The key idea is that this device is a handheld computer as well as a phone.',
    '**Wi-Fi** — a wireless way to connect to a network.  \n**Mobile network** — a cellular connection such as the 3G, 4G, and 5G generations listed on the slide.  \n**Operating system** — the main software that manages a device and lets its applications run.  \n**Application** — a program for a particular task.',
    undefined,
    {
      recognition: 'If a handheld computer connects through Wi-Fi or a mobile network and runs apps alongside phone service, choose smartphone.',
      trap: 'The slide describes smartphones as computers because they run an operating system and applications, not only because they make calls.',
    },
  ),
  explainedPage(
    14,
    'Wearable computing — computers worn on the body',
    'A wearable computer is worn by the user so the hands can remain free; the slide gives smartwatches and activity trackers as examples.',
    'The slide defines wearable computing by how the device is used: the person wears it. Its two examples are smartwatches, such as Apple Watch, and activity trackers, such as Fitbit Flex 2. The images show wrist-worn devices.',
    '**Wearable computing** — computing devices worn on the body.  \n**Activity tracker** — a wearable device the slide lists as a common example.',
    'Apple Watch and Fitbit Flex 2 are examples named in this source, not an exhaustive list of wearables.',
    {
      recognition: 'If the computer is worn on the body and leaves the user’s hands free, choose wearable.',
    },
  ),
  {
    sourcePage: 15,
    title: 'Module outline — personal-computer hardware section',
    coverage: 'visual-only',
    blocks: [],
    note: 'This outline repeats the module topics and highlights “Personal Computer Hardware.” The hardware slides begin on source slide 16.',
  },
  explainedPage(
    16,
    'Personal-computer hardware — four categories',
    'The lecture groups personal-computer hardware into system unit, input/output, secondary storage, and communication devices.',
    'Hardware means the physical equipment in the computer system. The slide arranges the equipment into four categories:\n\n1. **System unit:** the case and the main electronic components it houses.\n2. **Input/output:** devices used to send data into the computer or present results to a person.\n3. **Secondary storage:** devices that keep programs and data after power is off.\n4. **Communication:** devices that let computers exchange information.\n\nThe following slides explain each category in this order.',
    '**Hardware** — the physical equipment that makes up the computer system.  \n**Secondary storage** — storage intended to retain data when power is off.',
    undefined,
    {
      recognition: 'When classifying a hardware device, ask whether it houses the main components, handles input/output, stores files persistently, or connects computers.',
    },
  ),
  explainedPage(
    17,
    'System unit — microprocessor and memory',
    'The system unit houses most electronic components; the slide focuses on the microprocessor and memory, including temporary RAM.',
    'The slide’s diagram labels **Memory** and **Microprocessor** inside a computer system.\n\n- The **system unit** is the container holding most of the electronic components.\n- The **microprocessor** controls and manipulates data to produce information.\n- **Memory** holds data, instructions, and information.\n- **Random-access memory (RAM)** holds the program and data currently being processed. The slide calls it temporary storage because its contents are typically lost if power is disrupted.\n\nThe inset shows an opened computer case, a memory module, and a processor. Its labels connect the two named components to the text.',
    '**Microprocessor** — the component identified on the slide as controlling and manipulating data.  \n**Memory** — a holding area for data, instructions, and information.  \n**RAM** — random-access memory used for the program and data being processed.  \n**Temporary / volatile** — does not retain its contents when power is lost, as described for RAM here.',
    undefined,
    {
      recognition: 'If a question asks what holds the program and data currently being processed and loses its contents when power is interrupted, answer RAM.',
      trap: 'Do not confuse RAM with the secondary storage on slide 19. The slide describes RAM as temporary; secondary storage keeps data after power is turned off.',
    },
  ),
  explainedPage(
    18,
    'Input and output devices — data in, results out',
    'Input devices turn human-understandable data into a form the computer can process; output devices present processed information in a form people can understand.',
    'Read the two directions separately:\n\n- **Input:** information moves from a person or the outside world into the computer. The slide gives a keyboard and mouse as examples.\n- **Output:** processed information moves from the computer to a form a person can understand. The slide names a display or monitor as the most common output device.\n\nThe source repeats punctuation around “output devices,” but the meaning is the input-versus-output distinction above.',
    '**Input device** — hardware that sends data into the computer.  \n**Output device** — hardware that presents computer results to a person.  \n**Processed information** — data the computer has worked on.',
    undefined,
    {
      recognition: 'Ask which direction the information travels: into the computer means input; from the computer to a person means output.',
      trap: 'Do not assign the monitor’s job to an input device. A monitor displays the result, so it is an output device.',
      analogy: 'Think of input as giving the computer ingredients and output as receiving the prepared result. This is a mental picture for the direction of data, not a formal hardware definition.',
    },
  ),
  explainedPage(
    19,
    'Secondary storage — keeping data after power is off',
    'Secondary storage keeps programs and data when power is off; the slide compares hard disks, solid-state storage, and optical disks.',
    'The slide distinguishes secondary storage from the memory described on slide 17: its contents remain after electrical power is turned off. It lists USB drives, hard drives, and optical drives as examples.\n\n- **Hard disks:** store programs and data files using rigid metallic platters and read/write heads. The heads write data to and read data from the disks.\n- **Solid-state storage:** has no moving parts, is described as more reliable and lower-power, and is similar to RAM but nonvolatile. “Nonvolatile” means it retains stored data without power. The picture shows a solid-state drive (SSD) installed inside a laptop.\n- **Optical disks:** use laser technology. The examples are CDs, DVDs, and Blu-ray discs.\n\nThe deck’s comparison is about whether the stored contents survive loss of power and how each medium stores data.',
    '**Secondary storage** — storage that retains data after power is off.  \n**Read/write head** — the hard-disk part described as reading or writing data on the platter.  \n**Solid-state** — storage with no moving parts, as stated on the slide.  \n**Nonvolatile** — retains its contents without electrical power.  \n**Optical disk** — a disk that uses laser technology to read or write data.',
    'The slide describes solid-state storage as “similar to RAM but not volatile.” Here, the useful comparison is electronic storage versus whether data survives power loss; RAM and an SSD are different components with different roles.',
    {
      recognition: 'If files must remain available after the computer is turned off, look for secondary storage. If the description mentions platters and read/write heads, it is a hard disk; if it mentions a laser, it is an optical disk.',
      trap: 'RAM may hold data temporarily while it is being processed, but the slide says secondary storage preserves stored programs and data after power is off.',
    },
  ),
  explainedPage(
    20,
    'Communication devices — connecting computers',
    'Communication devices let one computer communicate with another; the slide gives a modem as an example.',
    'The page defines communication as one computer communicating with another computer or system. It says communication devices provide this capability to personal computers. A modem is the example named. The slide describes modems as modifying audio, video, and other types of data for Internet use.',
    '**Communication device** — hardware that provides a computer’s ability to communicate.  \n**Modem** — the example of a communication device named on this slide.',
    'The explanation follows the modem description as worded in the supplied slide.',
    {
      recognition: 'If the device’s role is to connect a computer with another computer or system, classify it under communication rather than input/output or storage.',
    },
  ),
  {
    sourcePage: 21,
    title: 'Module outline — data and connectivity section',
    coverage: 'visual-only',
    blocks: [],
    note: 'The repeated module outline highlights “Data, Connectivity, and forces of Technology.” The data slide follows on source slide 22.',
  },
  explainedPage(
    22,
    'Data — facts, information, and common file types',
    'Data is raw facts; processing turns data into information. The slide groups common files by the software that creates or organizes them.',
    'The slide says data consists of raw, unprocessed facts that can be stored electronically in files. Processed data becomes information.\n\nIt lists four file types:\n\n- **Document files:** created by word processors for items such as memos, term papers, and letters.\n- **Worksheet files:** created by spreadsheets to analyze information such as budgets or predict sales.\n- **Database files:** created by database-management programs to hold highly structured, organized data.\n- **Presentation files:** created by presentation software to save presentation materials.\n\nThe useful sorting clue is the file’s purpose or the program that created it.',
    '**Data** — raw facts before processing.  \n**Information** — data after processing.  \n**Spreadsheet / worksheet** — software and files used for structured calculations and analysis.  \n**Database** — an organized collection of data managed by database software.',
    undefined,
    {
      recognition: 'If the file is a letter or term paper, think document; if it analyzes a budget, think worksheet; if it organizes structured records, think database; if it contains slide material, think presentation.',
      trap: 'A document and a worksheet can both contain words and numbers. Use the purpose described on the slide: word-processed writing versus spreadsheet analysis.',
    },
  ),
  explainedPage(
    23,
    'Connectivity and the mobile Internet',
    'Connectivity is a computer’s ability to share information; a network connects devices, the Internet is the largest network in the slide, and the Web provides an interface to Internet resources.',
    'The page builds the idea in sequence:\n\n1. **Connectivity** means a personal computer can share information with other computers. The slide highlights wireless/mobile communication and cloud computing as major changes in connectivity over the past five years in its course context.\n2. A **network** is a communications system connecting two or more devices.\n3. The slide calls the **Internet** the largest network.\n4. The **World Wide Web (WWW)** provides a multimedia interface for Internet resources.\n\nThe Internet and the Web are related, but the slide gives them different roles: the Internet is the network; the Web is an interface for using resources on it.',
    '**Connectivity** — the ability to share information with other computers.  \n**Network** — a communications system linking two or more devices.  \n**Internet** — the largest network, according to this slide.  \n**World Wide Web (WWW)** — the multimedia interface for Internet resources described here.',
    'The slide spells the name “Word Wide Web.” The standard name is “World Wide Web”; the intended description on the slide is the WWW interface for Internet resources.',
    {
      recognition: 'If a prompt asks about the communication system linking devices, answer network. If it asks for the interface to Internet resources, answer World Wide Web.',
      trap: 'Do not use “Internet” and “World Wide Web” as if the slide defined them identically. It describes the Internet as the network and the Web as an interface for its resources.',
    },
  ),
  explainedPage(
    24,
    'Forces of technology — cloud, wireless, and the Internet of Things',
    'The slide names cloud computing, wireless technology, and the Internet of Things as forces changing how people use computers and connected devices.',
    '**1. Cloud computing:** the slide defines it as using computing resources from the cloud to complete tasks instead of relying only on a personal computer. It describes those resources as computers on the Internet, offering access to more resources and a way to create and store work.\n\n**2. Wireless technology:** the slide connects wireless technology with changes in communication and lists tablets, smartphones, and wearable devices. It says wireless technology and cloud computing may affect the computer industry and how people interact with computers.\n\n**3. Internet of Things (IoT):** the slide describes IoT as a continuing development of the Internet that allows different kinds of devices to communicate.',
    '**Cloud computing** — using computing resources available over the Internet instead of relying only on a local PC.  \n**Wireless technology** — technology that communicates without a physical connection between the devices.  \n**Internet of Things (IoT)** — connected devices communicating over the Internet, as summarized by the slide.',
    'The slide lists possible effects of cloud and wireless technology; it does not quantify those effects.',
    {
      recognition: 'If work or computing resources come from computers on the Internet, think cloud computing. If many kinds of devices communicate over the Internet, think Internet of Things.',
      trap: '“Cloud” here means Internet-connected computing resources, not a weather cloud. The slide’s clues are access to online computers, resources, and storage.',
    },
  ),
  explainedPage(
    25,
    'Review questions — true or false',
    'The answer key printed on the slide is F, T, F, F; each answer follows from the definitions in the earlier slides.',
    '**1. “Minicomputers are the most frequently used computers.” False.** Slide 8 calls microcomputers or personal computers the most frequently used.\n\n**2. “Solid state ... does not have moving parts, is more reliable, and requires less power.” True.** This matches the solid-state description on slide 19.\n\n**3. “Input devices translate processed information ... into a form humans understand.” False.** Slide 18 assigns that direction to output devices. Input devices translate human-understandable data into a form the computer can process.\n\n**4. “Laptop ... small enough to fit beside a desk yet too big to carry.” False.** That is the desktop description on slide 10. Slide 11 describes laptops as portable.',
    '**True / false** — decide whether the whole statement matches the lecture, not just one phrase.  \n**Answer key** — the slide prints F, T, F, F beside the four statements.',
    undefined,
    {
      recognition: 'For each statement, identify the defining phrase and compare it with the earlier slide: most-used computer, storage feature, input/output direction, or desktop/laptop form.',
      trap: 'A statement can use correct words but assign the definition to the wrong device. Question 3 swaps the input and output roles.',
    },
  ),
  explainedPage(
    26,
    'Review questions — multiple choice',
    'The answers shown on the slide are B, A, C, and D: supercomputer, mainframe, smartphone, and wearable.',
    '**1. Largest, fastest, most powerful, and most expensive: B, supercomputer.** These are the identifying words on slide 5.\n\n**2. Not as powerful as a supercomputer, but capable of high processing speed and data storage: A, mainframe computer.** Slide 6 describes mainframes as handling very large jobs with large storage and high processing needs.\n\n**3. Web browsing, videos, e-books, and games: C, smartphones.** Slide 13 lists these uses for smartphones.\n\n**4. Apple Watch: D, wearable.** Slide 14 names smartwatches such as Apple Watch as wearable computers.',
    '**Multiple choice** — match the key phrase in each question with the definition from the topic slides.  \n**Answer letters** — the slide shows B, A, C, and D beside questions 1–4.',
    undefined,
    {
      recognition: 'Use the clue words: “largest and fastest” points to supercomputer; “large data-processing jobs” to mainframe; phone apps to smartphone; a device worn on the wrist to wearable.',
      trap: 'Question 2 asks for a system below a supercomputer in power but still built for high-speed, data-heavy work. The answer is mainframe, not the supercomputer itself.',
    },
  ),
  {
    sourcePage: 27,
    title: 'Thank You — closing slide',
    coverage: 'visual-only',
    blocks: [],
    note: 'The closing image shows the EELU logo and “Thank you for watching” / “Questions?” It contains no additional lesson content.',
  },
];

export const introductionToComputersLecture2Lesson: Lesson = {
  id: 'introduction-to-computers-lecture-2-current',
  courseId: 'introduction-to-computers',
  sourceKey: 'current:introduction-to-computers:Lec2 Introduction to computers.pptx',
  sourcePath: 'The Lectures i downloaded this term recently/Lec2 Introduction to computers.pptx',
  title: 'Lecture 2: Computer Types, Hardware, Data, and Connectivity',
  sourcePageCount: 27,
  pages,
  lastReviewed: '2026-10-14',
};
